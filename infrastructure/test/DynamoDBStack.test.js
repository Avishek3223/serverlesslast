import { expect } from 'aws-cdk-lib';
import sst from '@serverless-stack/resources';
import DynamoDBStack from '../lib/DynamoDBStack.js';

describe('DynamoDBStack', () => {
  it('should have expected properties', () => {
    const app = new sst.App();
    const stack = new DynamoDBStack(app, 'test-stack');

    // Add assertions here to test the properties of the DynamoDBStack instance
    // For example:
    expect(stack.table).to.exist;
    expect(stack.table.billingMode).to.equal('PAY_PER_REQUEST');
  });
});