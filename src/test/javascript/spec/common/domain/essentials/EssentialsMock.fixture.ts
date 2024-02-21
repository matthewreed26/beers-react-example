import { Mock } from 'vitest';

import { Essentials } from '@/common/domain/essential/Essentials';

interface EssentialsMock extends Essentials {
  list: Mock;
  add: Mock;
}

export const mockEssentials = (): EssentialsMock => ({
  list: vi.fn(),
  add: vi.fn(),
});
