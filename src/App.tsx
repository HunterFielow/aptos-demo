import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Types, AptosClient } from 'aptos';

// Create an AptosClient to interact with devnet.
const client = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');

function App() {
  const [address, setAddress] = React.useState<string | null>(null);
  React.useEffect(() => {
    window.aptos.account().then((data : {address: string}) => setAddress(data.address));
  }, []);

  const [account, setAccount] = React.useState<Types.AccountData | null>(null);
  React.useEffect(() => {
    if (!address) return;
    client.getAccount(address).then(setAccount);
  }, [address]);

  return (
    <div className="App">
      <p><code>{ address }</code></p>
      <p><code>{ account?.sequence_number }</code></p>
    </div>
  );
}

export default App;
