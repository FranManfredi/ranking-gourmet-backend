import { Request, Response } from 'express';
import { ReviewService } from '../services/review.service.js';
import { CreateReviewDTO, UpdateReviewDTO, ReviewWithDetailsDTO, SimpleReviewDTO } from '../dto/review.dto.js';

export class ReviewController {
  private service = new ReviewService();

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const reviews: ReviewWithDetailsDTO[] = await this.service.getAll();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const review: ReviewWithDetailsDTO = await this.service.getById(Number(id));
      res.json(review);
    } catch (error: any) {
      const status = error.message === 'Review not found' ? 404 : 500;
      res.status(status).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const data: CreateReviewDTO = req.body;
      const review: SimpleReviewDTO = await this.service.create(data);
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ error: 'Error creating review' });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const data: UpdateReviewDTO = req.body;
      const review: SimpleReviewDTO = await this.service.update(Number(id), data);
      res.json(review);
    } catch (error: any) {
      const status = error.message === 'Review not found' ? 404 : 500;
      res.status(status).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.service.delete(Number(id));
      res.status(204).send();
    } catch (error: any) {
      const status = error.message === 'Review not found' ? 404 : 500;
      res.status(status).json({ error: error.message });
    }
  };

  getByVisitId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { visitId } = req.params;
      const reviews: ReviewWithDetailsDTO[] = await this.service.getByVisitId(Number(visitId));
      res.json(reviews);
    } catch (error: any) {
      const status = error.message === 'Reviews not found for this visit' ? 404 : 500;
      res.status(status).json({ error: error.message });
    }
  };
}
