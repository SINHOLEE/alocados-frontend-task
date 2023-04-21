import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Hr, TextField } from '../components';
import { resources } from '../constants/resources';
import Select from '../components/Select';
import HistoryItem, { HistoryItemProps } from '../features/HistoryItem';
import {
  adjustValidAmount,
  calcAmount,
  calcToAmount,
  Coin,
  formatAmount,
  isValidAmount,
  typeToUnit,
} from '../utils/coin/coin';
import { WalletProps } from '../features/walletReducer';

type OnExchangeProps = {
  onExchange: (from: Coin, to: Coin) => void;
};
type SummaryItemProps = {
  coin: {
    type: string;
    amount: string;
    unit: string;
  };
};
type LastHistory = {
  lastHistory?: HistoryItemProps;
};
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
      <span>{formatAmount(coin.amount)}</span>
      <span>{coin.unit}</span>
    </div>
  </SummaryItemWrapper>
);
const Summary = ({ wallet }: WalletProps) => {
  return (
    <Aside>
      <div>
        <span className={'title'}>요약</span>
      </div>
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <Hr />
      <div className={'summary-list-wrapper'}>
        {wallet
          .map((coin) => ({ ...coin, unit: typeToUnit(coin.type) }))
          .map((coin) => (
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

const canExchange = (wallet: Coin[], from: Coin) => {
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
  return res[0] !== '-';
};
const createToUnitOptions = (aFromUnit: string) =>
  OPTIONS.filter((option) => option !== aFromUnit);

const ExchangeForm = ({
  wallet,
  onExchange,
  lastHistory,
}: WalletProps & OnExchangeProps & LastHistory) => {
  const [from, setFrom] = useState('');

  const [fromUnit, setFromUnit] = useState(OPTIONS[0]);
  const [toUnit, setToUnit] = useState(createToUnitOptions(fromUnit)[0]);

  useEffect(() => {
    setToUnit(createToUnitOptions(fromUnit)[0]);
  }, [fromUnit]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onExchange(
          { type: fromUnit, amount: from },
          {
            type: toUnit,
            amount: calcToAmount(
              { type: fromUnit, amount: from },
              { type: toUnit },
            ),
          },
        );
        setFrom('');
      }}
    >
      <ExchangeFormWrapper>
        <div>
          <div className={'input-wrapper'}>
            <TextField
              value={from}
              isError={!canExchange(wallet, { type: fromUnit, amount: from })}
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
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={resources.swap} alt={'스왑아이콘'} />
          </div>
          <div className={'input-wrapper'}>
            <TextField
              label={'전환 수량(to)'}
              value={calcToAmount(
                { type: fromUnit, amount: from },
                { type: toUnit },
              )}
              key={`${from}-${fromUnit}-${toUnit}`}
              disabled
              isForView
            />
            <Select
              value={toUnit}
              style={{ minWidth: 150 }}
              onChange={(e) => setToUnit(e.target.value)}
              options={createToUnitOptions(fromUnit)}
            />
          </div>
        </div>
        <Button
          text={'환전'}
          style={{ height: 56 }}
          disabled={!canExchange(wallet, { type: fromUnit, amount: from })}
        />
        {lastHistory && <HistoryItem {...lastHistory} />}
      </ExchangeFormWrapper>
    </form>
  );
};

const Exchange = ({
  wallet,
  onExchange,
  lastHistory,
}: WalletProps & OnExchangeProps & LastHistory) => {
  return (
    <ExchangeSectionWrapper>
      <h1>환전하기</h1>
      <br />
      <div>
        <Summary wallet={wallet} />
        <ExchangeForm
          wallet={wallet}
          onExchange={onExchange}
          lastHistory={lastHistory}
        />
      </div>
    </ExchangeSectionWrapper>
  );
};

export default Exchange;
