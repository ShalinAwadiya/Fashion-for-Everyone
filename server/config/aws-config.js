//Author: Manan Amin (B00897712)

var AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIASVGLKLB6GCFTIT63',
  secretAccessKey: 'XXl+osgOEcmDl/jdHMSzIXIcWD5htbwLfCY5Rkeb',
});

exports.saveImage = async (imageBinary) => {
  var buf = Buffer.from(
    imageBinary.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  );

  const fileName = `fashion-${Math.ceil(Math.random() * 10 ** 10)}`;
  const fileType = 'image/jpeg';
  const s3 = new AWS.S3();

  const s3Params = {
    Bucket: 'fashion-world',
    Key: fileName,
    ContentType: fileType,
    Body: buf,
  };

  const data = await s3.upload(s3Params).promise();
  return data.Location;
};
