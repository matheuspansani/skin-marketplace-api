import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getSkinMarketPlace(): string {
    return 'Skin MarketPlace';
  }
}