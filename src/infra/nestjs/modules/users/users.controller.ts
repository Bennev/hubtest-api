import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../../../../applications/services/users/create-user/create-user.dto';
import { CreateUserService } from '../../../../applications/services/users/create-user/create-user.service';
import { FindOneUserService } from '../../../../applications/services/users/find-one-user/find-one-user.service';
import { FindAllUsersService } from '../../../../applications/services/users/find-all-users/find-all-users.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserView } from './user.view';
import { JwtAuthGuard } from '../../strategies/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUser: CreateUserService,
    private readonly findOneUser: FindOneUserService,
    private readonly findAllUsers: FindAllUsersService,
  ) {}

  @ApiCreatedResponse({
    description: 'User created',
  })
  @ApiBadRequestResponse({
    description: 'Some field has incorrect or missing data',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.createUser.execute(createUserDto);
    const user = UserView.toView(newUser);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Users list',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid bearer token JWT',
  })
  @Get()
  async findAll() {
    const allUsers = await this.findAllUsers.execute();
    const users = allUsers.map((user) => UserView.toView(user));
    return users;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Specific user information',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid bearer token JWT',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const newUser = await this.findOneUser.execute(id);
    const user = UserView.toView(newUser);
    return user;
  }
}
