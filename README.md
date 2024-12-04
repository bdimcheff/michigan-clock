# Michigan Clock Bot

Tells you how many days it has been since Ohio State has beaten Michigan at football.

## Set Up

1. Install Typescript: `npm i -g typescript`
2. Install Node.js: `npm i -g ts-node`
3. Make a copy of the example `.env` file by running: `cp example.env .env`. Set your username and password in `.env`. Use an App Password.
4. Compile your project by running: `npx tsc` or activate watch mode to have your code automatically compile: `npx tsc -w`

## Running the script
1. You can run the script locally: `node index.js`. You should see a skeet posted on your account.

## Deploying your bot
1. This bot runs as a github action every morning. See `.github/workflows/skeet.yml`.
