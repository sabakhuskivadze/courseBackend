import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class UsersRepository {
    constructor(@InjectRepository(User) private readonly Repository: Repository<User>, private jwtService: JwtService) { }

    async create(createUserDto: CreateUserDto) {
        const users = this.Repository.create(createUserDto)
        const saveUser = await  this.Repository.save(users)

        const payload = {username:users.username, id:users.id, email:users.email,role:users.role}

        return  {
            user:saveUser,
            access_token:this.jwtService.sign(payload,{secret:"secret"})
        }
    }

    async findAll() {
        return await this.Repository
        .createQueryBuilder("users")
        .leftJoinAndSelect("users.rules","user")
        .getMany()
    }

    async findOne(id: number) {
        return await this.Repository
        .createQueryBuilder("users")
        .where("users.id = :id",{id})
        .getOne()
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.Repository
        .createQueryBuilder("users")
        .update()
        .set(updateUserDto)
        .where("users.id = :id",{id})
        .execute()
    }

    async remove(id: number) {
        return await this.Repository.softDelete(id)
    }

    async findEmail(email:string) {
        return await this.Repository
        .createQueryBuilder("users")
        .where("users.email = :email",{email})
        .getOne()
    }
}