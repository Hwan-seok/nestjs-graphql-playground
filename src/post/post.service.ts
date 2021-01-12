import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { POST_ADDED } from 'src/author/author.const';
import { CreatePostInput } from './dto/create-post.input';
import { FindPostArgs } from './dto/find-post.args';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.dto';

@Injectable()
export class PostService {
  posts: Post[];
  constructor() {
    console.log('START');
    this.posts = [
      { id: 1, authorId: 1, description: '111111' },
      { id: 2, authorId: 1, description: '122222' },
      { id: 3, authorId: 1, description: '133333' },
      { id: 4, authorId: 1, description: '14444444' },
      { id: 5, authorId: 1, description: '15555' },
      { id: 6, authorId: 2, description: '222222' },
      { id: 7, authorId: 3, description: '333333' },
      { id: 8, authorId: 4, description: '444444' },
      { id: 9, authorId: 5, description: '555555' },
    ];
  }

  create(createPostInput: CreatePostInput) {
    const newPost: Post = { id: this.posts.length + 1, ...createPostInput };
    this.posts.push(newPost);
    return newPost;
  }

  findAll(findPostArgs: FindPostArgs) {
    return this.posts.filter(
      (post) =>
        post.authorId === findPostArgs.authorId &&
        post.description.includes(findPostArgs?.descIncludes ?? ''),
    );
  }

  findOne(id: number) {
    return this.posts.find((post) => post.id === id);
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
