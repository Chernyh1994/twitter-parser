import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TwitterModule } from './twitter/twitter.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/server', { useUnifiedTopology: true, useNewUrlParser: true}),
    AuthModule,
    UsersModule,
    TwitterModule,
  ],
  controllers: [AppController ],
  providers: [AppService ],
})
export class AppModule {}
