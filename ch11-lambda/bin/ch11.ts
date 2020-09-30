#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Ch11Stack } from '../lib/ch11-stack';

const app = new cdk.App();
new Ch11Stack(app, 'Ch11Stack');
