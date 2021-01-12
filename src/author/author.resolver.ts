import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.dto';
import { PostService } from 'src/post/post.service';
import { AuthorService } from './author.service';
import { Author } from './dto/author.dto';

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
