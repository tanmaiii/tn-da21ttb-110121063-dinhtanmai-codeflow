export function htmlWorkflow({ organization, projectKey }: { organization: string; projectKey: string }) {
  return `name: SonarCloud Analysis - HTML

on:
  push:
    branches:
      - master
      - main
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

      - name: Setup Node.js (for validation tools)
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: HTML Validation
        run: |
          echo "Installing html-validate for HTML validation..."
          npm install -g html-validate
          if find . -name "*.html" -type f | head -1 | grep -q .; then
            echo "Validating HTML files..."
            html-validate **/*.html || echo "HTML validation completed with warnings"
          else
            echo "No HTML files found to validate"
          fi
        continue-on-error: true

      - name: CSS Validation
        run: |
          if find . -name "*.css" -type f | head -1 | grep -q .; then
            echo "Installing stylelint for CSS validation..."
            npm install -g stylelint stylelint-config-standard
            echo '{"extends": ["stylelint-config-standard"]}' > .stylelintrc.json
            echo "Validating CSS files..."
            stylelint "**/*.css" || echo "CSS validation completed with warnings"
          else
            echo "No CSS files found to validate"
          fi
        continue-on-error: true

      - name: JavaScript Validation
        run: |
          if find . -name "*.js" -type f | head -1 | grep -q .; then
            echo "Installing ESLint for JavaScript validation..."
            npm install -g eslint
            echo "Validating JavaScript files..."
            npx eslint "**/*.js" --no-eslintrc --env browser,es6 --parser-options ecmaVersion:2018 || echo "JavaScript validation completed with warnings"
          else
            echo "No JavaScript files found to validate"
          fi
        continue-on-error: true

      - name: Check HTML structure and accessibility
        run: |
          echo "Checking HTML files structure..."
          for file in $(find . -name "*.html" -type f); do
            echo "Checking: $file"
            # Basic HTML structure validation
            if grep -q "<!DOCTYPE html>" "$file"; then
              echo "✓ DOCTYPE found in $file"
            else
              echo "⚠ Missing DOCTYPE in $file"
            fi
            
            if grep -q "<title>" "$file"; then
              echo "✓ Title found in $file"
            else
              echo "⚠ Missing title in $file"
            fi
          done
        continue-on-error: true

      - name: Check for broken links (basic)
        run: |
          echo "Checking for basic HTML issues..."
          for file in $(find . -name "*.html" -type f); do
            echo "Checking links in: $file"
            # Check for common issues
            if grep -q "href=\"#\"" "$file"; then
              echo "⚠ Found placeholder links (#) in $file"
            fi
            if grep -q "src=\"\"" "$file"; then
              echo "⚠ Found empty src attributes in $file"
            fi
            if grep -q "alt=\"\"" "$file"; then
              echo "⚠ Found empty alt attributes in $file"
            fi
          done
        continue-on-error: true

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@v2
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
  `;
}
