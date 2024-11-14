import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { User } from './users/user.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
//import { appConfig } from './config/app.config';
import { PaginationModule } from './common/pagination/pagination.module';
import appConfig from './config/app.config'; //default로 export 하므로 {}없애도됨
import databaseConfig from './config/db.config';
import envValidation from './config/env.validation';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath:['.env.development']
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: envValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        //entities: [User],
        autoLoadEntities: configService.get('database.autoLoadEntities'), // 주의: 개발모드에서만 사용할것.
        synchronize: configService.get('database.synchronize'), // 주의: 개발모드에서만 사용할것. entity 생성 -> db 테이블 자동생성 *실서버사용절대금지
        port: +configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        host: configService.get('database.host'),
        database: configService.get('database.name'),
      }),
    }),
    TagsModule,
    MetaOptionsModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
