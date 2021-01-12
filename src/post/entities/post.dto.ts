import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field((type) => Int)
  id: number;

  @Field((type) => Int)
  authorId: number;

  @Field()
  description: string;

  @Field((type) => Int, { nullable: true })
  votes?: number;
}
