import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  @Render('index')
  index() {
    // eslint-disable-next-line prefer-const
    let viewData = [];
    viewData['title'] = 'Home Page - Online Store';
    return {
      viewData: viewData,
    };
  }

  @Get('/about')
  @Render('about')
  about() {
    const viewData = [];
    viewData['title'] = 'About Us - Online Store';
    viewData['subtitle'] = 'About Us';
    viewData['description'] = 'This is the about page...';
    viewData['author'] = 'Developed by: Your name';

    return {
      viewData: viewData,
    };
  }
}
