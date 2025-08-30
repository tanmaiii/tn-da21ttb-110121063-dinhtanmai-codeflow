export function laravelProperty({ organization, projectKey }: { organization: string; projectKey: string }) {
  return `sonar.organization=${organization}
sonar.projectKey=${projectKey}


# Auto-detect source and test directories
# SonarCloud will automatically detect common patterns
# But we can specify common directories that might exist
sonar.sources=.
sonar.tests=tests/

# Exclusions - common patterns for different project types
sonar.exclusions=vendor/**,node_modules/**,bootstrap/**,storage/**,public/**,config/**,resources/**,build/**,dist/**,tests/**,test/**,spec/**,*.min.js,*.min.css

# Language specific settings
sonar.php.coverage.reportPaths=coverage.xml
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.typescript.lcov.reportPaths=coverage/lcov.info

# Code analysis settings
sonar.sourceEncoding=UTF-8
`;
}
