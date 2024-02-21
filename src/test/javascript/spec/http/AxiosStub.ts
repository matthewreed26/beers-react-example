import { AxiosInstance, AxiosResponse } from 'axios';
import { Mock } from 'vitest';

export interface AxiosStubInstance extends AxiosInstance {
  get: Mock;
  put: Mock;
  post: Mock;
  delete: Mock;
}

export const stubAxiosInstance = (): AxiosStubInstance =>
  ({
    get: vi.fn(),
    put: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  }) as AxiosStubInstance;

export const dataAxiosResponse = <T>(data: T): AxiosResponse<T> =>
  ({
    data,
  }) as AxiosResponse<T>;
