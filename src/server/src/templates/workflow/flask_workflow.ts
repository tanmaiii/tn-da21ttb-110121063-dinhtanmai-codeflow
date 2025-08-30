export function flaskWorkflow({ organization, projectKey }: { organization: string; projectKey: string }) {
  return `name: SonarCloud Analysis - Flask

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

      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          if [ -f requirements.txt ]; then
            pip install -r requirements.txt
          elif [ -f Pipfile ]; then
            pip install pipenv && pipenv install --dev
          else
            echo "No requirements file found"
          fi

      - name: Run Flask linting (if available)
        run: |
          if command -v flake8 &> /dev/null; then
            flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
          elif command -v pylint &> /dev/null; then
            pylint **/*.py
          else
            echo "No Python linter found"
          fi
        continue-on-error: true

      - name: Run tests
        run: |
          if [ -f pytest.ini ] || [ -f setup.cfg ] || [ -f pyproject.toml ]; then
            pytest --cov=. --cov-report=xml
          elif [ -f manage.py ]; then
            python -m unittest discover
          else
            echo "No test configuration found"
          fi
        continue-on-error: true

      - name: Check Flask app (if app.py exists)
        run: |
          if [ -f app.py ]; then
            python -c "import app; print('Flask app import successful')"
          elif [ -f wsgi.py ]; then
            python -c "import wsgi; print('WSGI app import successful')"
          else
            echo "No Flask app file found"
          fi
        continue-on-error: true

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@v2
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
  `;
}
