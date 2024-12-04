import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { RulesModule } from './rules/rules.module';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'courseData',
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.register({
      secret:"secret",
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    RulesModule,
  ]
})
export class AppModule {}
