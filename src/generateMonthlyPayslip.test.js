const { calculateTax, calculateMonthlyPayslipData } = require('./generateMonthlyPayslip');

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

it("should calculate tax given income and taxTable", () => {

  const income = 60000;

  const tax = calculateTax(income, TAX_TABLE);

  expect(tax).toBe(6000);
});

it("should calculate monthly tax data given annual tax and name", () => {
  const name = 'John';
  const income = 60000;
  const annualTax = 12000;

  const monthlyPayslipData = calculateMonthlyPayslipData(name, income, annualTax);

  expect(monthlyPayslipData).toStrictEqual({
    name: 'John',
    monthlyIncome: 5000,
    monthlyTax: 1000,
    netMonthlyIncome: 4000,
  });
});