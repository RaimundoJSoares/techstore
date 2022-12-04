import {
  Controller,
  Get,
  Render,
  Post,
  Body,
  Redirect,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from 'src/models/products.service';
import { Product } from 'src/models/product.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('admin/products')
export class AdminProductsController {
  constructor(private productsService: ProductService) {}

  @Get('/')
  @Render('admin/products/index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Admin Page - Admin - Online Store';
    viewData['products'] = await this.productsService.findAll();

    return {
      viewData: viewData,
    };
  }
  @Post('/store')
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads' }))
  @Redirect('/admin/products')
  async store(@Body() body, @UploadedFile() file: Express.Multer.File) {
    const newProduct = new Product();
    newProduct.setName(body.name);
    newProduct.setDescription(body.description);
    newProduct.setPrice(body.price);
    newProduct.setImage(file.filename);
    await this.productsService.createOrUpdate(newProduct);
  }
}
