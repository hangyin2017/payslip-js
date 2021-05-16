const { calculateTax } = require('./calculateTax');

const TAX_TABLE = [
  {
    min: 0,
    max: 20000,
    floor: 0,
    base: 0,
    rate: 0,
  },
  {
    min: 20001,
    max: 40000,
    floor: 20000,
    base: 0,
    rate: 0.1,
  },
  {
    min: 40001,
    max: 80000,
    floor: 40000,
    base: 2000,
    rate: 0.2,
  },
];

it('should calculate tax given income and taxTable', () => {
  const income = 60000;

  const tax = calculateTax(income, TAX_TABLE);

  expect(tax).toBe(6000);
});