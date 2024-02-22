import { Chat } from './Chat';

export interface Chats {
  list(chat: Chat): Promise<Chat[]>;
}
