import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class BackendInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const apiLambda = new lambda.Function(this, 'apiLambda', {
      runtime: lambda.Runtime.PYTHON_3_11,
      code: lambda.Code.fromAsset('../backend/'),
      handler: 'api.handler',
    });
  }
}
