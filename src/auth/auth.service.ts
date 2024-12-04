import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor( private readonly UserRepository:UsersRepository, private jwtService: JwtService) { }

  async login(loginUser: CreateAuthDto) {
     const email = await this.UserRepository.findEmail(loginUser.email)
   
     
     if (email.email == loginUser.email && loginUser.password == email.password) {
      const payload = {id:email.id, username:email.username, email:email.email,role:email.role}
       return {
        status:200,
        access_token:this.jwtService.sign(payload,{secret:"secret"})
       }
     }
     throw new UnauthorizedException()
  }
}
