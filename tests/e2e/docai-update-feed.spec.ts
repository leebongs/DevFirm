import { createPublicKey, verify } from "node:crypto";
import { existsSync } from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import {
  DOC_AI_RELEASE_NOTES_URL,
  LEGACY_DOC_AI_RELEASE_NOTES_PATH,
  docAiReleases,
  latestDocAiRelease,
} from "../../content/docai-release-notes";

const canonicalFeedFile = path.join(
  process.cwd(),
  "public/updates/docasi/stable.json",
);
const legacyFeedFile = path.join(
  process.cwd(),
  "public/updates/docai/stable.json",
);
const usesCanonicalFeed = existsSync(canonicalFeedFile);
const FEED_PATH = usesCanonicalFeed
  ? "/updates/docasi/stable.json"
  : "/updates/docai/stable.json";
const feedFile = usesCanonicalFeed ? canonicalFeedFile : legacyFeedFile;
const requireStableFeed = process.env.DOCAI_REQUIRE_STABLE_FEED === "1";
const RELEASE_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEVFKuvqsaalvjvAkT35fOxUr4hCM1
HyqXF9ua+BmwhlX8sYJfvKYpfRjL5QbWUWU4m8l8PxMfGk/sDr6z6ZWKoA==
-----END PUBLIC KEY-----`;

type Asset = {
  fileName: string;
  url: string;
  size: number;
  sha256: string;
};

type Payload = {
  productId: string;
  channel: string;
  version: string;
  title: string;
  publishedAt: string;
  releaseNotesUrl: string;
  assets: {
    "macos-universal": Asset;
    "windows-x64": Asset;
  };
};

type Envelope = {
  schemaVersion: number;
  keyId: string;
  algorithm: string;
  payload: string;
  signature: string;
};

function expectAsset(asset: Asset, expectedFileName: string, version: string) {
  expect(asset.fileName).toBe(expectedFileName);
  expect(asset.url).toBe(
    `https://github.com/leebongs/DocAI-releases/releases/download/v${version}/${expectedFileName}`,
  );
  expect(Number.isSafeInteger(asset.size)).toBe(true);
  expect(asset.size).toBeGreaterThan(0);
  expect(asset.size).toBeLessThanOrEqual(512 * 1024 * 1024);
  expect(asset.sha256).toMatch(/^[a-f0-9]{64}$/);
}

function expectClosedReleaseContract(payload: Payload) {
  const canonical = payload.productId === "co.devfirm.docasi";
  expect(payload.productId).toBe(
    canonical ? "co.devfirm.docasi" : "co.devfirm.docai",
  );
  expect(payload.releaseNotesUrl).toBe(
    canonical
      ? DOC_AI_RELEASE_NOTES_URL
      : `https://www.devfirm.co${LEGACY_DOC_AI_RELEASE_NOTES_PATH}`,
  );
  const brand = canonical ? "DocASI" : "DocAI";
  expectAsset(
    payload.assets["macos-universal"],
    `${brand}-${payload.version}-universal.dmg`,
    payload.version,
  );
  expectAsset(
    payload.assets["windows-x64"],
    `${brand}-forTeamMemebr-Setup-${payload.version}-win-x64.exe`,
    payload.version,
  );
}

test.describe("DocASI stable OTA feed", () => {
  test.beforeAll(() => {
    if (requireStableFeed) {
      expect(
        existsSync(feedFile),
        "DOCAI_REQUIRE_STABLE_FEED=1 requires the real signed stable.json",
      ).toBe(true);
    }
  });

  test("실제 아티팩트가 준비되면 서명·스키마·캐시를 함께 검증한다", async ({
    request,
  }) => {
    test.skip(
      !existsSync(feedFile),
      "실제 Mac/Windows 아티팩트와 서명 envelope가 준비되기 전에는 피드를 게시하지 않는다.",
    );

    const response = await request.get(FEED_PATH, { maxRedirects: 0 });
    expect(response.status()).toBe(200);
    expect(new URL(response.url()).pathname).toBe(FEED_PATH);
    expect(response.headers()["content-type"]).toMatch(
      /^application\/json(?:;|$)/,
    );

    const cacheControl = response.headers()["cache-control"] ?? "";
    const maxAge = /(?:^|,)\s*max-age=(\d+)/.exec(cacheControl)?.[1];
    expect(maxAge, "Cache-Control must contain max-age").toBeTruthy();
    expect(Number(maxAge)).toBeLessThanOrEqual(300);

    const rawEnvelope = await response.body();
    expect(rawEnvelope.byteLength).toBeLessThanOrEqual(128 * 1024);
    const envelope = JSON.parse(rawEnvelope.toString("utf8")) as Envelope;

    expect(envelope.schemaVersion).toBe(1);
    expect(envelope.keyId).toBe("docai-release-2026-01");
    expect(envelope.algorithm).toBe("ECDSA-P256-SHA256-DER");
    expect(envelope.payload).toMatch(/^[A-Za-z0-9+/]+={0,2}$/);
    expect(envelope.signature).toMatch(/^[A-Za-z0-9+/]+={0,2}$/);

    const payloadBytes = Buffer.from(envelope.payload, "base64");
    const signatureBytes = Buffer.from(envelope.signature, "base64");
    const publicKey = createPublicKey(RELEASE_PUBLIC_KEY);

    expect(
      verify(
        "sha256",
        payloadBytes,
        { key: publicKey, dsaEncoding: "der" },
        signatureBytes,
      ),
    ).toBe(true);

    const payload = JSON.parse(payloadBytes.toString("utf8")) as Payload;
    expect(payload.channel).toBe("stable");
    expect(payload.version).toMatch(/^\d+\.\d+\.\d+$/);
    const matchingRelease = usesCanonicalFeed
      ? latestDocAiRelease
      : docAiReleases.find((release) => release.version === payload.version);
    expect(matchingRelease).toBeDefined();
    expect(payload.version).toBe(matchingRelease?.version);
    expect(payload.title).toBe(matchingRelease?.title);
    expect(payload.publishedAt).toBe(matchingRelease?.publishedAt);
    expectClosedReleaseContract(payload);
  });
});
