const { findTaxTier, calculateTax } = require('./generateMonthlyPayslip');

it("should calculate tax based on income and taxTable", () => {
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
  const income = 60000;
  const tier = findTaxTier(income, TAX_TABLE);
  const tax = calculateTax(income, tier);
  expect(tax).toBe(6000);
});