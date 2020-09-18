[AWSによるクラウド入門](https://tomomano.gitlab.io/intro-aws/)
====================


#### 3.5.3. ミニ・ハンズオン: AWS CLI を使ってみよう

```sh
# profile を追加する場合
$ aws configure --profile my-new-profile
AWS Access Key ID [None]: ***********
AWS Secret Access Key [None]: ************8
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
