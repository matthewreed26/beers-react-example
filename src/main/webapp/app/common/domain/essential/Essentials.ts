import { Essential } from './Essential';

export interface Essentials {
  list(): Promise<Essential[]>;
  add(essential: Essential): Promise<void>;
}
