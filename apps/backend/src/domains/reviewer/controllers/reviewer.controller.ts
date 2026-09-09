import { Request, Response } from 'express';
import { ReviewerService } from '../services/reviewer.service.js';
import { CreateReviewerDTO, UpdateReviewerDTO, ReviewerWithReviewsDTO, SimpleReviewerDTO } from '../dto/reviewer.dto.js';

export class ReviewerController {
  private service = new ReviewerService();

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const reviewers: ReviewerWithReviewsDTO[] = await this.service.getAll();
      res.json(reviewers);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const reviewer: ReviewerWithReviewsDTO = await this.service.getById(Number(id));
      res.json(reviewer);
    } catch (error: any) {
      const status = error.message === 'Reviewer not found' ? 404 : 500;
      res.status(status).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const data: CreateReviewerDTO = req.body;
      const reviewer: SimpleReviewerDTO = await this.service.create(data);
      res.status(201).json(reviewer);
    } catch (error) {
      res.status(500).json({ error: 'Error creating reviewer' });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const data: UpdateReviewerDTO = req.body;
      const reviewer: SimpleReviewerDTO = await this.service.update(Number(id), data);
      res.json(reviewer);
    } catch (error: any) {
      const status = error.message === 'Reviewer not found' ? 404 : 500;
      res.status(status).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.service.delete(Number(id));
      res.status(204).send();
    } catch (error: any) {
      const status = error.message === 'Reviewer not found' ? 404 : 500;
      res.status(status).json({ error: error.message });
    }
  };
}
