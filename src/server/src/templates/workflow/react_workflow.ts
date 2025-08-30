export function reactWorkflow({ organization, projectKey }: { organization: string; projectKey: string }) {
  return `name: SonarCloud Analysis - React

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

      - name: Run ESLint
        run: |
          if [ -f .eslintrc.js ] || [ -f .eslintrc.json ] || [ -f eslint.config.js ]; then
            npx eslint . --ext .js,.jsx,.ts,.tsx
          else
            echo "No ESLint configuration found"
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
            if [ -f src/setupTests.js ] || [ -f src/setupTests.ts ]; then
              npm test -- --coverage --watchAll=false
            else
              npm test
            fi
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

      - name: Check build size (if build exists)
        run: |
          if [ -d build ] || [ -d dist ]; then
            echo "Build completed successfully"
            if command -v du &> /dev/null; then
              du -sh build/ 2>/dev/null || du -sh dist/ 2>/dev/null || echo "Build directory size check skipped"
            fi
          else
            echo "No build directory found"
          fi
        continue-on-error: true

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@v2
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
  `;
}
