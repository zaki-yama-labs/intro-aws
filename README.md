[AWSによるクラウド入門](https://tomomano.gitlab.io/intro-aws/)
====================


#### 3.5.3. ミニ・ハンズオン: AWS CLI を使ってみよう

```sh
# profile を追加する場合
$ aws configure --profile my-new-profile
AWS Access Key ID [None]: ***********
AWS Secret Access Key [None]: ************
Default region name [None]: ap-northeast-1
Default output format [None]: JSON

$ export AWS_PROFILE=my-new-profile
```

```sh
# s3のバケット生成
$ aws s3 mb "s3://${bucketName}"


# バケットの確認
$ aws s3 ls


# バケットにファイル追加
$ aws s3 cp hello_world.txt "s3://${bucketName}/hello_world.txt"

# バケットの削除 (バケット内にファイルが存在する場合は--forceが必要)
$ aws s3 "s3://${bucketName}" --force
```

### 3.6. CloudFormation と AWS CDK

- リソースを操作するコマンドと、タスクを実行するコマンドに分けられる
  - リソース操作: s3 にバケット作成、EC2 のインスタンス起動など、静的なリソースを操作
  - タスク実行: EC2 のインスタンスにジョブを投入したり，S3 のバケットにデータを読み書きするなどの動的な操作
- CloudFormationはAWSでのリソースを管理するための仕組み
  - JSONで記述する。記述量が膨大

#### 3.6.2 AWS CDK
- CDK: Cloud Development Kit
- Python などのプログラミング言語を使ってCloudFormationを自動的に生成してくれるツール


## 4. Hands-on #1: 初めてのEC2インスタンスを起動する

- VPC, Security Group(SG), EC2 インスタンスの作成例
- 4.3.2 Security Group

> Security group (SG) は，EC2インスタンスに付与することのできる仮想ファイアーウォールである．例えば，特定のIPアドレスから来た接続を許したり　(インバウンド・トラフィックの制限) ，逆に特定のIPアドレスへのアクセスを禁止したり (アウトバウンド・トラフィックの制限) することができる．

### :warning: ハマったところ

4.4.4. デプロイを実行

```
$ cdk deploy -c key_name="XXX"
```

`-c` は context。  
https://docs.aws.amazon.com/cdk/latest/guide/context.html

context はコード中では

```ts
const keyName = this.node.tryGetContext('key_name');
```

のような形で取り出す。
