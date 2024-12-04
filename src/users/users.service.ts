import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly Repository:UsersRepository){}
 async create(createUserDto: CreateUserDto) {
    if (createUserDto.password != createUserDto.confirmPassword) {
      throw new UnauthorizedException()
    }
    return await this.Repository.create(createUserDto)
  }

  async findAll() {
    return await this.Repository.findAll()
  }

  async findOne(id: number) {
    return await this.Repository.findOne(id)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.Repository.update(id,updateUserDto)
  }

  async  remove(id: number) {
    return await this.Repository.remove(id)
  }
  
}
