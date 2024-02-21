import { describe, it, expect } from 'vitest';

import EssentialsView from '@/common/primary/essentials/index';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { mockEssentials } from '../../domain/essentials/EssentialsMock.fixture';

const mockedEssentials = mockEssentials();
mockedEssentials.list.mockResolvedValue([{ code: 'paper-towels', type: 'Paper Towels' }]);

//hoisted so cannot be abstracted
vi.mock('react', async () => ({
  ...((await vi.importActual('react')) as typeof import('react')),
  useContext: () => ({ essentials: () => mockedEssentials }),
}));

describe('EssentialsView', () => {
  it('should render', () => {
    render(<EssentialsView />);
  });

  it('should initially be loading', () => {
    const essentialsView = render(<EssentialsView />);
    const loading = essentialsView.getByTestId('loading');
    expect(loading.textContent).toBe('Loading...');
  });

  it('should load the essentials list', async () => {
    const essentialsView = render(<EssentialsView />);
    await waitFor(() => essentialsView.getByTestId('essentials-list'));
    const essentialPaperTowels = essentialsView.getByTestId('essential-paper-towels');
    expect(essentialPaperTowels.textContent).toBe('Paper Towels');
  });

  it('should not add an empty essential', async () => {
    const essentialsView = render(<EssentialsView />);
    await waitFor(() => essentialsView.getByTestId('essentials-list'));
    const addEssential = essentialsView.getByTestId('add-essential') as HTMLInputElement;
    const addEssentialButton = essentialsView.getByTestId('add-essential-button') as HTMLButtonElement;

    fireEvent.change(addEssential, { target: { value: '' } });

    await waitFor(() => addEssentialButton.click());
    expect(mockedEssentials.add).not.toHaveBeenCalled();
  });

  it('should not add an already existing essential', async () => {
    const essentialsView = render(<EssentialsView />);
    await waitFor(() => essentialsView.getByTestId('essentials-list'));
    const addEssential = essentialsView.getByTestId('add-essential') as HTMLInputElement;
    const addEssentialButton = essentialsView.getByTestId('add-essential-button') as HTMLButtonElement;

    fireEvent.change(addEssential, { target: { value: 'Paper Towels' } });

    await waitFor(() => addEssentialButton.click());
    expect(mockedEssentials.add).not.toHaveBeenCalled();
  });

  it('should add an essential', async () => {
    const essentialsView = render(<EssentialsView />);
    await waitFor(() => essentialsView.getByTestId('essentials-list'));
    const addEssential = essentialsView.getByTestId('add-essential') as HTMLInputElement;
    const addEssentialButton = essentialsView.getByTestId('add-essential-button') as HTMLButtonElement;

    fireEvent.change(addEssential, { target: { value: 'Hand Soap' } });
    expect(addEssential.value).toBe('Hand Soap');

    await waitFor(() => addEssentialButton.click());
    expect(mockedEssentials.add).toHaveBeenCalledWith({ code: 'hand-soap', type: 'Hand Soap' });
    const essentialHandSoap = essentialsView.getByTestId('essential-hand-soap');
    expect(essentialHandSoap.textContent).toBe('Hand Soap');
  });
});
