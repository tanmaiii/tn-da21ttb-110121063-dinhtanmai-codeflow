export interface SonarMeasures {
  component: {
    id: string;
    key: string;
    name: string;
    qualifier: string;
    measures: {
      metric: string;
      value: string;
      bestValue: boolean;
    }[];
  };
}

export interface SonarCreate {
  project: {
    key: string;
    name: string;
    qualifier: string;
    visibility: string;
    uuid: string;
  };
}
