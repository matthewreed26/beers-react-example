import { Essential } from '@/common/domain/essential/Essential';
import { Essentials } from '@/common/domain/essential/Essentials';
import { AxiosHttp } from '@/http/AxiosHttp';

export default class EssentialsServices implements Essentials {
  constructor(private readonly axiosHttp: AxiosHttp) {}

  list(): Promise<Essential[]> {
    return this.axiosHttp.get<Essential[]>('services/essentials').then(axiosResponse => axiosResponse.data);
  }
  async add(essential: Essential): Promise<void> {
    await this.axiosHttp.post<void, Essential>('services/essentials', essential);
  }
}
