import React, { useState } from 'react';
import Layout from './components/Layout';
import Exchange from './pages/Exchange';
import History from './pages/History';

function App() {
  const [page, setPage] = useState('exchange');
  const handleChangeView = (aPage: string) => {
    setPage(aPage);
  };
  return (
    <Layout page={page} changeView={handleChangeView}>
      {page === 'exchange' && <Exchange />}
      {page === 'history' && <History />}
    </Layout>
  );
}

export default App;
