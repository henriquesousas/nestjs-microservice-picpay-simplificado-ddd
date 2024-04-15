/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosPaymentGateway } from '../../../../libs/core/src/common/payment/axios-payment-gateway';
import { PaymentGateway } from '../../../../libs/core/src/common/payment/interfaces/payment-gateway';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { of } from 'rxjs';

type SutTypes = {
  sut: PaymentGateway;
  configService: ConfigService;
  httpService: HttpService;
};

const makeHttpResponse = (
  status = 200,
  message = 'Autorizado',
): AxiosResponse<unknown, any> => {
  const httpConfig: InternalAxiosRequestConfig<any> =
    {} as InternalAxiosRequestConfig;

  const response: AxiosResponse<unknown, any> = {
    data: { message },
    headers: {},
    config: httpConfig,
    status,
    statusText: 'OK',
  };
  return response;
};

const createModule = async (): Promise<SutTypes> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      AxiosPaymentGateway,
      {
        provide: ConfigService,
        useValue: {
          get: jest.fn(),
        },
      },
      {
        provide: HttpService,
        useValue: {
          get: jest.fn(),
        },
      },
    ],
  }).compile();

  const sut = module.get<PaymentGateway>(AxiosPaymentGateway);
  const configService = module.get<ConfigService>(ConfigService);
  const httpService = module.get<HttpService>(HttpService);

  return {
    sut,
    configService,
    httpService,
  };
};

describe('AxiosTransactionPaymentGateway', () => {
  let sutTypes: SutTypes;

  beforeEach(async () => {
    sutTypes = await createModule();
  });

  it('should return true if payment transaction is authorize', async () => {
    const { sut, httpService } = sutTypes;
    jest.spyOn(httpService, 'get').mockReturnValue(of(makeHttpResponse()));
    const data = await sut.isAuthorize();
    expect(data).toBe(true);
  });

  it('should return false if payment transaction is not authorize', async () => {
    const { sut, httpService } = sutTypes;
    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(of(makeHttpResponse(400, 'any')));
    const data = await sut.isAuthorize();
    expect(data).toBe(false);
  });
});
