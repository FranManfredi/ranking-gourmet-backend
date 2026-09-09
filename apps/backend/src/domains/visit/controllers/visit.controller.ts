import { Request, Response } from 'express';
import { VisitService } from '../services/visit.service.js';
import { CreateVisitDTO, UpdateVisitDTO, VisitWithDetailsDTO, SimpleVisitDTO } from '../dto/visit.dto.js';

export class VisitController {
  private service = new VisitService();

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const visits: VisitWithDetailsDTO[] = await this.service.getAll();
      res.json(visits);
    } catch (error) {
      console.error('Error in getAll visits:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  gatAllByRestaurantId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { restaurantId } = req.params;
      const visits: VisitWithDetailsDTO[] = await this.service.getAllByRestaurantId(Number(restaurantId));
      res.json(visits);
    } catch (error) {
      console.error('Error in getAllByRestaurantId visits:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const visit: VisitWithDetailsDTO = await this.service.getById(Number(id));
      res.json(visit);
    } catch (error: any) {
      console.error('Error in getById visit:', error);
      const status = error.message === 'Visit not found' ? 404 : 500;
      res.status(status).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const data: CreateVisitDTO = req.body;
      const visit: SimpleVisitDTO = await this.service.create(data);
      res.status(201).json(visit);
    } catch (error) {
      console.error('Error in create visit:', error);
      res.status(500).json({ error: 'Error creating visit' });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const data: UpdateVisitDTO = req.body;
      const visit: SimpleVisitDTO = await this.service.update(Number(id), data);
      res.json(visit);
    } catch (error: any) {
      console.error('Error in update visit:', error);
      const status = error.message === 'Visit not found' ? 404 : 500;
      res.status(status).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.service.delete(Number(id));
      res.status(204).send();
    } catch (error: any) {
      console.error('Error in delete visit:', error);
      const status = error.message === 'Visit not found' ? 404 : 500;
      res.status(status).json({ error: error.message });
    }
  };
}
