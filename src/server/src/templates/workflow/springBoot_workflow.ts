export function springBootWorkflow({ organization, projectKey }: { organization: string; projectKey: string }) {
  return `name: CI Pipeline

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Set up JDK 17
      uses: actions/setup-java@v4
      with:
        java-version: '17'
        distribution: 'temurin'
        
    - name: Cache Maven dependencies
      uses: actions/cache@v4
      with:
        path: ~/.m2
        key: \${{ runner.os }}-m2-\${{ hashFiles('**/pom.xml') }}
        restore-keys: \${{ runner.os }}-m2
        
    - name: Run tests
      run: mvn clean test
      
    - name: Build application
      run: mvn clean compile
      
    - name: Package application
      run: mvn clean package -DskipTests
      
    - name: Upload build artifacts
      uses: actions/upload-artifact@v4
      with:
        name: jar-artifact
        path: target/*.jar
     
    - name: SonarCloud Scan
      run: mvn sonar:sonar -Dsonar.projectKey=${projectKey} -Dsonar.organization=${organization} -Dsonar.host.url=https://sonarcloud.io -Dsonar.token=\${{ secrets.SONAR_TOKEN }}
      env:
        GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
  `;
}
