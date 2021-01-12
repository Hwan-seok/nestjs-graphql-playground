import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../../post/entities/post.dto';

@ObjectType()
export class Author {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field((type) => [Post])
  posts: Post[];
}
