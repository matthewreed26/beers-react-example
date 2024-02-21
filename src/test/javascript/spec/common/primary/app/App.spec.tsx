import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import App from '@/common/primary/app/App';
import { AppProvide } from '@/common/primary/app/AppContext';
import Router from '@/router';

vi.mock('AppProvide');

describe('App tests', () => {
  it('renders without crashing', () => {
    render(<App appProvide={AppProvide} router={Router} />);
  });
});
