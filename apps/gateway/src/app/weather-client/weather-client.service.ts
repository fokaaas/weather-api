import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CityExistsRequest,
  CityExistsResponse,
  GetRequest,
  GetResponse,
  GrpcToObservable,
  IWeatherService
} from '@weather-api/interfaces';
import type { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class WeatherClientService implements IWeatherService, OnModuleInit {
  private clientService: GrpcToObservable<IWeatherService>;

  constructor(@Inject('WEATHER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.clientService =
      this.client.getService<GrpcToObservable<IWeatherService>>('WeatherService');
  }

  async cityExists(request: CityExistsRequest): Promise<CityExistsResponse> {
    return this.clientService.cityExists(request).toPromise();
  }

  async get(request: GetRequest): Promise<GetResponse | null> {
    return this.clientService.get(request).toPromise();
  }
}
