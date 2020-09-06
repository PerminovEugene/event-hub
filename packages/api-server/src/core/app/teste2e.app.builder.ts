import { Test } from '@nestjs/testing';
import { AppBuilder } from './app.builder';

export class TestE2eAppBuilder extends AppBuilder {
  public reset = async () => {
    const moduleFixture = await Test.createTestingModule(
      this.moduleOptions,
    ).compile();
    this.app = moduleFixture.createNestApplication();
  };
}
