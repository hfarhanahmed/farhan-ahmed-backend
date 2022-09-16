import { IsArray, IsNotEmpty, IsNumber, IsString, IsUUID, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class RestaurantDto {
    @IsUUID()
    @IsNotEmpty()
    @IsOptional()
    public id?: string

    // Validates for a non-empty string
    @IsString()
    @IsNotEmpty()
    public restaurantName: string;

    @IsString()
    @IsNotEmpty()
    public openingHours: string;

    // Validates for an number
    @IsNumber()
    public cashBalance: number;

    // Validates for a non-empty integer array
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MenuDto)
    public menu: MenuDto[];
}

export class MenuDto {
    @IsString()
    @IsNotEmpty()
    dishName: string;

    @IsNumber()
    price: number;
}
