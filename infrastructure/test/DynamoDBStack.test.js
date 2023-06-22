// DynamoDBStack.test.js
import "@babel/register";
import { expect, haveResource } from "@aws-cdk/assert";
import { App } from "@serverless-stack/resources";
import DynamoDBStack from "../lib/DynamoDBStack";

test("Test Stack", () => {
  const app = new App();
  // WHEN
  const stack = new DynamoDBStack(app, "test-stack");
  // THEN
  expect(stack).to(
    haveResource("AWS::DynamoDB::Table", {
      BillingMode: "PAY_PER_REQUEST",
    })
  );
});
