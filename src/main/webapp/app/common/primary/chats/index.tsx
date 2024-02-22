'use client';
import { Chat } from '@/common/domain/chat/Chat';
import ChatService from '@/common/secondary/chat/ChatsService';
import { AxiosHttp } from '@/http/AxiosHttp';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ChatsView() {
  const axiosHttp = new AxiosHttp(
    axios.create({
      baseURL: 'https://api.openai.com/v1/chat/completions',
    }),
  );
  const beersService = new ChatService(axiosHttp);

  const [beersList, setBeersList] = useState<Chat[]>([]);

  useEffect(() => {
    (async () => {
      setBeersList(await beersService.list());
    })();
  }, []);

  return (
    <main>
      <>
        <b>{beersList.reduce(chat => chat.messages)}</b>
      </>
    </main>
  );
}
