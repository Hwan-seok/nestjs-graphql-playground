import { Injectable } from '@nestjs/common';
import { Author } from './dto/author.dto';

@Injectable()
export class AuthorService {
  a: Omit<Author, 'posts'>[];
  constructor() {
    this.a = [
      {
        id: 1,
        firstName: 'first',
        lastName: 'last',
      },
      {
        id: 2,
        firstName: 'first2',
        lastName: 'last2',
      },
      {
        id: 3,
        firstName: 'first3',
        lastName: 'last3',
      },
      {
        id: 4,
        firstName: 'first4',
        lastName: 'last4',
      },
      {
        id: 5,
        firstName: 'first5',
        lastName: 'last5',
      },
      {
        id: 6,
        firstName: 'first6',
        lastName: 'last6',
      },
    ];
  }

  findOneById(id: number): Omit<Author, 'posts'> {
    return this.a.find((author) => author.id === id);
  }

  findAll(): Omit<Author, 'posts'>[] {
    return this.a;
  }
}
