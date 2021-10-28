const AwsSdk = require('aws-sdk');
const fs = require('fs');

// Better to contain it in .env file
const AWS_ACCESS_KEY_ID = 'PUT_YOUR_AWS_ACCESS_KEY_ID_HERE';
const AWS_SECRET_ACCESS_KEY = 'PUT_YOUR_AWS_SECRET_ACCESS_KEY_HERE';
const AWS_S3_BUCKET_NAME = 'PUT_YOUR_AWS_S3_BUCKET_NAME_HERE';

AwsSdk.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

class AwsUploader {
  constructor() {
    this.aws = new AwsSdk.S3();
  }

  uploadOne = async (file) => {
    const response = await this.aws.upload({
      Bucket: AWS_S3_BUCKET_NAME,
      Key: file,
      Body: fs.createReadStream(file)
    }).promise()
      .then((res) => ({
        data: res,
        error: null
      }))
      .catch((error) => ({
        error,
        data: null
      }));

    // Deleting locale file (if need)
    if (!response.error) {
      await fs.unlinkSync(file);
    }

    return response;
  }
}

module.exports = new AwsUploader();
