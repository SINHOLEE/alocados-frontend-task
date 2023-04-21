import { calcAmount, Coin } from '../utils/coin/coin';

type Wallet = Coin[];
type ExchangeAction = {
  type: 'exchange';
  payload: {
    from: Coin;
    to: Coin;
  };
};

export type WalletProps = {
  wallet: Wallet;
};

const calcWallet = (wallet: Wallet, from: Coin, to: Coin) => {
  const copiedWallet = structuredClone(wallet) as Wallet;

  return copiedWallet.map((coin) => {
    if (coin.type === from.type) {
      return {
        type: coin.type,
        amount: calcAmount('-')(coin.amount, from.amount),
      };
    }
    if (coin.type === to.type) {
      return {
        type: coin.type,
        amount: calcAmount('+')(coin.amount, to.amount),
      };
    }
    return { ...coin };
  });
};
const walletReducer = (state: Wallet, action: ExchangeAction) => {
  switch (action.type) {
    case 'exchange':
      return calcWallet(state, action.payload.from, action.payload.to);
    default:
      return state;
  }
};

export default walletReducer;
export const exChangeAction = (from: Coin, to: Coin): ExchangeAction => {
  return { type: 'exchange', payload: { from, to } };
};
