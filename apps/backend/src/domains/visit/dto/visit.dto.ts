import { SimpleVisitDTO, SimpleRestaurantDTO, SimpleReviewDTO } from '../../common/dto/common.dto.js';

export { SimpleVisitDTO };

export interface VisitWithDetailsDTO extends SimpleVisitDTO {
  restaurant: SimpleRestaurantDTO;
  reviews: SimpleReviewDTO[];
}

export interface CreateVisitDTO {
  restaurantId: number;
  visitedAt?: Date;
}

export interface UpdateVisitDTO {
  visitedAt?: Date;
}
