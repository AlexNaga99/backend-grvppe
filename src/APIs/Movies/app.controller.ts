import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { interfaceMovies, interfaceFavoriteMovies, interfaceDeleteMovie, interfaceInsertMovies } from './interface';

@Controller('movies')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':page')
  async getMoviesByPage(@Param('page') pageNumber: interfaceMovies) {
    return await this.appService.getMoviesByPage(pageNumber);
  }

  @Get('favorite/:id/:status')
  async getFavoriteMovies(@Param('id') userId: interfaceFavoriteMovies, @Param('status') status: number) {
    return await this.appService.getFavoriteMovies(userId, status);
  }

  @Post('favorite')
  async insertFavoriteMovie(@Body() body: interfaceInsertMovies) {
    return await this.appService.insertFavoriteMovie(body);
  }

  @Post()
  async insertMovie(@Body() body: interfaceInsertMovies) {
    return await this.appService.insertMovie(body);
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: interfaceDeleteMovie) {
    return await this.appService.deleteMovie(id);
  }
}
