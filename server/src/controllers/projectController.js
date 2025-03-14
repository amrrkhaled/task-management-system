// import { uploadFilesToS3 } from "../utils/uploadUtils.js";
import db from "../models/index.js";  
const { sequelize } = db; 
const { Project, ProjectMember, Task, TaskAssignment,User } = db;  
export const createProject = async (req, res) => {
  const { name, description, attachments = [], teamMembers, tasks } = req.body;
  const managerId = req.user.id;
  console.log(req.body);
  // const attachments = req.files; // Assuming multer is used

  const transaction = await sequelize.transaction();
  let attachmentUrls = [];

  try {
    // Step 1: Create Project
    const project = await Project.create(
      { name, description, managerId, attachments: [] },
      { transaction }
    );

    // Step 2: Upload Attachments (if enabled)
    // if (attachments?.length > 0) {
    //   attachmentUrls = await uploadFilesToS3(attachments);
    //   project.attachments = attachmentUrls;
    //   await project.save({ transaction });
    // }

    // Step 3: Add Team Members
    const projectMembers = teamMembers.map(({ userId, role,username }) => ({
      projectId: project.id,
      userId,
      username,
      role,
    }));

    if (projectMembers.length > 0) {
      await ProjectMember.bulkCreate(projectMembers, { transaction });
    }

    // Step 4: Add Tasks
    const taskRecords = await Task.bulkCreate(
      tasks.map(({ title, description }) => ({
        projectId: project.id,
        title,
        description,
      })),
      { transaction, returning: ['id', 'title', 'description'] } 
    );

    // Step 5: Assign Users to Tasks
    const taskAssignments = [];
    tasks.forEach((task, index) => {
      task.assignedTo?.forEach(({userId,username}) => {
        taskAssignments.push({
          taskId: taskRecords[index].id,
          userId,
          username,
        });
      });
    });

    if (taskAssignments.length > 0) {
      await TaskAssignment.bulkCreate(taskAssignments, { transaction });
    }

    await transaction.commit();

    res.status(201).json({
      message: "Project created successfully",
      project,
      members: projectMembers,
      tasks: taskRecords,
      attachments: attachmentUrls, // Now properly defined
    });
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProjectById = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findByPk(projectId, {
      include: [
        {
          model: User, // Manager details
          as: "manager",
          attributes: ["id", "username", "email"],
        },
        {
          model: ProjectMember, // All project members (admins & members)
          as: "members",
          include: [{ model: User, attributes: ["id", "username", "email"] }],
        },
        {
          model: Task, // All tasks with assigned users
          include: [
            {
              model: User,
              as: "assignedUsers",
              through: { attributes: [] }, // Hide pivot table attributes
              attributes: ["id", "username", "email"],
            },
          ],
        },
      ],
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// export const inviteMemberToProject = async (req, res) => {
//   const { projectId, userId, role } = req.body;

//   if (!["member", "admin"].includes(role)) {
//     return res.status(400).json({ message: "Invalid role. Choose 'member' or 'admin'." });
//   }

//   try {
//     const existingMember = await ProjectMember.findOne({ where: { projectId, userId } });

//     if (existingMember) {
//       return res.status(400).json({ message: "User is already a project member." });
//     }

//     await ProjectMember.create({ projectId, userId, role });
//     res.status(201).json({ message: `User invited as ${role} successfully.` });
//   } catch (error) {
//     console.error("Error inviting member:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const removeMemberFromProject = async (req, res) => {
//   const { projectId, userId } = req.body;

//   try {
//     const deleted = await ProjectMember.destroy({ where: { projectId, userId } });

//     if (!deleted) {
//       return res.status(404).json({ message: "Member not found in project." });
//     }

//     res.json({ message: "Member removed successfully." });
//   } catch (error) {
//     console.error("Error removing member:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const deleteProject = async (req, res) => {
//   const { projectId } = req.params;

//   try {
//     const deleted = await Project.destroy({ where: { id: projectId } });

//     if (!deleted) {
//       return res.status(404).json({ message: "Project not found." });
//     }

//     res.json({ message: "Project deleted successfully." });
//   } catch (error) {
//     console.error("Error deleting project:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const getProjectMembers = async (req, res) => {
//   const { projectId } = req.params;

//   try {
//     const members = await ProjectMember.findAll({ where: { projectId } });
//     res.json(members);
//   } catch (error) {
//     console.error("Error fetching project members:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
