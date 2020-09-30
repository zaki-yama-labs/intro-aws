#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Ch11DynamodbStack } from '../lib/ch11-dynamodb-stack';

const app = new cdk.App();
new Ch11DynamodbStack(app, 'Ch11DynamodbStack');
