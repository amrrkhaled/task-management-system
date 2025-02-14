import express from "express";
import * as projectController from "../controllers/projectController.js";
import { checkManager, verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /createProject:
 *   post:
 *     summary: Create a new project
 *     description: Creates a project, assigns a manager, adds team members, uploads attachments, and creates tasks.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - teamMembers
 *               - tasks
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Project"
 *               description:
 *                 type: string
 *                 example: "A detailed project description"
 *               teamMembers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - userId
 *                     - role
 *                   properties:
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     role:
 *                       type: string
 *                       enum: ["admin", "member"]
 *                       example: "admin"
 *               tasks:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - title
 *                     - description
 *                     - assignedTo
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "Setup repo"
 *                     description:
 *                       type: string
 *                       example: "Initialize GitHub repository"
 *                     assignedTo:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: uuid
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Project created successfully"
 *                 project:
 *                   type: object
 *                   example:
 *                     id: "123e4567-e89b-12d3-a456-426614174000"
 *                     name: "New Project"
 *                     description: "A detailed project description"
 *                 members:
 *                   type: array
 *                   items:
 *                     type: object
 *                     example:
 *                       projectId: "123e4567-e89b-12d3-a456-426614174000"
 *                       userId: "987e4567-e89b-12d3-a456-426614174999"
 *                       role: "admin"
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     example:
 *                       projectId: "123e4567-e89b-12d3-a456-426614174000"
 *                       title: "Setup repo"
 *                       assignedTo: ["123e4567-e89b-12d3-a456-426614174000"]
 *       400:
 *         description: Bad request - missing or invalid data
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       500:
 *         description: Internal server error
 */

router.post("/createProject", verifyToken,projectController.createProject);
/**
 * @swagger
 * /projects/{projectId}:
 *   get:
 *     summary: Get project details by ID
 *     description: Fetches a project along with its members, tasks, and assignments.
 *     tags: 
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project to retrieve.
 *     responses:
 *       200:
 *         description: Project details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "10"
 *                 name:
 *                   type: string
 *                   example: "Task Management System"
 *                 description:
 *                   type: string
 *                   example: "A platform for managing tasks and projects."
 *                 attachments:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "https://s3.amazonaws.com/bucket/project-doc.pdf"
 *                 managerId:
 *                   type: string
 *                   example: "1"
 *                 members:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "2"
 *                       role:
 *                         type: string
 *                         example: "admin"
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "5"
 *                       title:
 *                         type: string
 *                         example: "Setup repo"
 *                       description:
 *                         type: string
 *                         example: "Initialize GitHub repository"
 *                       status:
 *                         type: string
 *                         example: "todo"
 *                       assignedTo:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: "3"
 *                             name:
 *                               type: string
 *                               example: "Jane Smith"
 *       404:
 *         description: Project not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Project not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get("/projects/:projectId", verifyToken,projectController.getProjectById);
// router.patch("/editProject", verifyToken,checkManager,projectController.editProject);
// router.post("/inviteMemberToProject", authController.forgotPassword);
// router.delete("/inviteMemberToProject", verifyToken,checkManager, projectController.removeMemberFromProject);



export default router;
