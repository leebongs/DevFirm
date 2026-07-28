#!/usr/bin/env node
/**
 * A14 정보 위계 검사 (§9.1)
 *
 *   최상위 메뉴 ≤ 6 · URL depth ≤ 3
 *
 * ADR-002 가 못 박은 불변식이라 문서 약속이 아니라 CI 게이트로 고정한다.
 * Vitest 도입(§9.2) 전까지 이 스크립트가 그 역할을 한다 — Node 의 타입 스트리핑
 * 덕분에 TS 콘텐츠 파일을 그대로 import 할 수 있어 별도 의존성이 필요 없다.
 */
import { mainNav, footerNav, primaryCta } from "../content/navigation.ts";

const problems = [];

// 1) 최상위 ≤ 6 (문의하기 CTA 는 헤더 우측 고정이라 별도 계산)
if (mainNav.length > 6) {
  problems.push(
    `최상위 메뉴가 ${mainNav.length}개 — ADR-002 상한은 6개입니다.`,
  );
}

// 2) depth ≤ 3
const depthOf = (href) => href.split("/").filter(Boolean).length;
const walk = (nodes, path = []) => {
  for (const node of nodes) {
    if (!node.external && depthOf(node.href) > 3) {
      problems.push(
        `depth ${depthOf(node.href)} 경로: ${node.href} (${[...path, node.label].join(" > ")})`,
      );
    }
    if (node.children) walk(node.children, [...path, node.label]);
  }
};
walk(mainNav);
walk(footerNav);
if (depthOf(primaryCta.href) > 3) {
  problems.push(`depth 초과 CTA: ${primaryCta.href}`);
}

// 3) 푸터 링크가 mainNav 에 없는 경로를 가리키지 않는지(오탈자 방지).
//    법적 고지(/privacy, /terms)와 문의(/contact)는 메뉴에 없는 것이 정상이다.
const KNOWN_EXTRA = new Set([primaryCta.href, "/privacy", "/terms"]);
const inMain = new Set();
const collect = (nodes) => {
  for (const node of nodes) {
    inMain.add(node.href);
    if (node.children) collect(node.children);
  }
};
collect(mainNav);
const collectFooter = (nodes) => {
  for (const node of nodes) {
    if (
      !node.external &&
      !inMain.has(node.href) &&
      !KNOWN_EXTRA.has(node.href)
    ) {
      problems.push(`푸터 링크가 메뉴 트리에 없는 경로를 가리킴: ${node.href}`);
    }
    if (node.children) collectFooter(node.children);
  }
};
collectFooter(footerNav);

if (problems.length) {
  console.error("\n✖ A14 정보 위계 위반");
  for (const p of problems) console.error(`  - ${p}`);
  console.error("");
  process.exit(1);
}

const maxDepth = Math.max(
  ...[...inMain].map((href) => href.split("/").filter(Boolean).length),
);
console.log(
  `✔ A14 정보 위계 통과 (최상위 ${mainNav.length}/6, 최대 depth ${maxDepth}/3, 경로 ${inMain.size}개)`,
);
