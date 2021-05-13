// const getTax = require("./Payslip");
const { calculateMonthlyValue } = require('./generateMonthlyPayslip');

it("should calculate tax based on salary", () => {
  const income = 12000;

  const tax = calculateMonthlyValue(income);

  expect(tax).toBe(1000);
});