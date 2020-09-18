#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Ch04Stack } from '../lib/ch04-stack';

const app = new cdk.App();
new Ch04Stack(app, 'Ch04Stack');
