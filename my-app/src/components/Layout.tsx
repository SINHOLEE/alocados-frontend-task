import React from 'react';
import styled from 'styled-components';
import { resources } from '../constants/resources';

const MainWrapper = styled.main`
  nav {
    padding: 0 20px;
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .button-wrapper {
      display: flex;
      button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        width: 90px;
        height: 56px;
        border-radius: 12px;
        span {
          font-family: 'Pretendard';
          font-size: 15px;
          line-height: 36px;
          letter-spacing: 0.05em;
        }
        &.selected {
          color: #5d28f2;
          background: rgba(93, 40, 242, 0.12);
        }
      }
    }
  }
  .children-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 140px;
  }
`;
type LayoutProps = {
  page: string;
  changeView: (page: string) => void;
};
const isSelected = (target: string, current: string) => target === current;

const Layout = ({
  children,
  page,
  changeView,
}: { children: React.ReactNode } & LayoutProps) => {
  return (
    <MainWrapper>
      <nav>
        <img src={resources.logo} alt={'로고'} />
        <div className={'button-wrapper'}>
          <button
            className={isSelected('exchange', page) ? 'selected' : ''}
            onClick={() => changeView('exchange')}
          >
            환전하기
          </button>
          <button
            className={isSelected('history', page) ? 'selected' : ''}
            onClick={() => changeView('history')}
          >
            거래내역
          </button>
        </div>
      </nav>
      <div className={'children-wrapper'}>{children}</div>
    </MainWrapper>
  );
};

export default Layout;
