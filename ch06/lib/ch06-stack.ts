import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

export class Ch06Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const subnetConfiguration: ec2.SubnetConfiguration = {
      name: 'public',
      subnetType: ec2.SubnetType.PUBLIC,
    };
    const vpc = new ec2.Vpc(this, 'Ec2ForDl-Vpc', {
      maxAzs: 1,
      cidr: '10.10.0.0/23',
      subnetConfiguration: [
        subnetConfiguration
      ],
      natGateways: 0,
    });

    const sg = new ec2.SecurityGroup(this, 'Ec2ForDl-Sg', {
      vpc,
      allowAllOutbound: true,
    });
    sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22),
    );

    const keyName = this.node.tryGetContext('key_name');
    console.log('keyName:', keyName);

    const host = new ec2.Instance(
      this, 'Ec2ForDl-Instance',
      {
        instanceType: new ec2.InstanceType('g4dn.xlarge'),
        machineImage: ec2.MachineImage.genericLinux({
          'ap-northeast-1': 'ami-09c0c16fc46a29ed9'
        }),
        vpc,
        vpcSubnets: {
          subnetType: ec2.SubnetType.PUBLIC,
        },
        securityGroup: sg,
        keyName,
      }
    );

    new cdk.CfnOutput(this, "InstancePublicDnsName", {
      value: host.instancePublicDnsName
    });
    new cdk.CfnOutput(this, "InstancePublicIp", {
      value: host.instancePublicIp
    });
  }
}
