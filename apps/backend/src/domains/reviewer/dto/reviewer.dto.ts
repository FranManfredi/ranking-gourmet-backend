import { SimpleReviewerDTO, SimpleReviewDTO } from '../../common/dto/common.dto.js';

export { SimpleReviewerDTO };

export interface ReviewerWithReviewsDTO extends SimpleReviewerDTO {
  reviews: SimpleReviewDTO[];
}

export interface CreateReviewerDTO {
  name: string;
  surname: string;
  userId: string;
}

export interface UpdateReviewerDTO {
  name?: string;
  surname?: string;
}
