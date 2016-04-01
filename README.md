# DISCLAIMER

DO NOT USE IN PRODUCTION. THIS IS FOR LEARNING ONLY, OKAY?

# Timezone Bot

In Slack, I want to know the timezone of a city right now.

Type:

`timezone Sydney, Australia`

or more generically

`timezone {city, state, country}`

# Implementation

## Clone the repo

```sh
git clone https://github.com/joemccann/timezone-slack-bot-aws-lambda.git && cd timezone-slack-bot-aws-lambda
npm i
```

## Zip the Lambda

```sh
zip -r timezone-lambda.zip timezone-lambda.js timezone-search.js node_modules
```

## Create the Lamdbda on AWS

```sh
aws lambda create-function \
--region us-west-2 \
--function-name timezone-lambda \
--zip-file fileb://timezone-lambda.zip \
--role arn:aws:iam::500402104533:role/APIGatewayLambdaExecRole \
--handler timezone-lambda.handler \
--runtime nodejs \
--memory-size 512 \
--timeout 10 \
--description "Lambda function to get the timezone of a location."
```

## Update Process

If you make changes to the code, run this to update and deploy to AWS.

```sh
zip -r timezone-lambda.zip timezone-lambda.js timezone-search.js node_modules && aws lambda update-function-code --function-name timezone-lambda --zip-file fileb://timezone-lambda.zip
```

```sh
curl -H "Content-Type: application/json" -X POST -d "{\"text\": \"timezone new york city\"}" https://xuq8c563mi.execute-api.us-west-2.amazonaws.com/test/get-timezone-time
```

## AWS API Gateway

Create a New API
Create a New Resource (`get-timezone-time`)
Create a New Method (`POST`)

*NOTE*: We need to setup a mapping template because Slack sends `application/x-www-form-urlencoded` not `json`:

https://gist.github.com/joemccann/e5957762ff2515daab27eea1b7d10e81

In API Gateway (  Method Execution/get-timezone-time - POST - Integration Request )

![api gateway](https://cldup.com/Po9wzeOLI6-3000x3000.png)

Deploy your API.  Copy the URL that appears and save for later.

# Slack

Need to add custom Slash command:

https://nodesource.slack.com/apps/

![img](https://cldup.com/iyZtyGrRAh.thumb.png)

Follow the process for adding the new Slash command including the URL from your API gateway.

# LICENSE

MIT (see LICENSE file)
