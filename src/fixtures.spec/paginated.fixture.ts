import { Pagination } from "nestjs-typeorm-paginate";
import { Order } from "../order/order.entity";
import { Restaurant } from "../restaurant/restaurant.entity";

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

export const paginatedOrders: Pagination<Order> = {
    items: [],
    meta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 20,
        totalPages: 0,
        currentPage: 1
    }
}