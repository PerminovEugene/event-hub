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
    console.log('getCats');
    return this.cats;
  }

  @Query('cat')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<any> {
    return this.cats.find(c => c.id === id);
  }
}
