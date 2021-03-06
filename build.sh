#!/usr/bin/env bash

set -e

PROJECT=dotcom:not-found

sudo apt-get install zip -y

if [[ -z $BUILD_NUMBER ]]; then
  BUILD_NUMBER=0
fi

if [[ -z $BUILD_VCS_NUMBER ]]; then
  BUILD_NUMBER=unknown
fi

if [[ -z $BRANCH_NAME ]]; then
  BRANCH_NAME=unknown
fi

npm install
npm run build
cd dist
zip -r moon.zip render.js
cd ..
[ -d target ] && rm -rf target
mkdir -p target/lambda
mkdir -p target/moon-cfn
mv dist/moon.zip ./target/lambda/moon.zip
cp cloudformation.yml ./target/moon-cfn

cp riff-raff.yaml target

BUILD_START_DATE=$(date +"%Y-%m-%dT%H:%M:%S.000Z")

cat >target/build.json << EOF
{
   "projectName":"$PROJECT",
   "buildNumber":"$BUILD_NUMBER",
   "startTime":"$BUILD_START_DATE",
   "revision":"$BUILD_VCS_NUMBER",
   "vcsURL":"git@github.com:guardian/moon.git",
   "branch":"$BRANCH_NAME"
}
EOF

aws s3 cp --acl bucket-owner-full-control --region=eu-west-1 --recursive target s3://riffraff-artifact/$PROJECT/$BUILD_NUMBER
aws s3 cp --acl bucket-owner-full-control --region=eu-west-1 target/build.json s3://riffraff-builds/$PROJECT/$BUILD_NUMBER/build.json
