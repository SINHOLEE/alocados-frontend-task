import React, { useReducer, useState } from 'react';
import Layout from './components/Layout';
import Exchange from './pages/Exchange';
import History from './pages/History';
import walletReducer, { exChangeAction } from './features/walletReducer';
import { Coin } from './utils/coin/coin';
import { HistoryItemProps } from './features/HistoryItem';

function App() {
  const [wallet, dispatch] = useReducer(walletReducer, [
    { type: 'ethereum', amount: '200000000' },
    { type: 'bnb', amount: '0' },
    { type: 'solana', amount: '0' },
  ]);
  const [history, setHistory] = useState<HistoryItemProps[]>([]);

  const handleExchange = (from: Coin, to: Coin) => {
    dispatch(exChangeAction(from, to));
    setHistory((prev) => {
      return [...prev, { createdAt: Date.now(), from, to }];
    });
  };
  const [page, setPage] = useState('exchange');
  const handleChangeView = (aPage: string) => {
    setPage(aPage);
  };
  return (
    <Layout page={page} changeView={handleChangeView}>
      {page === 'exchange' && (
        <Exchange
          wallet={wallet}
          onExchange={handleExchange}
          lastHistory={history[history.length - 1]}
        />
      )}
      {page === 'history' && <History historyList={history} />}
    </Layout>
  );
}

export default App;
