#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Ch12Stack } from '../lib/ch12-stack';

const app = new cdk.App();
new Ch12Stack(app, 'Ch12Stack', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  }
});
