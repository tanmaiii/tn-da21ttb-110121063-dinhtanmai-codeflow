export function laravelWorkflow({ organization, projectKey }: { organization: string; projectKey: string }) {
  return `name: SonarCloud Analysis - Laravel

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

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.1'
          extensions: mbstring, dom, fileinfo
          coverage: xdebug

      - name: Create environment file
        run: |
          echo "APP_NAME=Laravel" > .env
          echo "APP_ENV=testing" >> .env
          echo "APP_KEY=" >> .env
          echo "APP_DEBUG=true" >> .env
          echo "APP_URL=http://localhost" >> .env
          echo "LOG_CHANNEL=stack" >> .env

      - name: Install Composer dependencies
        run: composer install --no-progress --prefer-dist --optimize-autoloader

      - name: Generate application key (if Laravel)
        run: php artisan key:generate || echo "Not a Laravel project, skipping key generation"
        continue-on-error: true

      - name: Run tests with coverage
        run: |
          ./vendor/bin/phpunit --coverage-clover=coverage.xml --coverage-text --colors=never
        continue-on-error: true

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@v2
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
  `;
}
