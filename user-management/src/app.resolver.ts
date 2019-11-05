import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ParseIntPipe } from '@nestjs/common';

@Resolver('Cat')
export class AppResolver {
  cats = [
    {
      id: 1,
      name: 'Mjau',
      age: 17,
    },
  ];

  @Mutation()
  createCat(
    @Args('cat')
    cat: any,
  ): Promise<string> {
    this.cats = [...this.cats, { ...cat, id: this.cats.length + 1 }];
    return Promise.resolve('cat created');
  }

  @Query()
  getCats() {
    console.error('getCats');
    return this.cats;
  }

  @Query('oneCat')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<any> {
    console.log('hey');
    return {
      id: 1,
      name: 'Mjau',
      age: 17,
    };
  }
}
