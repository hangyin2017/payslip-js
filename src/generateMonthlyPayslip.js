"use strict";

const { getUserInput } = require('./getUserInput');
const { printResult } = require('./printResult');

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

/**
 * Calculates annual tax based on income and tax table.
 * @param {number} income 
 * @param {TaxTier[]} taxTable 
 * @returns Annual tax.
 */
const calculateTax = (income, taxTable) => {
  const tier = findTaxTier(income, taxTable);
  return calculateTaxInTier(income, tier);
};

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

/**
 * Finds out which tax tier the provided income falls into.
 * @param {number} income
 * @param {TaxTier[]} taxTable
 * @returns A tax tier.
 */
const findTaxTier = (income, taxTable) => {
  return taxTable.find(tier => {
    const { min, max } = tier;
    return income > min && income <= max;
  });
};

/**
 * Calculates tax based on income and tax tier.
 * @param {number} income
 * @param {TaxTier} taxTier The proper tax tier used to calculate tax.
 * @returns Calculated tax.
 */
const calculateTaxInTier = (income, { floor, base, rate }) => {
  const taxableInThisTier = income -floor;
  const taxInThisTier = taxableInThisTier * rate;
  return base + taxInThisTier;
};

module.exports = { generateMonthlyPayslip, calculateTax, calculateMonthlyPayslipData };