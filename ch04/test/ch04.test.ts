import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Ch04 from '../lib/ch04-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Ch04.Ch04Stack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
