import { Body, Controller, Post } from '@nestjs/common';
import { Errors } from '../utils/Errors';
import { APIErrorResponse } from '../interface/APIErrorResponse.interface';
import { SuccessResponse } from '../interface/SuccessResponse.interface';
import { UserService } from './user.service';
import { UserDto } from '../dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('/add')
    async addUsers(@Body() users: UserDto[]): Promise<SuccessResponse | APIErrorResponse> {
        try {
            return await this.userService.addUsers(users);
        } catch (error) {
            return { code: Errors.errorGetting.code, message: Errors.errorGetting.message }
        }
    }
}
