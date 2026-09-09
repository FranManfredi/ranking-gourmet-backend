import { SimpleRestaurantDTO } from '../../common/dto/common.dto.js';
import { SimpleVisitDTO } from '../../common/dto/common.dto.js';

export { SimpleRestaurantDTO };

export interface RestaurantWithVisitsDTO extends SimpleRestaurantDTO {
  visits: SimpleVisitDTO[];
}

export interface CreateRestaurantDTO {
  name: string;
  address: string;
  city?: string;
  tags?: string[];
}

export interface UpdateRestaurantDTO {
  name?: string;
  address?: string;
  city?: string;
  tags?: string[];
}
