import { Module } from '@nestjs/common';
import { RulesService } from './rules.service';
import { RulesController } from './rules.controller';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rule } from './entities/rule.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Rule])],
  controllers: [RulesController],
  providers: [RulesService,JwtService],
})
export class RulesModule {}
