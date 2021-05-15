"use strict";

/**
 * @typedef MonthlyPayslipData
 * @property {string} name
 * @property {number} monthlyIncome
 * @property {number} monthlyTax
 * @property {number} netMonthlyIncome Monthly income minus monthly tax.
 */
/**
 * Prints monthly payslip.
 * @param {MonthlyPayslipData} monthlyPayslipData 
 */
const printResult = ({ name, monthlyIncome, monthlyTax, netMonthlyIncome }) => {
  const PRECISION = 2;
  const result = `
    Monthly Payslip for: "${name}"
    Gross Monthly Income: $${monthlyIncome.toFixed(PRECISION)}
    Monthly Income Tax: $${monthlyTax.toFixed(PRECISION)}
    Net Monthly Income: $${netMonthlyIncome.toFixed(PRECISION)}
  `;

  console.log(result);
};

module.exports = { printResult };