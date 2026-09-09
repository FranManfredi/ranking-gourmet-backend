import prisma from '../../../lib/prisma.js';
import { CreateReviewerDTO, UpdateReviewerDTO } from '../dto/reviewer.dto.js';

export class ReviewerRepository {
  async findAll() {
    return prisma.reviewer.findMany({
      include: {
        reviews: true
      }
    });
  }

  async findById(id: number) {
    return prisma.reviewer.findUnique({
      where: { id },
      include: {
        reviews: true
      }
    });
  }

  async create(data: CreateReviewerDTO) {
    return prisma.reviewer.create({
      data
    });
  }

  async update(id: number, data: UpdateReviewerDTO) {
    return prisma.reviewer.update({
      where: { id },
      data
    });
  }

  async delete(id: number) {
    return prisma.reviewer.delete({
      where: { id }
    });
  }
}
