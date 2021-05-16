'use strict';

/**
 * @typedef {import('../generateMonthlyPayslip').TaxTier} TaxTier
 */

/**
 * Calculates annual tax based on income and tax table.
 * @param {number} income 
 * @param {TaxTier} taxTable 
 * @returns {number} Annual tax.
 */
const calculateTax = (income, taxTable) => {
  const tier = findTaxTier(income, taxTable);
  return calculateTaxInTier(income, tier);
};

/**
 * Finds out which tax tier the provided income falls into.
 * @param {number} income
 * @param {TaxTier} taxTable
 * @returns {TaxTier} A tax tier.
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
 * @returns {number} Calculated tax.
 */
const calculateTaxInTier = (income, { floor, base, rate }) => {
  const taxableInThisTier = income -floor;
  const taxInThisTier = taxableInThisTier * rate;
  return base + taxInThisTier;
};

module.exports = { calculateTax };