import * as cdk from "@aws-cdk/core";
import * as ddb from "@aws-cdk/aws-dynamodb";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as ssm from "@aws-cdk/aws-ssm";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";

export class Ch12Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // dynamoDBtable to store haiku
    const table = new ddb.Table(this, "Bashoutter-Table", {
      partitionKey: {
        name: "item_id",
        type: ddb.AttributeType.STRING,
      },
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const bucket = new s3.Bucket(this, "Bashoutter-Bucket", {
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    new s3deploy.BucketDeployment(this, "BucketDeployment", {
      destinationBucket: bucket,
      sources: [s3deploy.Source.asset("./gui/dist")],
      retainOnDelete: false,
    });

    const commonParams = {
      runtime: lambda.Runtime.PYTHON_3_7,
      environment: {
        TABLE_NAME: table.tableName,
      },
    };

    // define Lambda functions
    const getHaikuLambda = new lambda.Function(this, "GetHaiku", {
      code: lambda.Code.fromAsset("api"),
      handler: "api.get_haiku",
      memorySize: 512,
      timeout: cdk.Duration.seconds(10),
      ...commonParams,
    });
    const postHaikuLambda = new lambda.Function(this, "PostHaiku", {
      code: lambda.Code.fromAsset("api"),
      handler: "api.post_haiku",
      ...commonParams,
    });
    const patchHaikuLambda = new lambda.Function(this, "PatchHaiku", {
      code: lambda.Code.fromAsset("api"),
      handler: "api.patch_haiku",
      ...commonParams,
    });
    const deleteHaikuLambda = new lambda.Function(this, "DeleteHaiku", {
      code: lambda.Code.fromAsset("api"),
      handler: "api.delete_haiku",
      ...commonParams,
    });

    // grant permissions
    table.grantReadData(getHaikuLambda);
    table.grantReadWriteData(postHaikuLambda);
    table.grantReadWriteData(patchHaikuLambda);
    table.grantReadWriteData(deleteHaikuLambda);

    // define API Gateway
    const api = new apigw.RestApi(this, "BashoutterApi", {
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
      },
    });

    const haiku = api.root.addResource("haiku");
    haiku.addMethod("GET", new apigw.LambdaIntegration(getHaikuLambda));
    haiku.addMethod("POST", new apigw.LambdaIntegration(postHaikuLambda));

    const haikuItemId = haiku.addResource("{item_id}");
    haikuItemId.addMethod(
      "PATCH",
      new apigw.LambdaIntegration(patchHaikuLambda)
    );
    haikuItemId.addMethod(
      "DELETE",
      new apigw.LambdaIntegration(deleteHaikuLambda)
    );

    // store parameters in SSM
    new ssm.StringParameter(this, "TABLE_NAME", {
      parameterName: "TABLE_NAME",
      stringValue: table.tableName,
    });

    new ssm.StringParameter(this, "ENDPOINT_URL", {
      parameterName: "ENDPOINT_URL",
      stringValue: api.url,
    });

    // Output parameters
    new cdk.CfnOutput(this, "BucketUrl", {
      value: bucket.bucketWebsiteDomainName,
    });
  }
}
