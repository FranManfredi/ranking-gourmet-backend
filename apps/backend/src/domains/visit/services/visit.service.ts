import { VisitRepository } from '../repositories/visit.repository.js';
import { CreateVisitDTO, UpdateVisitDTO, VisitWithDetailsDTO, SimpleVisitDTO } from '../dto/visit.dto.js';

export class VisitService {
  private repository = new VisitRepository();

  async getAll(): Promise<VisitWithDetailsDTO[]> {
    return this.repository.findAll() as unknown as Promise<VisitWithDetailsDTO[]>;
  }

  async getById(id: number): Promise<VisitWithDetailsDTO> {
    const visit = await this.repository.findById(id);
    if (!visit) throw new Error('Visit not found');
    return visit as unknown as VisitWithDetailsDTO;
  }

  async create(data: CreateVisitDTO): Promise<SimpleVisitDTO> {
    return this.repository.create(data);
  }

  async update(id: number, data: UpdateVisitDTO): Promise<SimpleVisitDTO> {
    await this.getById(id);
    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.getById(id);
    await this.repository.delete(id);
  }

  async getAllByRestaurantId(number: number) {
    return this.repository.findAllByRestaurantId(number) as unknown as Promise<VisitWithDetailsDTO[]>;
  }
}
