'use strict';

/**
 * Calculates monthly payslip data.
 * @param {string} name
 * @param {number} income Annually income.
 * @param {number} tax Annually tax.
 * @returns {import('./printResult').MonthlyPayslipData} Monthly payslip data.
 */
const calculateMonthlyPayslipData = (name, income, tax) => {
  const MONTHS_A_YEAR = 12;
  const monthlyIncome = income / MONTHS_A_YEAR;
  const monthlyTax = tax / MONTHS_A_YEAR;

  return {
    name,
    monthlyIncome,
    monthlyTax,
    netMonthlyIncome: monthlyIncome - monthlyTax,
  }
};

module.exports = { calculateMonthlyPayslipData };