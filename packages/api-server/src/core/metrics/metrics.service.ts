import { Injectable } from '@nestjs/common';
import { collectDefaultMetrics } from 'prom-client';

collectDefaultMetrics({
	gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5], // These are the default buckets.
});

@Injectable()
export class MetricsService {
  private readonly metrics: any[] = [];

  create(cat: any) {
    // this.cats.push(cat);
  }
}