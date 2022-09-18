"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const environment_1 = require("./environments/environment");
const restaurant_entity_1 = require("./restaurant/restaurant.entity");
const menu_entity_1 = require("./restaurant/menu.entity");
const user_entity_1 = require("./user/user.entity");
const transaction_entity_1 = require("./user/transaction.entity");
const restaurant_module_1 = require("./restaurant/restaurant.module");
const user_module_1 = require("./user/user.module");
const order_module_1 = require("./order/order.module");
const order_entity_1 = require("./order/order.entity");
const ENTITIES = [restaurant_entity_1.Restaurant, menu_entity_1.Menu, user_entity_1.User, transaction_entity_1.Transaction, order_entity_1.Order];
const MODULES = [
    typeorm_1.TypeOrmModule.forRoot(Object.assign(Object.assign({}, environment_1.typeOrmConfiguration), { entities: (0, typeorm_2.getMetadataArgsStorage)().tables.map(({ target }) => target) })),
    restaurant_module_1.RestaurantModule,
    user_module_1.UserModule,
    order_module_1.OrderModule,
    typeorm_1.TypeOrmModule.forFeature(ENTITIES)
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: MODULES,
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map