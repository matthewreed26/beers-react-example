import { AxiosHttp, AxiosHttpResponse } from '@/http/AxiosHttp';
import { Mock } from 'vitest';

export interface AxiosHttpStub extends AxiosHttp {
  get: Mock;
  post: Mock;
  delete: Mock;
  put: Mock;
}

export const stubAxiosHttp = (): AxiosHttpStub =>
  ({
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
    put: vi.fn(),
  }) as AxiosHttpStub;

export const dataBackendResponse = <T>(data: T): AxiosHttpResponse<T> =>
  ({
    data,
  }) as AxiosHttpResponse<T>;
