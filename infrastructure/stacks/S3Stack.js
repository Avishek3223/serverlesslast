import * as cdk from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import * as sst from "@serverless-stack/resources";
export default class S3Stack extends sst.Stack {
    // Public reference to the S3 bucket
    bucket;
    constructor(scope, id, props) {
        super(scope, id, props);
        this.bucket = new Bucket(this, "Uploads", {
            // Allow client side access to the bucket from a different domain
            cors: [
                {
                    maxAge: 3000,
                    allowedOrigins: ["*"],
                    allowedHeaders: ["*"],
                    allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
                },
            ],
        });
        // Export values
        new cdk.CfnOutput(this, "AttachmentsBucketName", {
            value: this.bucket.bucketName,
        });
    }
}