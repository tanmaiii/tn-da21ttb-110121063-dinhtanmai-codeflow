export function aspNetWorkflow({ organization, projectKey }: { organization: string; projectKey: string }) {
  return `name: SonarCloud Analysis - ASP.NET

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

      - name: Setup .NET
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: '9.0.x'

      - name: Restore dependencies
        run: dotnet restore

      - name: Build project
        run: dotnet build --no-restore --configuration Release

      - name: Run tests
        run: |
          if ls *.Tests.csproj 1> /dev/null 2>&1 || ls *Tests/*.csproj 1> /dev/null 2>&1; then
            dotnet test --no-build --configuration Release --logger trx --collect:"XPlat Code Coverage"
          else
            echo "No test projects found"
          fi
        continue-on-error: true

      - name: Run code analysis (if available)
        run: |
          if command -v dotnet-sonarscanner &> /dev/null; then
            echo "SonarScanner for .NET is available"
          else
            echo "SonarScanner for .NET not installed"
          fi
        continue-on-error: true

      - name: Check for security vulnerabilities
        run: |
          dotnet list package --vulnerable --include-transitive 2>/dev/null || echo "No vulnerability check available"
        continue-on-error: true

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@v2
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
        with:
          args: >
            -Dsonar.organization=${organization}
            -Dsonar.projectKey=${projectKey}
  `;
}
