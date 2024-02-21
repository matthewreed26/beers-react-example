import { describe, it, expect } from 'vitest';

import Homepage from '@/common/primary/homepage/index';
import { render } from '@testing-library/react';

describe('Homepage', () => {
  it('should render', () => {
    const { getByTestId } = render(<Homepage />);
    const appTitle = getByTestId('app-title');
    expect(appTitle.textContent).toBe('React + TypeScript + Vite');
  });
});
