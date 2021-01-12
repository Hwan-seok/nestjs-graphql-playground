import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PubsubModule } from 'src/pubsub/pubsub.module';

@Module({
  imports: [PubsubModule],
  providers: [PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}
