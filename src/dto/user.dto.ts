import { IsArray, IsNotEmpty, IsNumber, IsString, IsUUID, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UserDto {
    @IsUUID()
    @IsOptional()
    @IsNotEmpty()
    id?: string;

    @IsNumber()
    cashBalance: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TransactionDTO)
    purchaseHistory: TransactionDTO[];
}

export class TransactionDTO {
    @IsUUID()
    @IsOptional()
    @IsNotEmpty()
    public id?: string;

    @IsString()
    @IsNotEmpty()
    public dishName: string;

    @IsString()
    @IsNotEmpty()
    public restaurantName: string;

    @IsNumber()
    public transactionAmount: number;

    @IsString()
    @IsNotEmpty()
    public transactionDate: string;

    @IsOptional()
    public user?: UserDto;
}