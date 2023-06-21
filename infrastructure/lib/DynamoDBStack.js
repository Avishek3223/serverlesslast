import { CfnOutput } from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as sst from "@serverless-stack/resources";
export default class DynamoDBStack extends sst.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const app = this.node.root;
        const table = new dynamodb.Table(this, "Table", {
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Use on-demand↪ billing mode
            sortKey: { name: "noteId", type: dynamodb.AttributeType.STRING },
            partitionKey: { name: "userId", type: dynamodb.AttributeType.STRING },
        });
        // Output values
        new CfnOutput(this, "TableName", {
            value: table.tableName,
            exportName: app.logicalPrefixedName("TableName"),
        });
        new CfnOutput(this, "TableArn", {
            value: table.tableArn,
            exportName: app.logicalPrefixedName("TableArn"),
        });
    }
}   
