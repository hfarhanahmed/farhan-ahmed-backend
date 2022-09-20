import { IsArray, IsNotEmpty, IsNumber, IsString, IsUUID, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderDto {
    @IsUUID()
    @IsNotEmpty()
    @IsOptional()
    public id?: string

    // Validates for a non-empty string
    @IsString()
    @IsNotEmpty()
    public restaurantId: string;

    @IsString()
    @IsNotEmpty()
    public restaurantName: string;

    @IsString()
    @IsNotEmpty()
    public userId: string;

    @IsString()
    @IsNotEmpty()
    public userName: string;

    // Validates for a non-empty integer array
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderDishesDto)
    public orderedDishes: OrderDishesDto[];
}

export class OrderDishesDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    dishName: string;

    @IsNumber()
    price: number;
}
