const { calculateMonthlyPayslipData } = require('./calculateMonthlyPayslipData');

it('should calculate monthly tax data given annual tax and name', () => {
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