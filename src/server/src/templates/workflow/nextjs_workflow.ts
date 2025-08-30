export function nextjsWorkflow({ organization, projectKey }: { organization: string; projectKey: string }) {
  return `name: SonarCloud Analysis - Next.js

on:
  push:
    branches:
      - master
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  sonarcloud:
    name: SonarCloud Analysis
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run Next.js Lint
        run: |
          if npm run | grep -q "lint"; then
            npm run lint
          elif [ -f .eslintrc.js ] || [ -f .eslintrc.json ] || [ -f eslint.config.js ]; then
            npx eslint . --ext .js,.jsx,.ts,.tsx
          else
            echo "No linting configuration found"
          fi
        continue-on-error: true

      - name: Type check (if TypeScript)
        run: |
          if [ -f tsconfig.json ]; then
            npx tsc --noEmit
          else
            echo "No TypeScript configuration found"
          fi

      - name: Run tests
        run: |
          if npm run | grep -q "test"; then
            npm test
          else
            echo "No test script found"
          fi
        continue-on-error: true

      - name: Build project
        run: |
          if npm run | grep -q "build"; then
            npm run build
          else
            echo "No build script found"
          fi

      - name: Check static export (if configured)
        run: |
          if grep -q '"output".*"export"' next.config.js 2>/dev/null || grep -q '"output".*"export"' next.config.mjs 2>/dev/null; then
            echo "Static export detected"
            if [ -d out ]; then
              echo "Static files exported successfully"
              du -sh out/ 2>/dev/null || echo "Export size check skipped"
            fi
          else
            echo "No static export configuration found"
          fi
        continue-on-error: true

      - name: Check build output
        run: |
          if [ -d .next ]; then
            echo "Next.js build completed successfully"
            if command -v du &> /dev/null; then
              du -sh .next/ 2>/dev/null || echo "Build size check skipped"
            fi
          else
            echo "No .next directory found"
          fi
        continue-on-error: true

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@v2
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
  `;
}
