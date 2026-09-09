import prisma from '../../../lib/prisma.js';
import { CreateRestaurantDTO, UpdateRestaurantDTO } from '../dto/restaurant.dto.js';

export class RestaurantRepository {
  async findAll() {
    return prisma.restaurant.findMany({
      include: {
        visits: true
      }
    });
  }

  async findById(id: number) {
    return prisma.restaurant.findUnique({
      where: { id },
      include: {
        visits: true
      }
    });
  }

  async create(data: CreateRestaurantDTO) {
    return prisma.restaurant.create({
      data: {
        name: data.name.toUpperCase(),
        address: data.address.toUpperCase(),
        city: data.city?.toUpperCase(),
        tags: data.tags
      }
    });
  }

  async update(id: number, data: UpdateRestaurantDTO) {
    return prisma.restaurant.update({
      where: { id },
      data: {
        name: data.name?.toUpperCase(),
        address: data.address?.toUpperCase(),
        city: data.city?.toUpperCase(),
        tags: data.tags
      }
    });
  }

  async delete(id: number) {
    return prisma.restaurant.delete({
      where: { id }
    });
  }
}
