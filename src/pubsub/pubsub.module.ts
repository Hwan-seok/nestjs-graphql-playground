import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from './pubsub.const';

const pubsub = { provide: PUB_SUB, useValue: new PubSub() };
@Module({
  providers: [pubsub],
  exports: [pubsub],
})
export class PubsubModule {}
