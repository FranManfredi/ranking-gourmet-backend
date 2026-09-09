import { Router } from 'express';
import { VisitController } from '../controllers/visit.controller.js';

const router = Router();
const controller = new VisitController();

/**
 * @swagger
 * tags:
 *   name: Visits
 *   description: Visit management
 */

/**
 * @swagger
 * /api/visits:
 *   get:
 *     summary: Retrieve a list of visits
 *     tags: [Visits]
 *     responses:
 *       200:
 *         description: A list of visits.
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/visits/restaurant/{id}:
 *   get:
 *     summary: Retrieve visits for a specific restaurant
 *     tags: [Visits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of visits for the restaurant.
 */
router.get('/restaurant/:restaurantId', controller.gatAllByRestaurantId);``

/**
 * @swagger
 * /api/visits/{id}:
 *   get:
 *     summary: Get a visit by ID
 *     tags: [Visits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Visit data
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /api/visits:
 *   post:
 *     summary: Create a new visit
 *     tags: [Visits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - restaurantId
 *             properties:
 *               restaurantId: { type: integer }
 *               visitedAt: { type: string, format: date-time }
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', controller.create);

/**
 * @swagger
 * /api/visits/{id}:
 *   patch:
 *     summary: Update a visit
 *     tags: [Visits]
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
 *               visitedAt: { type: string, format: date-time }
 *     responses:
 *       200:
 *         description: Updated
 */
router.patch('/:id', controller.update);

/**
 * @swagger
 * /api/visits/{id}:
 *   delete:
 *     summary: Delete a visit
 *     tags: [Visits]
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
