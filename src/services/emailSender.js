import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "../config/awsConfig.js";

export async function sendEmail(toEmail, messageType, extraData = {}) {
  let subject, body;
  switch (messageType) {
    case "resetPassword":
      subject = "Password Reset Request";
      body = `Hello,\n\nUse this code: ${extraData.code}\n\nIf you didn't request this, ignore it.`;
      break;
      case "newAccount":
      subject = "New Account";
      body = `Hello,\n\nWelcome to our platform!\n\nIf you didn't request this, ignore it.`;
      break;
    case "projectInvitationAdmin":
      subject = "Project Assignment (Admin)";
      body = `Hello,\n\nYou've been assigned as an admin to "${extraData.projectName}".`;
      break;
    case "projectInvitationMember":
      subject = "Project Assignment (Member)";
      body = `Hello,\n\nYou've been added to project "${extraData.projectName}".`;
      break;
    case "taskAssigned":
      subject = "New Task Assigned";
      body = `You have a new task: ${extraData.taskName}`;
      break;
    default:
      throw new Error("Invalid message type!");
  }

  const params = {
    Source: process.env.SENDER_EMAIL,
    Destination: { ToAddresses: [toEmail] },
    Message: {
      Subject: { Data: subject },
      Body: { Text: { Data: body } },
    },
  };

  try {
    await sesClient.send(new SendEmailCommand(params));
    console.log(`Email sent to ${toEmail}`);
  } catch (err) {
    console.error("Error sending email:", err);
  }
}
