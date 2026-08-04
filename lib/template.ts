/**
 * 자리표시자 치환.
 *
 * 콘텐츠에 함수를 넣으면(`(job) => \`${job.team} 팀…\``) JSON 직렬화에서
 * 통째로 사라진다. 번역 파이프라인이 JSON 을 실어 나르므로, 함수로 쓴 문장은
 * **조용히 원문 언어로 남는다** — 화면에는 멀쩡히 나오고 게이트도 통과한다.
 *
 * 그래서 문장은 문자열로 두고 값만 여기서 끼운다. 자리표시자 이름이 번역돼
 * 버리면 치환이 안 되므로 `check:i18n` 이 이름 보존을 검사한다.
 */
export function fillTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key in values ? values[key]! : whole,
  );
}
