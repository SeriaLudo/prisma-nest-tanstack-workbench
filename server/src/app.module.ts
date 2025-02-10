import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserService } from './modules/user/user.service';
import { PostService } from './post.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule], // No additional modules needed for now
  controllers: [AppController], // Ensure AppController is here
  providers: [UserService, PostService, PrismaService], // Register necessary services
  exports: [UserService, PostService], // Export if used in other modules
})
export class AppModule {}
