export function aspNetProperty({ organization, projectKey }: { organization: string; projectKey: string }) {
  return `sonar.organization=${organization}
sonar.projectKey=${projectKey}

# Source directories
sonar.sources=.
sonar.tests=.

# Include patterns for source files
sonar.inclusions=**/*.cs,**/*.vb,**/*.fs,**/*.razor,**/*.cshtml

# Exclude patterns
sonar.exclusions=**/bin/**,**/obj/**,**/packages/**,**/wwwroot/lib/**,**/*.min.js,**/*.min.css,**/migrations/**,**/Migrations/**

# Test patterns
sonar.test.inclusions=**/*Test*.cs,**/*Tests*.cs,**/*.Test.cs,**/*.Tests.cs

# .NET specific settings
sonar.cs.opencover.reportsPaths=**/coverage.opencover.xml
sonar.cs.vstest.reportsPaths=**/*.trx

# Code coverage exclusions
sonar.coverage.exclusions=**/Program.cs,**/Startup.cs,**/*Test*.cs,**/*Tests*.cs,**/Migrations/**
`;
}
