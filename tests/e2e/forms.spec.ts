import { test, expect } from "@playwright/test";
import { forms } from "../../content/forms";

/**
 * A12 폼 — 정상 제출 / 검증 실패 / 서버 오류 3경로 모두 사용자에게 피드백.
 * 뷰포트와 무관하므로 한 프로젝트에서만 돌린다.
 */
test.describe("문의 폼", () => {
  test.skip(
    ({ viewport }) => viewport?.width !== 1440,
    "뷰포트 독립 검사 — 1440 프로젝트에서만 실행",
  );

  test("정상 제출 시 인라인 성공 상태로 바뀐다", async ({ page }) => {
    await page.goto("/contact");

    await page.selectOption("#contact-type", "solution");
    await page.fill("#contact-name", "홍길동");
    await page.fill("#contact-email", "test@example.com");
    await page.fill(
      "#contact-message",
      "AI 솔루션 도입을 검토 중입니다. 상담 요청드립니다.",
    );
    await page.check("#contact-consent");

    // 시간 기반 토큰이 3초 미만 제출을 거부한다(§5.14). 사람 속도를 흉내낸다.
    await page.waitForTimeout(3_500);
    await page
      .getByRole("button", { name: forms.contact.labels.submit })
      .click();

    const status = page.getByRole("status");
    await expect(status).toContainText(forms.contact.success.title);
  });

  test("동의 체크 없이는 제출되지 않는다", async ({ page }) => {
    await page.goto("/contact");

    await page.selectOption("#contact-type", "etc");
    await page.fill("#contact-name", "홍길동");
    await page.fill("#contact-email", "test@example.com");
    await page.fill("#contact-message", "동의 없이 제출을 시도합니다.");

    await page.waitForTimeout(3_500);
    await page
      .getByRole("button", { name: forms.contact.labels.submit })
      .click();

    // 브라우저 기본 검증이 막으므로 성공 상태가 나타나지 않아야 한다
    await expect(page.getByRole("status")).toHaveCount(0);
    await expect(page.locator("#contact-consent")).not.toBeChecked();
  });

  test("검증 실패 시 필드 에러가 스크린리더에 연결된다", async ({ page }) => {
    await page.goto("/contact");

    await page.selectOption("#contact-type", "etc");
    await page.fill("#contact-name", "홍");
    await page.fill("#contact-email", "not-an-email");
    await page.fill("#contact-message", "짧음");
    await page.check("#contact-consent");

    await page.waitForTimeout(3_500);
    await page
      .getByRole("button", { name: forms.contact.labels.submit })
      .click();

    // 요약 경고(aria-live=assertive)
    await expect(page.getByText(forms.contact.error.title)).toBeVisible();

    // 각 필드의 에러가 aria-describedby 로 연결되어 있어야 한다
    for (const id of ["#contact-name", "#contact-email", "#contact-message"]) {
      const field = page.locator(id);
      await expect(field).toHaveAttribute("aria-invalid", "true");
      const describedBy = await field.getAttribute("aria-describedby");
      expect(describedBy, `${id} aria-describedby`).toBeTruthy();
      await expect(
        page.locator(`#${describedBy?.split(" ")[0]}`),
      ).toBeVisible();
    }
  });

  test("3초 미만 제출은 거부된다", async ({ page }) => {
    await page.goto("/contact");

    await page.selectOption("#contact-type", "etc");
    await page.fill("#contact-name", "홍길동");
    await page.fill("#contact-email", "test@example.com");
    await page.fill("#contact-message", "봇처럼 즉시 제출을 시도합니다.");
    await page.check("#contact-consent");

    // 토큰을 받자마자 제출 — 사람이 낼 수 없는 속도
    await page
      .getByRole("button", { name: forms.contact.labels.submit })
      .click();

    await expect(page.getByText(forms.validation.tooFast)).toBeVisible();
  });
});

test.describe("수강 신청 폼", () => {
  test.skip(
    ({ viewport }) => viewport?.width !== 1440,
    "뷰포트 독립 검사 — 1440 프로젝트에서만 실행",
  );

  test("과정 상세에서 넘어오면 해당 과정이 선택되어 있다", async ({ page }) => {
    await page.goto("/academy/apply?course=ai-agent-basics");
    await expect(page.locator("#apply-course")).toHaveValue("ai-agent-basics");
  });

  test("정상 제출 시 인라인 성공 상태로 바뀐다", async ({ page }) => {
    await page.goto("/academy/apply");

    await page.selectOption("#apply-course", "web-service-development");
    await page.fill("#apply-name", "홍길동");
    await page.fill("#apply-email", "test@example.com");
    await page.fill("#apply-phone", "010-1234-5678");
    await page.selectOption("#apply-level", "basic");
    await page.fill(
      "#apply-motivation",
      "직접 서비스를 만들어 보고 싶어 지원합니다.",
    );
    await page.check("#apply-consent");

    await page.waitForTimeout(3_500);
    await page.getByRole("button", { name: forms.apply.labels.submit }).click();

    await expect(page.getByRole("status")).toContainText(
      forms.apply.success.title,
    );
  });
});
