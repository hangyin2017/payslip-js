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
  const result = `
    Monthly Payslip for: "${name}"
    Gross Monthly Income: $${monthlyIncome}
    Monthly Income Tax: $${monthlyTax}
    Net Monthly Income: $${netMonthlyIncome}
  `;

  console.log(result);
};

module.exports = { printResult };