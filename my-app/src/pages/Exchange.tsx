import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Hr, TextField } from '../components';
import { resources } from '../constants/resources';
import { Coin } from '../utils/coin/coin';
import Select from '../components/Select';

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
    font-family: 'Poppins';
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
      font-family: 'Poppins';
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
    font-family: 'Poppins';
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

type HistoryItemProps = {
  createdAt: string;
  from: Coin;
  to: Coin;
};

const HistoryItemWrapper = styled.li`
  width: 634px;
  height: 48px;

  background: #f4f5f8;
  border-radius: 12px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    span {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 178%;
      /* identical to box height, or 25px */

      font-feature-settings: 'pnum' on, 'lnum' on, 'cv03' on, 'cv04' on,
        'cv09' on;

      /* Light/Shade/900 */

      color: #2a3249;
    }
  }
  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 33px;
    .right-icon-wrapper {
      display: flex;
      justify-content: center;
    }
    .coin {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 2px;

      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 178%;
      /* identical to box height, or 32px */

      text-align: right;
      font-feature-settings: 'pnum' on, 'lnum' on, 'cv03' on, 'cv04' on,
        'cv09' on;

      /* Light/Shade/700 */

      color: #404e71;
    }
  }
`;

const typeToUnit = (type: string) => {
  const mapper: Record<string, string> = {
    solana: 'SOL',
    ethereum: 'ETH',
    bnb: 'BnB',
  };
  return mapper[type];
};
const unitToType = (type: string) => {
  const mapper: Record<string, string> = {
    SOL: 'solana',
    ETH: 'ethereum',
    BnB: 'bnb',
  };
  return mapper[type];
};
const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const amOrPm = date.getHours() >= 12 ? 'PM' : 'AM';

  return `${year}-${month}-${day}, ${amOrPm} ${hours}:${minutes}`;
};

const HistoryItem = (props: HistoryItemProps) => {
  return (
    <HistoryItemWrapper>
      <div className={'left'}>
        <span>{props.createdAt}</span>
      </div>
      <div className={'right'}>
        <div className={'coin'}>
          <img
            src={resources[unitToType(props.from.unit)]}
            alt={props.from.unit}
          />
          <span>{props.from.amount}</span>
          <span>{props.from.unit}</span>
        </div>
        <div className={'right-icon-wrapper'}>
          <img src={resources.right} alt={'오른쪽-화살표-아이콘'} />
        </div>
        <div className={'coin'}>
          <img src={resources[unitToType(props.to.unit)]} alt={props.to.unit} />
          <span>{props.to.amount}</span>
          <span>{props.to.unit}</span>
        </div>
      </div>
    </HistoryItemWrapper>
  );
};
const ExchangeForm = () => {
  const [from, setFrom] = useState('');

  const isDisable = (option: string) => option === 'solana';
  const [fromUnit, setFromUnit] = useState(
    OPTIONS.filter((option) => !isDisable(option))[0],
  );
  const [toUnit, setToUnit] = useState(
    OPTIONS.filter((option) => !isDisable(option))[1],
  );
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
                console.log(e.target.value);
                setFrom(e.target.value);
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
          createdAt={formatDate(Date.now())}
          from={{ unit: typeToUnit('bnb'), amount: '123.223' }}
          to={{ unit: typeToUnit('ethereum'), amount: '50.223' }}
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