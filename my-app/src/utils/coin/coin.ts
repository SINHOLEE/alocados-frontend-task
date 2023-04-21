export type Coin = {
  amount: string;
  type: string;
};

// 서버로 부터 받아오는 정보를 가공한다고 가정한다.
// 만약 ethereum을 solana로 바꾸고 싶다면 const exchangeRate = EXCHANGE_RATE_TABLE['Ethereum']['Solana']
const EXCHANGE_RATE_TABLE = {
  Ethereum: { Solana: 100, BnB: 50 },
  Solana: { Ethereum: 0.01, BnB: 2 },
  BnB: { Ethereum: 0.02, Solana: 0.5 },
};

// 서버로부터 받아온다고 가정

// unitList도 서버에서 받아온다고 가정
const checkValidationCoinUnitFactory = (unitList: string[]) => {
  const unitSet = new Set();
  unitList.forEach((unit) => unitSet.add(unit));
  return (unit: string) => {
    return unitSet.has(unit);
  };
};
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
