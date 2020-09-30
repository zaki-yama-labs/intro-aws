import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";

const FUNC = `
import time
from random import choice, randint
def handler(event, context):
    time.sleep(randint(2,5))
    pokemon = ["Charmander", "Bulbasaur", "Squirtle"]
    message = "Congratulations! You are given " + choice(pokemon)
    print(message)
    return message
`;

export class Ch11Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new lambda.Function(this, "LambdaHandler", {
      runtime: lambda.Runtime.PYTHON_3_7,
      handler: "index.handler",
      code: lambda.Code.fromInline(FUNC),
      memorySize: 128,
      timeout: cdk.Duration.seconds(10),
      deadLetterQueueEnabled: true,
    });

    new cdk.CfnOutput(this, "FunctionName", { value: handler.functionName });
  }
}
