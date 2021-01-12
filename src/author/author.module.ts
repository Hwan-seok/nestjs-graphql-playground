import { Module } from '@nestjs/common';
import { PostModule } from 'src/post/post.module';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';

@Module({
  imports: [PostModule],
  providers: [AuthorService, AuthorResolver],
})
export class AuthorModule {}
