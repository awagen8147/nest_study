import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, ValidationPipe, Request } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get(':username')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('username') username: string, @Request() req: any) {
    return req.user;
    // return this.usersService.findOne(username);
  }
  @Delete(':username')
  deleteOne(@Param('username') username: string) {
    return this.usersService.deleteOne(username);
  }
  @Put(':username')
  updateOne(@Param('username') username: string, @Body() createUser: CreateUserDto) {
    return this.usersService.updateOne(username, createUser);
  }
  @Post()
  create(@Body(ValidationPipe) createUser: CreateUserDto) {
    return this.usersService.create(createUser);
  }
}
