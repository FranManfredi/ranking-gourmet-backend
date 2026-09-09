import { ReviewRepository } from '../repositories/review.repository.js';
import {CreateReviewDTO, ReviewWithDetailsDTO, SimpleReviewDTO, UpdateReviewDTO} from "../dto/review.dto.js";

export class ReviewService {
  private repository = new ReviewRepository();

  async getAll(): Promise<ReviewWithDetailsDTO[]> {
    return this.repository.findAll() as unknown as Promise<ReviewWithDetailsDTO[]>;
  }

  async getById(id: number): Promise<ReviewWithDetailsDTO> {
    const review = await this.repository.findById(id);
    if (!review) throw new Error('Review not found');
    return review as unknown as ReviewWithDetailsDTO;
  }

  async create(data: CreateReviewDTO): Promise<SimpleReviewDTO> {
    return this.repository.create(data);
  }

  async update(id: number, data: UpdateReviewDTO): Promise<SimpleReviewDTO> {
    await this.getById(id);
    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.getById(id);
    await this.repository.delete(id);
  }

  async getByVisitId(number: number)  : Promise<ReviewWithDetailsDTO[]> {
    return await this.repository.findByVisitId(number) as unknown as Promise<ReviewWithDetailsDTO[]>;
  }
}
