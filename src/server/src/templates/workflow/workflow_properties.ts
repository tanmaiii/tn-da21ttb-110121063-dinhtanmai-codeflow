export function workflowProperties({ organization, projectKey }: { organization: string; projectKey: string }) {
  return `sonar.organization=${organization}
sonar.projectKey=${projectKey}

sonar.sources=.

sonar.exclusions=node_modules/**, dist/**, build/**, coverage/**
`;
}
