'use strict';

const { getUserInput } = require('./getUserInput/getUserInput');
const { calculateTax } = require('./calculateTax/calculateTax');
const { calculateMonthlyPayslipData } = require('./calculateMonthlyPayslipData/calculateMonthlyPayslipData');
const { printResult } = require('./printResult/printResult');

/**
* @typedef TaxTier
* @property {number} min Maximum income of this tier.
* @property {number} max Minimum income of this tier.
* @property {number} floor Equals to the max of the lower tier.
* @property {number} base Accumulated tax from lower tiers.
* @property {number} rate Tax rate of this tier.
*/

/**
 * Prints monthly payslip based on user input and tax table.
 * @param {TaxTier[]} taxTable
 */
const generateMonthlyPayslip = (taxTable) => {
  const { name, income } = getUserInput();
  const tax = calculateTax(income, taxTable);
  const monthlyPayslipData = calculateMonthlyPayslipData(name, income, tax);
  printResult(monthlyPayslipData);
};

module.exports = { generateMonthlyPayslip };