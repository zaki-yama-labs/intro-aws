#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Ch08Stack } from '../lib/ch08-stack';

const app = new cdk.App();
new Ch08Stack(app, 'Ch08Stack');
