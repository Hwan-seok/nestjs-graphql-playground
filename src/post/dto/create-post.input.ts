import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => Int, { description: 'Example ' })
  authorId: number;

  @Field()
  description: string;
}
