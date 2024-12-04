import { Injectable } from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rule } from './entities/rule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RulesService {

  constructor(@InjectRepository(Rule) private readonly Repository:Repository<Rule>){}


 async create(createRuleDto: CreateRuleDto,Req) {
   const rule = this.Repository.create(createRuleDto)

   return await this.Repository.save(rule)
  }

 async findAll() {
    return await this.Repository
    .createQueryBuilder("rules")
    .getMany()
  }

  async findOne(id: number) {
    return await this.Repository
    .createQueryBuilder("rules")
    .where("rules.id = :id",{id})
    .getOne()
  }

  async update(id: number, updateRuleDto: UpdateRuleDto) {
    return await this.Repository
    .createQueryBuilder("rules")
    .update()
    .set(updateRuleDto)
    .where("rules.id = :id",{id})
    .execute()
  }

  async remove(id: number) {
    return await this.Repository.softDelete(id)
  }
}
