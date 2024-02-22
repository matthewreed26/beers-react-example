import { Chat } from '@/common/domain/chat/Chat';
import { Chats } from '@/common/domain/chat/Chats';
import { AxiosHttp } from '@/http/AxiosHttp';

export default class ChatService implements Chats {
  constructor(private readonly axiosHttp: AxiosHttp) {}

  list(): Promise<Chat[]> {
    return this.axiosHttp.post<Chat[]>('').then(axiosResponse => axiosResponse.data);
  }
}
