import { s3 } from "../config/awsConfig.js";

export const uploadFileToS3 = async (file) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `uploads/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read", // Allows public access
  };

  const { Location } = await s3.upload(params).promise();
  return Location; // Return file URL
};
