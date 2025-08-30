export function springBootProperty({ organization, projectKey }: { organization: string; projectKey: string }) {
  return `sonar.organization=${organization}
sonar.projectKey=${projectKey}

sonar.sources=src/main/java
sonar.tests=src/test/java
sonar.java.binaries=target/classes
sonar.java.test.binaries=target/test-classes

sonar.exclusions=**/target/**,**/*.xml,**/*.properties,**/*.yml,**/*.yaml
`;
}
