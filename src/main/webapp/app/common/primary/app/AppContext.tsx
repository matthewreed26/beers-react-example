import { createContext } from 'react';

import EssentialsServices from '@/common/secondary/essentials/EssentialsService';
import { AxiosHttp } from '@/http/AxiosHttp';
import axios from 'axios';

type Provided = () => unknown;
export type Provide = Record<string, Provided>;

const axiosHttp = new AxiosHttp(axios);

export const AppProvide = {
  essentials: () => new EssentialsServices(axiosHttp),
};

const AppContext = createContext<Provide>(AppProvide);

export default AppContext;
