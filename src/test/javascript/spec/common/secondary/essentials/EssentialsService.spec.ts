import EssentialsService from '@/common/secondary/essentials/EssentialsService';
import { dataBackendResponse, stubAxiosHttp } from '../../../http/AxiosHttpStub';
import { describe, it, expect } from 'vitest';
import { Essential } from '@/common/domain/essential/Essential';

const axiosHttpStub = stubAxiosHttp();
axiosHttpStub.get.mockResolvedValue(
  dataBackendResponse([
    {
      code: 'conditioner',
      type: 'Conditioner',
    },
    {
      code: 'mouthwash',
      type: 'Mouthwash',
    },
  ]),
);

describe('EssentialsService', () => {
  it('should list essentials', async () => {
    const essentials = new EssentialsService(axiosHttpStub);
    const essentialsList = await essentials.list();

    const [uri] = axiosHttpStub.get.mock.calls[0];
    expect(uri).toBe('services/essentials');
    expect(essentialsList).toEqual<Essential[]>([
      {
        code: 'conditioner',
        type: 'Conditioner',
      },
      {
        code: 'mouthwash',
        type: 'Mouthwash',
      },
    ]);
  });

  it('should add an essential', async () => {
    const essentials = new EssentialsService(axiosHttpStub);
    await essentials.add({ code: 'hand-soap', type: 'Hand Soap' });

    const [uri, addEssential] = axiosHttpStub.post.mock.calls[0];
    expect(uri).toBe('services/essentials');
    expect(addEssential).toEqual<Essential>({ code: 'hand-soap', type: 'Hand Soap' });
  });
});
