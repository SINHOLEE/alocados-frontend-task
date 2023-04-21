import { Coin, formatAmount, typeToUnit } from '../utils/coin/coin';
import styled from 'styled-components';
import { resources } from '../constants/resources';
import React from 'react';
import { formatDate } from './HistoryItem.utils';

export type HistoryItemProps = {
  createdAt: number;
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
  > .left {
    display: flex;
    align-items: center;
    span {
      font-family: Poppins;
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
      &.left {
        justify-content: start;
      }
      &.right {
        justify-content: end;
      }
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 2px;
      font-family: Poppins;
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

const HistoryItem = (props: HistoryItemProps) => {
  return (
    <HistoryItemWrapper>
      <div className={'left'}>
        <span>{formatDate(props.createdAt)}</span>
      </div>
      <div className={'right'}>
        <div className={'coin left'}>
          <img
            src={resources[props.from.type]}
            alt={typeToUnit(props.from.type)}
          />
          <span>{formatAmount(props.from.amount)}</span>
          <span>{typeToUnit(props.from.type)}</span>
        </div>
        <div className={'right-icon-wrapper'}>
          <img src={resources.right} alt={'오른쪽-화살표-아이콘'} />
        </div>
        <div className={'coin right'}>
          <img src={resources[props.to.type]} alt={typeToUnit(props.to.type)} />
          <span>{formatAmount(props.to.amount)}</span>
          <span>{typeToUnit(props.to.type)}</span>
        </div>
      </div>
    </HistoryItemWrapper>
  );
};

export default React.memo(HistoryItem);
