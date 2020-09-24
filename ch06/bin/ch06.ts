#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Ch06Stack } from '../lib/ch06-stack';

const app = new cdk.App();
new Ch06Stack(app, 'Ch06Stack', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  }
});
