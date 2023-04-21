import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
import { Button, Hr, TextField } from '../components';
import { resources } from '../constants/resources';
import Select from '../components/Select';
import HistoryItem from '../features/HistoryItem';
import {
  adjustValidAmount,
  calcAmount,
  Coin,
  isValidAmount,
} from '../utils/coin/coin';

const ExchangeSectionWrapper = styled.section`
  h1 {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 32px;
    /* identical to box height, or 145% */

    font-feature-settings: 'pnum' on, 'lnum' on;

    /* Light/Shade/900 */
    color: #2a3249;
  }

  > div {
    display: flex;
    gap: 17px;
  }
`;

const Aside = styled.aside`
  width: 308px;
  height: 386px;
  display: flex;
  padding: 24px;

  background: #fafbfc;
  border-radius: 12px;

  .title {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 135%;
    /* identical to box height, or 27px */

    letter-spacing: 0.025em;
    text-transform: uppercase;

    /* Light/Shade/700 */

    color: #4c5b7a;
  }

  flex-direction: column;

  .summary-list-wrapper {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
`;
type SummaryItemProps = {
  coin: {
    type: string;
    amount: string;
    unit: string;
  };
};

const SummaryItemWrapper = styled.li`
  display: flex;
  flex-direction: column;
  gap: 3px;

  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;

    .circle {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      width: 30px;
      height: 30px;

      background: rgba(42, 50, 73, 0.05);
      border-radius: 50%;
    }

    .coin-type {
      font-family: Poppins;
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 178%;
      /* identical to box height, or 32px */

      font-feature-settings: 'pnum' on, 'lnum' on, 'cv03' on, 'cv04' on,
        'cv09' on;

      /* Light/Shade/700 */

      color: #4c5b7a;
    }
  }

  .body {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 178%;
    /* or 32px */

    display: flex;
    align-items: center;
    font-feature-settings: 'pnum' on, 'lnum' on, 'cv03' on, 'cv04' on, 'cv09' on;

    /* Light/Shade/900 */

    color: #2a3249;
  }
`;

const SummaryItem = ({ coin }: SummaryItemProps) => (
  <SummaryItemWrapper>
    <div className={'header'}>
      <span className={'circle'}>
        <img src={resources[coin.type.toLowerCase()]} alt={coin.type} />
      </span>

      <span className={'coin-type'}>{coin.unit}</span>
    </div>
    <div className={'body'}>
      <span>{coin.amount}</span>
      <span>{coin.unit}</span>
    </div>
  </SummaryItemWrapper>
);
const Summary = () => {
  return (
    <Aside>
      <div>
        <span className={'title'}>요약</span>
      </div>
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <Hr />
      <div className={'summary-list-wrapper'}>
        {[
          { unit: 'SOL', type: 'solana', amount: '123123.2123' },
          { unit: 'ETH', type: 'ethereum', amount: '33' },
          { unit: 'BNB', type: 'bnb', amount: '0.23' },
        ].map((coin) => (
          <SummaryItem coin={coin} key={coin.unit} />
        ))}
      </div>
    </Aside>
  );
};

const ExchangeFormWrapper = styled.article`
  display: flex;
  flex-direction: column;

  width: 635px;
  height: 386px;

  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .input-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    gap: 16px;
  }
`;

const OPTIONS = ['solana', 'ethereum', 'bnb'];

type Wallet = Coin[];
type exchangeAction = {
  type: 'exchange';
  payload: {
    form: Coin;
    to: Coin;
  };
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
const walletReducer = (state: Wallet, action: exchangeAction) => {
  switch (action.type) {
    case 'exchange':
      return calcWallet(state, action.payload.form, action.payload.to);
    default:
      return state;
  }
};

const canExchange = (wallet: Wallet, from: Coin) => {
  const target = wallet.find((coin) => from.type === coin.type);
  if (!target) return false;
  if (
    from.amount
      .split('')
      .filter((char) => char !== '.')
      .every((char) => char === '0')
  )
    return false;
  const res = calcAmount('-')(target.amount, from.amount);
  console.log({ res });
  return res[0] !== '-';
};
const ExchangeForm = () => {
  const [wallet, dispatch] = useReducer(walletReducer, [
    { type: 'ethereum', amount: '100' },
    { type: 'bnb', amount: '0' },
    { type: 'solana', amount: '0' },
  ]);

  const [from, setFrom] = useState('');

  const isDisable = (option: string) => option === 'solana';
  const [fromUnit, setFromUnit] = useState(
    OPTIONS.filter((option) => !isDisable(option))[0],
  );
  const [toUnit, setToUnit] = useState(
    OPTIONS.filter((option) => !isDisable(option))[1],
  );
  console.log(canExchange(wallet, { type: fromUnit, amount: from }));
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(toUnit, fromUnit, from);
      }}
    >
      <ExchangeFormWrapper>
        <div>
          <div className={'input-wrapper'}>
            <TextField
              value={from}
              onChange={(e) => {
                const value = e.target.value;
                if (!isValidAmount(value)) return;
                setFrom(adjustValidAmount(value));
              }}
              label={'전환 수량(from)'}
              autoFocus
            />
            <Select
              value={fromUnit}
              style={{ minWidth: 150 }}
              onChange={(e) => setFromUnit(e.target.value)}
              options={OPTIONS}
              isDisabled={(option) => isDisable(option)}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={resources.swap} alt={'스왑아이콘'} />
          </div>
          <div className={'input-wrapper'}>
            <TextField
              label={'전환 수량(to)'}
              value={from + '23'}
              key={from}
              disabled
              isError
              isForView
            />
            <Select
              value={toUnit}
              style={{ minWidth: 150 }}
              onChange={(e) => setToUnit(e.target.value)}
              options={OPTIONS}
              isDisabled={(option) => isDisable(option)}
            />
          </div>
        </div>
        <Button text={'환전'} style={{ height: 56 }} />
        <HistoryItem
          createdAt={Date.now()}
          from={{ type: 'bnb', amount: '123.223' }}
          to={{ type: 'ethereum', amount: '50.223' }}
        />
      </ExchangeFormWrapper>
    </form>
  );
};

const Exchange = () => {
  return (
    <ExchangeSectionWrapper>
      <h1>환전하기</h1>
      <br />
      <div>
        <Summary />
        <ExchangeForm />
      </div>
    </ExchangeSectionWrapper>
  );
};

export default Exchange;
