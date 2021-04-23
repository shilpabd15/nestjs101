import { MiddlewareConsumer, Module, NestMiddleware, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from 'src/config/config.service';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { CatsController } from './cats.controller';
import { CatsServices } from './cats.service';
import { catsSchema } from './schema/cats.schema';

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017/CatDataBase"),
  MongooseModule.forFeature([{
    name:'Cats',
    schema:catsSchema,
    collection:'Cats'
  }])
],
  controllers: [CatsController],
  providers: [CatsServices, ConfigService],
})

export class CatsModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes({path:"cats/*", method: RequestMethod.DELETE})
  }
}