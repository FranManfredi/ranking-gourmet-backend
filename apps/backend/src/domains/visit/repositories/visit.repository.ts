import prisma from '../../../lib/prisma.js';
import { CreateVisitDTO, UpdateVisitDTO } from '../dto/visit.dto.js';

export class VisitRepository {
  async findAll() {
    return prisma.visit.findMany({
      include: {
        restaurant: true,
        reviews: true
      }
    });
  }

  async findById(id: number) {
    return prisma.visit.findUnique({
      where: { id },
      include: {
        restaurant: true,
        reviews: true
      }
    });
  }

  async create(data: CreateVisitDTO) {
    return prisma.visit.create({
      data: {
        restaurantId: data.restaurantId,
        visitedAt: data.visitedAt
      }
    });
  }

  async update(id: number, data: UpdateVisitDTO) {
    return prisma.visit.update({
      where: { id },
      data: {
        visitedAt: data.visitedAt
      }
    });
  }

  async delete(id: number) {
    return prisma.visit.delete({
      where: { id }
    });
  }

  async findAllByRestaurantId(number: number) {
    return prisma.visit.findMany({
      where: { restaurantId: number },
      include: {
        restaurant: true,
        reviews: true
      }
    });
  }
}
