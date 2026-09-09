import prisma from '../../../lib/prisma.js';
import { CreateReviewDTO, UpdateReviewDTO } from '../dto/review.dto.js';

export class ReviewRepository {
  async findAll() {
    return prisma.review.findMany({
      include: {
        reviewer: true,
        visit: true
      }
    });
  }

  async findById(id: number) {
    return prisma.review.findUnique({
      where: { id },
      include: {
        reviewer: true,
        visit: true
      }
    });
  }

  async create(data: CreateReviewDTO) {
    return prisma.review.create({
      data: {
        reviewerId: data.reviewerId,
        visitId: data.visitId,
        foodRating: data.foodRating,
        beverageRating: data.beverageRating,
        serviceRating: data.serviceRating,
        valueRating: data.valueRating,
        ambianceRating: data.ambianceRating
      }
    });
  }

  async update(id: number, data: UpdateReviewDTO) {
    return prisma.review.update({
      where: { id },
      data
    });
  }

  async delete(id: number) {
    return prisma.review.delete({
      where: { id }
    });
  }

  async findByVisitId(number: number) {
    return prisma.review.findMany({
      where: { visitId: number },
      include: {
        reviewer: true,
        visit: true
      }
    });
  }
}
