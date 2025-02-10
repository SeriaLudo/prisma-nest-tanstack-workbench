import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<User> {
    return this.userService.createUser(userData);
  }

  // get user by id

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    console.log('id', id);
    return this.userService.deleteUser(id);
  }
}
