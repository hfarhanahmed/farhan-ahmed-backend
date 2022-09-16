import { Pagination } from "nestjs-typeorm-paginate";
import { Restaurant } from "src/restaurant/restaurant.entity";

export const paginatedResponse: Pagination<Restaurant> = {
    items: [],
    meta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 20,
        totalPages: 0,
        currentPage: 1
    }
}