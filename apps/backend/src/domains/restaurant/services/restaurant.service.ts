import { RestaurantRepository } from '../repositories/restaurant.repository.js';
import { CreateRestaurantDTO, UpdateRestaurantDTO, RestaurantWithVisitsDTO, SimpleRestaurantDTO } from '../dto/restaurant.dto.js';

export class RestaurantService {
  private repository = new RestaurantRepository();

  async getAll(): Promise<RestaurantWithVisitsDTO[]> {
    return await this.repository.findAll() as unknown as Promise<RestaurantWithVisitsDTO[]>;
  }

  async getById(id: number): Promise<RestaurantWithVisitsDTO> {
    const restaurant = await this.repository.findById(id);
    if (!restaurant) throw new Error('Restaurant not found');
    return restaurant as unknown as RestaurantWithVisitsDTO;
  }

  async create(data: CreateRestaurantDTO): Promise<SimpleRestaurantDTO> {
    return this.repository.create(data);
  }

  async update(id: number, data: UpdateRestaurantDTO): Promise<SimpleRestaurantDTO> {
    await this.getById(id); // Verificar existencia
    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.getById(id); // Verificar existencia
    await this.repository.delete(id);
  }
}
