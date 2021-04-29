import { Module } from '@nestjs/common';
import { CustomerModule } from './APIs/Customers/app.module';
import { MoviesModule } from './APIs/Movies/app.module';

@Module({
  imports: [CustomerModule, MoviesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
