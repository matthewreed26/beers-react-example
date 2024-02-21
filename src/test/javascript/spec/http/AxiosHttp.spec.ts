import { describe, it, expect } from 'vitest';
import { AxiosResponse } from 'axios';
import { AxiosHttp } from '@/http/AxiosHttp';
import { dataAxiosResponse, stubAxiosInstance } from './AxiosStub';

interface Payload {
  payload: string;
}

const fakePayload = (): Payload => ({
  payload: 'content',
});

interface Result {
  result: string;
}

const fakeResult = (): Result => ({
  result: 'content',
});

const responseResult = (): AxiosResponse => dataAxiosResponse(fakeResult());

const expectForQuerying = (uri: string, result: AxiosResponse<Result>) => {
  expect(result.data).toEqual(fakeResult());
  expect(uri).toBe('/uri');
};

const expectForSendingAndQuerying = (uri: string, payload: Payload, result: AxiosResponse<Result>) => {
  expect(payload).toEqual<Payload>(fakePayload());
  expectForQuerying(uri, result);
};

describe('axiosHttp', () => {
  describe('GET', () => {
    it('should get content', async () => {
      const axiosInstance = stubAxiosInstance();
      axiosInstance.get.mockResolvedValue(responseResult());
      const axiosHttp = new AxiosHttp(axiosInstance);

      const result = await axiosHttp.get<Result>('/uri');

      const [uri] = axiosInstance.get.mock.calls[0];
      expectForQuerying(uri, result);
    });

    it('should get content with params', async () => {
      const axiosInstance = stubAxiosInstance();
      axiosInstance.get.mockResolvedValue(responseResult());
      const axiosHttp = new AxiosHttp(axiosInstance);

      await axiosHttp.get<Result>('/uri', { params: { beer: 'chips' } });

      const [, config] = axiosInstance.get.mock.calls[0];
      expect(config.params.beer).toBe('chips');
    });
  });

  describe('PUT', () => {
    it('should only get content', async () => {
      const axiosInstance = stubAxiosInstance();
      axiosInstance.put.mockResolvedValue(responseResult());
      const axiosHttp = new AxiosHttp(axiosInstance);

      const result = await axiosHttp.put<Result>('/uri');

      const [uri] = axiosInstance.put.mock.calls[0];
      expectForQuerying(uri, result);
    });

    it('should send and get content', async () => {
      const axiosInstance = stubAxiosInstance();
      axiosInstance.put.mockResolvedValue(responseResult());
      const axiosHttp = new AxiosHttp(axiosInstance);

      const result = await axiosHttp.put<Result, Payload>('/uri', fakePayload());

      const [uri, payload] = axiosInstance.put.mock.calls[0];
      expectForSendingAndQuerying(uri, payload, result);
    });
  });

  describe('POST', () => {
    it('should only get content', async () => {
      const axiosInstance = stubAxiosInstance();
      axiosInstance.post.mockResolvedValue(responseResult());
      const axiosHttp = new AxiosHttp(axiosInstance);

      const result = await axiosHttp.post<Result>('/uri');

      const [uri] = axiosInstance.post.mock.calls[0];
      expectForQuerying(uri, result);
    });

    it('should send and get content', async () => {
      const axiosInstance = stubAxiosInstance();
      axiosInstance.post.mockResolvedValue(responseResult());
      const axiosHttp = new AxiosHttp(axiosInstance);

      const result = await axiosHttp.post<Result, Payload>('/uri', fakePayload());

      const [uri, payload] = axiosInstance.post.mock.calls[0];
      expectForSendingAndQuerying(uri, payload, result);
    });
  });

  describe('DELETE', () => {
    it('should get content', async () => {
      const axiosInstance = stubAxiosInstance();
      axiosInstance.delete.mockResolvedValue(responseResult());
      const axiosHttp = new AxiosHttp(axiosInstance);

      const result = await axiosHttp.delete<Result>('/uri');

      const [uri] = axiosInstance.delete.mock.calls[0];
      expectForQuerying(uri, result);
    });
  });
});
