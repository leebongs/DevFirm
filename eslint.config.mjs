import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      /*
       * 밑줄로 시작하는 이름은 "일부러 버리는 값"이라는 관례다.
       *
       * 서버 전용 함수를 사전에서 떼어낼 때 구조 분해로 버리게 되는데
       * (`const { mailSubject: _sub, ...copy } = forms.contact`), 그 바인딩은
       * 쓰이지 않는 것이 목적이다. 기본 규칙은 이것을 실수로 보고 경고한다.
       */
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
