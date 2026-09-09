import { SimpleReviewerDTO, SimpleReviewDTO, SimpleVisitDTO } from '../../common/dto/common.dto.js';

export { SimpleReviewDTO };

export interface ReviewWithDetailsDTO extends SimpleReviewDTO {
  reviewer: SimpleReviewerDTO;
  visit: SimpleVisitDTO;
}

export interface CreateReviewDTO {
  reviewerId: number;
  visitId: number; // Changed from restaurantId
  foodRating?: number;
  beverageRating?: number;
  serviceRating?: number;
  valueRating?: number;
  ambianceRating?: number;
}

export interface UpdateReviewDTO {
  foodRating?: number;
  beverageRating?: number;
  serviceRating?: number;
  valueRating?: number;
  ambianceRating?: number;
}
