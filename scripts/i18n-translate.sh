#!/bin/bash
# 언어별 번역 실행.
#
#   bash scripts/i18n-translate.sh en ja zh ...
#
# content/i18n/_source.json(한국어 원문)을 받아 언어별 JSON 을 만든다.
# 키 구조를 그대로 보존해야 하며, 대조는 `pnpm check:i18n` 이 한다.
set -u
cd "$(dirname "$0")/.."

SRC="content/i18n/_source.json"
[ -f "$SRC" ] || { echo "원본이 없습니다. 먼저 pnpm i18n:extract"; exit 1; }

# macOS 기본 bash 는 3.2 라 연관 배열이 없다. case 로 매핑한다.
lang_name() {
  case "$1" in
    en) echo "English" ;;
    ja) echo "Japanese" ;;
    zh) echo "Simplified Chinese" ;;
    ms) echo "Malay" ;;
    id) echo "Indonesian" ;;
    vi) echo "Vietnamese" ;;
    th) echo "Thai" ;;
    ur) echo "Urdu" ;;
    hi) echo "Hindi" ;;
    es) echo "Spanish" ;;
    fr) echo "French" ;;
    fi) echo "Finnish" ;;
    sv) echo "Swedish" ;;
    it) echo "Italian" ;;
    ro) echo "Romanian" ;;
    pt-BR) echo "Brazilian Portuguese" ;;
    *) echo "" ;;
  esac
}

for code in "$@"; do
  lang="$(lang_name "$code")"
  [ -z "$lang" ] && { echo "✖ 알 수 없는 코드: $code"; continue; }
  echo "▶ $code ($lang)"

  codex exec --ephemeral -s workspace-write -C . "Translate the Korean website content in \`content/i18n/_source.json\` into **$lang** and write the result to \`content/i18n/$code.json\`. Touch no other file.

This is the marketing and product copy of DevFirm (데브펌), a Korean software development company. It runs AI solutions, contract development, developer staffing, a coding academy, and a shared office.

## Non-negotiable structural rules

The output must be JSON with **exactly the same shape as the source** — same keys, same nesting, same array lengths, same order. A checker compares them key by key and fails the build on any drift. Translate only string values. Never rename a key, never add or drop one, never reorder or resize an array.

Numbers and booleans stay as they are.

## What must NOT be translated

Leave these byte-identical to the source:

- Anything that is a URL, path or fragment: values under \`href\`, \`src\`, \`base\`, \`mapHref\`, \`telHref\`, and any string starting with \`/\`, \`#\`, \`http\`, \`mailto:\` or \`tel:\`.
- Identifiers: \`id\`, \`slug\`, \`code\`, \`key\`, \`name\` when it is a machine key rather than prose.
- The business registration number, phone number and email address.
- \`DevFirm\`, \`CMNYX\`, \`CIC\`, \`PBL\`, \`NCS\`, \`AI\` — brand and standard terms.

## Product names — transliterate, do not translate

Two product names are Korean coinages and must stay recognisable as names:

- \`피지컬AI\` → \`Physical AI\`
- \`최과장AI\` → keep the persona. Render it as \`Manager Choi AI\` in English, and in other languages use the closest natural equivalent of \"Manager Choi\" plus \"AI\". It names a virtual office manager, so it must read as a person's title, not as a description of software.

## Register

Korean corporate copy here is deliberately plain and declarative — short sentences, no exclamation, no hype, no marketing superlatives. Carry that tone across. Do not add enthusiasm the source does not have. Prefer the register a professional services firm would use in $lang.

Legal sections (privacy policy, terms of service) must stay precise and literal. Do not paraphrase obligations, retention periods or rights.

## Length

Headlines and button labels sit in fixed layouts. Keep them close to the source length where the language allows; a label that doubles in length will break the design. Body paragraphs may run their natural length.

## Output

Write valid JSON — UTF-8, double-quoted keys, no trailing commas, no comments, no code fences. Verify it parses before you finish, and verify the key structure still matches the source."

  if [ -f "content/i18n/$code.json" ] && [ "$(wc -c < "content/i18n/$code.json")" -gt 100 ]; then
    echo "  ✔ content/i18n/$code.json ($(wc -c < "content/i18n/$code.json") bytes)"
  else
    echo "  ✖ $code 실패 또는 빈 파일"
  fi
done
