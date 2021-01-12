import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class FindPostArgs {
  @Field((type) => Int)
  authorId: number;

  @Field({ nullable: true })
  descIncludes?: string;
}
