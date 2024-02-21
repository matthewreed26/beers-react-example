import { Essential } from '@/common/domain/essential/Essential';
import { Essentials } from '@/common/domain/essential/Essentials';

export default class EssentialsInMemory implements Essentials {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async add(essential: Essential): Promise<void> {
    await Promise.resolve();
  }
  async list(): Promise<Essential[]> {
    return [
      { code: 'conditioner', type: 'Conditioner' },
      { code: 'mouthwash', type: 'Mouthwash' },
    ];
  }
}
