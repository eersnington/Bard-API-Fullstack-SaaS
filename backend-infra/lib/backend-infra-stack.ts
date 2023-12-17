import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dotenv from 'dotenv';

dotenv.config();

export class BackendInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const layer = new lambda.LayerVersion(this, "BaseLayer", {
      code: lambda.Code.fromAsset("lambda_base_layer/layer.zip"),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_10],
    });

    const apiLambda = new lambda.Function(this, 'apiLambda', {
      runtime: lambda.Runtime.PYTHON_3_10,
      code: lambda.Code.fromAsset('../backend/'),
      handler: 'api.handler',
      layers: [layer],
      environment: {
        PALM_API_KEY: process.env.PALM_API_KEY || '',
      }
    });

    const backendApi = new apigateway.RestApi(this, 'RestApi', {
      restApiName: 'BackendApi',
    });

    backendApi.root.addProxy({
      defaultIntegration: new apigateway.LambdaIntegration(apiLambda),
    });
  }
}
