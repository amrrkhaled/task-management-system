import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { sqsClient } from "../config/awsConfig.js";
import { randomUUID } from "crypto"; // Import for unique IDs

const QUEUE_URL = process.env.SQS_QUEUE_URL;

export async function queueEmail(toEmail, messageType, extraData = {}) {
  const messageBody = JSON.stringify({ toEmail, messageType, extraData });

  const params = {
    QueueUrl: QUEUE_URL,
    MessageBody: messageBody,
    MessageGroupId: "email-group",
    MessageDeduplicationId: randomUUID(), // Ensure each message is unique
  };

  try {
    await sqsClient.send(new SendMessageCommand(params));
    console.log(`Email queued: ${toEmail} - ${messageType}`);
  } catch (err) {
    console.error("Error queuing email:", err);
  }
}
