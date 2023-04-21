import React, { useState } from 'react';
import styled from 'styled-components';
import HistoryItem from '../features/HistoryItem';
import { resources } from '../constants/resources';

const HistoryWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  .title {
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

  .sorting-row {
    display: flex;
    justify-content: space-between;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .clickable {
      cursor: pointer;
    }
    .asc {
      transform: rotate(180deg);
    }
    .desc {
      transform: rotate(0deg);
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;
const histories = [
  {
    createdAt: Date.now(),
    from: { type: 'bnb', amount: '123.223' },
    to: { type: 'ethereum', amount: '50.223' },
  },
  {
    createdAt: Date.now() - 80000,
    from: { type: 'solana', amount: '123.223' },
    to: { type: 'ethereum', amount: '50.223' },
  },
];
const History = () => {
  const [isAsc, setIsAsc] = useState(true);
  const toggleSortCondition = () => setIsAsc((prev) => !prev);
  return (
    <HistoryWrapper>
      <h1 className={'title'}>환전 내역</h1>
      <div className={'sorting-row'}>
        <span onClick={toggleSortCondition} className={'clickable'}>
          환전시간
          <img
            src={resources.arrowDown}
            className={isAsc ? 'asc' : 'desc'}
            alt={`정렬-조건-아이콘-${isAsc ? 'asc' : 'desc'}`}
          />
        </span>

        <span>환전금액</span>
      </div>
      <ul>
        {histories
          .sort((a, b) => {
            return isAsc
              ? a.createdAt - b.createdAt
              : b.createdAt - a.createdAt;
          })
          .map((props) => (
            <HistoryItem {...props} key={props.createdAt} />
          ))}
      </ul>
    </HistoryWrapper>
  );
};

export default History;
