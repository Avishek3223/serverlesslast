import { Construct } from "constructs";
import { Role, FederatedPrincipal, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { CfnIdentityPoolRoleAttachment } from "aws-cdk-lib/aws-cognito";

export default class CognitoAuthRole extends Construct {
  // Public reference to the IAM role
  role;

  constructor(scope, id, props) {
    super(scope, id);

    const { identityPool } = props;

    // IAM role used for authenticated users
    this.role = new Role(this, "CognitoDefaultAuthenticatedRole", {
      assumedBy: new FederatedPrincipal(
        "cognito-identity.amazonaws.com",
        {
          StringEquals: {
            "cognito-identity.amazonaws.com:aud": identityPool.ref,
          },
          "ForAnyValue:StringLike": {
            "cognito-identity.amazonaws.com:amr": "authenticated",
          },
        },
        "sts:AssumeRoleWithWebIdentity"
      ),
    });

    this.role.addToPolicy(
      new PolicyStatement({
        effect: "Allow",
        actions: [
          "mobileanalytics:PutEvents",
          "cognito-sync:*",
          "cognito-identity:*",
        ],
        resources: ["*"],
      })
    );

    new CfnIdentityPoolRoleAttachment(
      this,
      "IdentityPoolRoleAttachment",
      {
        identityPoolId: identityPool.ref,
        roles: { authenticated: this.role.roleArn },
      }
    );
  }
}
