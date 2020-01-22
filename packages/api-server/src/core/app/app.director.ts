import { AppBuilder } from './app.builder';

export enum AppType {
  simple = 'simple',
  testE2e = 'testE2e',
}

export class Director {
  private builder: AppBuilder;

  constructor(builder: AppBuilder) {
    this.builder = builder;
  }

  public make = async (appType: AppType) => {
    await this.builder.reset();
    if (appType === AppType.simple) {
      this.builder.buildCors();
    }
    this.builder.buildCookie();
    this.builder.buildSession();
    this.builder.buildPassport();
    if (appType === AppType.simple) {
      this.builder.buildGlobalFilters();
    }
  };
}
