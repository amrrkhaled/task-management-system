import { ReceiveMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";
import { sqsClient } from "../config/awsConfig.js";
import { sendEmail } from "../services/emailSender.js";

const QUEUE_URL = process.env.SQS_QUEUE_URL;

export async function processEmailQueue() {
  const params = {
    QueueUrl: QUEUE_URL,
    MaxNumberOfMessages: 5,
    WaitTimeSeconds: 10,
  };

  try {
    const data = await sqsClient.send(new ReceiveMessageCommand(params));
    if (data.Messages) {
      for (const message of data.Messages) {
      

        const { toEmail, messageType, extraData } = JSON.parse(message.Body);
        await sendEmail(toEmail, messageType, extraData);

        await sqsClient.send(
          new DeleteMessageCommand({ QueueUrl: QUEUE_URL, ReceiptHandle: message.ReceiptHandle })
        );
      }
    }
  } catch (err) {
    console.error("Error processing queue:", err);
  }
}

setInterval(processEmailQueue, 5000);
console.log("Email worker started, polling SQS queue...");
