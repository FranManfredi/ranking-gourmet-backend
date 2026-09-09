import { ReviewerRepository } from '../repositories/reviewer.repository.js';
import { CreateReviewerDTO, UpdateReviewerDTO, ReviewerWithReviewsDTO, SimpleReviewerDTO } from '../dto/reviewer.dto.js';

export class ReviewerService {
  private repository = new ReviewerRepository();

  async getAll(): Promise<ReviewerWithReviewsDTO[]> {
    return this.repository.findAll() as unknown as Promise<ReviewerWithReviewsDTO[]>;
  }

  async getById(id: number): Promise<ReviewerWithReviewsDTO> {
    const reviewer = await this.repository.findById(id);
    if (!reviewer) throw new Error('Reviewer not found');
    return reviewer as unknown as ReviewerWithReviewsDTO;
  }

  async create(data: CreateReviewerDTO): Promise<SimpleReviewerDTO> {
    return this.repository.create(data);
  }

  async update(id: number, data: UpdateReviewerDTO): Promise<SimpleReviewerDTO> {
    await this.getById(id);
    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.getById(id);
    await this.repository.delete(id);
  }
}
