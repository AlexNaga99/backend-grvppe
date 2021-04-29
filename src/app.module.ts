import { Module } from '@nestjs/common';
import { CustomerModule } from './APIs/Customers/app.module';
import { MoviesModule } from './APIs/Movies/app.module';
import { UserModule } from './APIs/Users/app.module';

@Module({
  imports: [CustomerModule, MoviesModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
