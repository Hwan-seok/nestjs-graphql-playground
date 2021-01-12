import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.dto';
import { PubSub } from 'graphql-subscriptions';
import { POST_ADDED } from 'src/author/author.const';
const pubSub = new PubSub();

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  createPost(
    @Args('createPostInput')
    createPostInput: CreatePostInput,
  ) {
    const newPost = this.postService.create(createPostInput);
    pubSub.publish(POST_ADDED, { subPost: newPost });
    console.log(newPost);
    return newPost;
  }

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postService.findAll({ authorId: 1 });
  }

  @Subscription((returns) => Post)
  subPost() {
    return pubSub.asyncIterator(POST_ADDED);
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postService.remove(id);
  }
}
