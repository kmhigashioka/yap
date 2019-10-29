import React from 'react';
import { render, fireEvent, waitForDomChange } from '@testing-library/react';
import AppBar from './AppBar';
import { Account } from './types';

describe('<AppBar />', () => {
  it('should select an account', () => {
    const accounts: Account[] = [
      { id: 5001, name: 'Acc #1', abbreviation: 'A', balance: 0 },
    ];
    const { getByText } = render(<Component accounts={accounts} />);

    const accountSelection = getByText('ALL');
    fireEvent.click(accountSelection);

    const account1 = getByText('Acc #1');
    fireEvent.click(account1);

    expect(accountSelection.textContent).toEqual('Acc #1');
  });

  it('should able to select All', () => {
    const accounts: Account[] = [
      { id: 5001, name: 'Acc #1', abbreviation: 'A', balance: 0 },
    ];
    const { getByText } = render(
      <Component accounts={accounts} defaultActiveAccount={accounts[0]} />,
    );

    const accountSelection = getByText('Acc #1');
    fireEvent.click(accountSelection);

    const all = getByText('ALL');
    fireEvent.click(all);

    expect(accountSelection.textContent).toEqual('ALL');
  });

  it('should close popover when CREATE NEW ACCOUNT is clicked', async () => {
    const { getByText } = render(<Component />);

    const accountSelection = getByText('ALL');
    fireEvent.click(accountSelection);

    const createNewAccountButton = getByText('CREATE NEW ACCOUNT');
    fireEvent.click(createNewAccountButton);
    await waitForDomChange();

    expect(createNewAccountButton).not.toBeInTheDocument();
  });
});

function Component({
  accounts = [],
  defaultActiveAccount = null,
}: {
  accounts?: Account[];
  defaultActiveAccount?: Account | null;
}): React.ReactElement {
  const [activeAccount, setActiveAccount] = React.useState<Account | null>(
    defaultActiveAccount,
  );
  return (
    <AppBar
      accounts={accounts}
      activeAccount={activeAccount}
      setActiveAccount={setActiveAccount}
      addAccount={(): void => {}}
    />
  );
}
