import { Router } from 'express';
import { ReviewerController } from '../controllers/reviewer.controller.js';

const router = Router();
const controller = new ReviewerController();

/**
 * @swagger
 * tags:
 *   name: Reviewers
 *   description: Reviewer management
 */

/**
 * @swagger
 * /api/reviewers:
 *   get:
 *     summary: Retrieve a list of reviewers
 *     tags: [Reviewers]
 *     responses:
 *       200:
 *         description: A list of reviewers.
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/reviewers/{id}:
 *   get:
 *     summary: Get a reviewer by ID
 *     tags: [Reviewers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reviewer data
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /api/reviewers:
 *   post:
 *     summary: Create a new reviewer
 *     tags: [Reviewers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - surname
 *             properties:
 *               name: { type: string }
 *               surname: { type: string }
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', controller.create);

/**
 * @swagger
 * /api/reviewers/{id}:
 *   patch:
 *     summary: Update a reviewer
 *     tags: [Reviewers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               surname: { type: string }
 *     responses:
 *       200:
 *         description: Updated
 */
router.patch('/:id', controller.update);

/**
 * @swagger
 * /api/reviewers/{id}:
 *   delete:
 *     summary: Delete a reviewer
 *     tags: [Reviewers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Deleted
 */
router.delete('/:id', controller.delete);

export default router;
