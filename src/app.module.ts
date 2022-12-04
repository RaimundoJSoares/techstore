import { Product } from './models/product.entity';
import { ProductsController } from './products.controller';
import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './models/products.service';
import { AdminModule } from './admin/admin.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'techstore',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product]),
    AdminModule,
  ],
  controllers: [AppController, ProductsController],
  providers: [ProductService],
  exports: [ProductService],
})
export class AppModule {}
