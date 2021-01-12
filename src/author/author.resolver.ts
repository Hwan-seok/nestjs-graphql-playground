import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Post } from 'src/post/entities/post.dto';
import { PostService } from 'src/post/post.service';
import { POST_ADDED } from './author.const';
import { AuthorService } from './author.service';
import { Author } from './dto/author.dto';

// const pubSub = new PubSub();
@Resolver((of) => Author)
export class AuthorResolver {
  constructor(
    private readonly authorService: AuthorService,
    private readonly postsService: PostService,
  ) {}

  @Query((returns) => Author, { name: 'author' })
  async getAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorService.findOneById(id);
  }

  //   @Subscription((returns) => Post, { name: 'subAddPost' })
  //   subscribeAddPost() {
  //     return pubSub.asyncIterator(POST_ADDED);
  //   }

  @ResolveField('posts', (returns) => [Post])
  getPosts(
    @Parent() author: Author,
    @Args('descIncludes') descIncludes: string,
  ): Post[] {
    const { id } = author;
    return this.postsService.findAll({ authorId: id, descIncludes });
  }

  @Query((returns) => [Author], { name: 'authors' })
  getAuthors(): Omit<Author, 'posts'>[] {
    return this.authorService.findAll();
  }
}
