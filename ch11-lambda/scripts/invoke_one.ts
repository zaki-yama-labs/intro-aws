import * as Lambda from 'aws-sdk/clients/lambda';

const functionName = process.argv[2];
console.log('function name: ', functionName);
const lambda = new Lambda();

(async () => {
  const response = await lambda.invoke({
    FunctionName: functionName,
    InvocationType: 'RequestResponse'
  }).promise();
  console.log(response.Payload?.toString());
})();

