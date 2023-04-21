import Decimal from 'decimal.js';

export type Coin = {
  amount: string;
  type: string;
};

// 서버로 부터 받아오는 정보를 가공한다고 가정한다.
// 만약 ethereum을 solana로 바꾸고 싶다면 const exchangeRate = EXCHANGE_RATE_TABLE['Ethereum']['Solana']
const EXCHANGE_RATE_TABLE: Record<string, Record<string, string>> = {
  ethereum: { solana: '100', bnb: '50' },
  solana: { ethereum: '0.01', bnb: '2' },
  bnb: { ethereum: '0.02', solana: '0.5' },
};

export const calcToAmount = (from: Coin, to: Pick<Coin, 'type'>) => {
  const b = EXCHANGE_RATE_TABLE?.[from.type]?.[to.type] ?? '1';
  return calcAmount('*')(from.amount, b);
};
// 서버로부터 받아온다고 가정

const isAllDigitOrComma = (input: string) => {
  const inputArr = input.split('');
  const possibleChar = '1234567890.';
  return inputArr.every((char) => possibleChar.includes(char));
};
const countComma = (input: string) =>
  input.split('').reduce((acc, char) => (char === '.' ? acc + 1 : acc), 0);

export const isValidAmount = (input: string) => {
  if (!isAllDigitOrComma(input)) return false;
  if (countComma(input) > 1) return false;

  if (countComma(input) === 0) return true;

  const [, fractionalPart] = input.split('.');
  return fractionalPart.length <= 10;
};

export const formatAmount = (amount: string) => {
  const [integer, fractionalPart] = amount.split('.');
  const newFractionalPart = (fractionalPart ?? '').slice(0, 2).split('');
  while (
    newFractionalPart.length &&
    newFractionalPart[newFractionalPart.length - 1] === '0'
  ) {
    newFractionalPart.pop();
  }

  let newInteger = '';
  let cnt = 0;
  for (let i = integer.length - 1; i >= 0; i--) {
    if (cnt === 3) {
      cnt = 0;
      newInteger = ',' + newInteger;
    }
    newInteger = integer[i] + newInteger;
    cnt++;
  }

  if (newFractionalPart.length) {
    return newInteger + '.' + newFractionalPart.join('');
  }
  return newInteger;
};
export const calcAmount =
  (operator: '-' | '+' | '*') => (amount1: string, amount2: string) => {
    const num1 = new Decimal(amount1 || '0');
    const num2 = new Decimal(amount2 || '0');
    let res;

    if (operator === '+') {
      res = num1.plus(num2);
    } else if (operator === '-') {
      res = num1.minus(num2);
    } else {
      res = num1.mul(num2);
    }

    return res.toFixed(10);
  };
export const calcAmount2 =
  (operator: '-' | '+') => (amount1: string, amount2: string) => {
    // 1과 2의 소숫점을 찾는다.
    const [integer1, fractionalPart1] = amount1.split('.');
    const [integer2, fractionalPart2] = amount2.split('.');
    const commaPosition = Math.max(
      fractionalPart1?.length ?? 0,
      fractionalPart2?.length ?? 0,
    );
    const multiple = Math.pow(10, commaPosition);
    const a =
      BigInt(multiple) * BigInt(integer1) + BigInt(fractionalPart1 ?? '0');
    const b =
      BigInt(multiple) * BigInt(integer2) + BigInt(fractionalPart2 ?? '0');

    const res = operator === '+' ? (a + b).toString() : (a - b).toString();

    if (commaPosition) {
      const resCommaPosition = res.length - commaPosition;
      return res.slice(0, resCommaPosition) + '.' + res.slice(resCommaPosition);
    }
    return res;

    // 소숫점중 큰 자리수를 곱한다.
  };
export const adjustValidAmount = (amount: string) => {
  if (amount === '') return amount;
  if (countComma(amount) === 0) {
    return Number(amount).toString();
  }
  return amount;
};
export const typeToUnit = (type: string) => {
  const mapper: Record<string, string> = {
    solana: 'SOL',
    ethereum: 'ETH',
    bnb: 'BnB',
  };
  return mapper[type];
};
export const unitToType = (type: string) => {
  const mapper: Record<string, string> = {
    SOL: 'solana',
    ETH: 'ethereum',
    BnB: 'bnb',
  };
  return mapper[type];
};
