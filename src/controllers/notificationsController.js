import { Notification, Project, Task } from "../models"; // Import the Notification model
import { io, onlineUsers } from "../server.js"; // WebSocket instance

export const assignTask = async (req, res) => {
    const { userId, taskId, taskName } = req.body;

    try {
        await Notification.create({
            text: `You have been assigned to the task: ${taskName}`,
            type: "task",
            userId,
            taskId,
        });

        // Send real-time notification if the user is online
        if (onlineUsers.has(userId)) {
            io.to(onlineUsers.get(userId)).emit("newNotification", {
                message: `You have been assigned to the task: ${taskName}`,
                taskId
            });
        }

        res.status(200).json({ message: "Task assigned successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error assigning task" });
    }
};

export const sendProjectInvitations = async (req, res) => {
    const { projectId, userIds } = req.body;
    try {
        const project = await Project.findByPk(projectId);
        if (!project) return res.status(404).json({ error: "Project not found" });

        const notifications = userIds.map((userId) => ({
            text: `You have been invited to join the project: ${project.name}`,
            type: "invitation",
            userId,
            projectId,
        }));

        await Notification.bulkCreate(notifications);

        userIds.forEach((userId) => {
            if (onlineUsers.has(userId)) {
                io.to(onlineUsers.get(userId)).emit("newNotification", {
                    message: `You have been invited to join the project: ${project.name}`,
                    projectId
                });
            }
        });
        res.status(200).json({ message: "Invitations sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send invitations" });
    }
};
export const getUnseenNotifications = async (req, res) => {
    const { userId } = req.params;

    try {
        const notifications = await Notification.findAll({
            where: { userId, seen: false },
            order: [["createdAt", "DESC"]],
        });

        res.status(200).json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve notifications" });
    }
};


export const markNotificationsAsSeen = async (req, res) => {
    const { userId } = req.body;

    try {
        await Notification.update({ seen: true }, { where: { userId } });
        res.status(200).json({ message: "Notifications marked as seen" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update notifications" });
    }
};