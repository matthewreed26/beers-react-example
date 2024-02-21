import { Beer } from './Beer';

export interface Beers {
  list(): Promise<Beer[]>;
  add(beer: Beer): Promise<void>;
}
