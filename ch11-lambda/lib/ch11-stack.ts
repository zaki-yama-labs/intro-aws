import * as path from 'path';
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";

export class Ch11Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new lambda.Function(this, "LambdaHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda-handlers')),
      memorySize: 128,
      timeout: cdk.Duration.seconds(10),
      deadLetterQueueEnabled: true,
    });

    new cdk.CfnOutput(this, "FunctionName", { value: handler.functionName });
  }
}
