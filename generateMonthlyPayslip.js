"use strict";

const prompt = require('prompt-sync')({ sigint: true });

/**
 * Prints monthly payslip based on user input and tax table.
 * @param {TaxTier[]} taxTable
 */
exports.generateMonthlyPayslip = (taxTable) => {
  const { name, income } = getUserInput();
  const tier = findTaxTier(income, taxTable);
  const tax = calculateTax(income, tier);
  printResult(name, income, tax);
};

const getUserInput = () => ({
  name: prompt("Enter your name: "),
  income: prompt("Enter your annual salary: "),
});

/**
 * Finds out which tax tier the provided income falls into.
 * @param {number} income
 * @param {TaxTier[]} taxTable
 * @returns A tax tier.
 */
exports.findTaxTier = (income, taxTable) => {
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
exports.calculateTax = (income, { floor, base, rate }) => {
  const taxableInThisTier = income -floor;
  const taxInThisTier = taxableInThisTier * rate;
  return base + taxInThisTier;
}

/**
 * Prints monthly payslip.
 * @param {string} name 
 * @param {number} income 
 * @param {number} tax 
 */
const printResult = (name, income, tax) => {
  const monthlyIncome = calculateMonthlyValue(income);
  const monthlyTax = calculateMonthlyValue(tax);

  const result = `
    Monthly Payslip for: "${name}"
    Gross Monthly Income: $${monthlyIncome}
    Monthly Income Tax: $${monthlyTax}
    Net Monthly Income: $${monthlyIncome - monthlyTax}
  `;

  console.log(result);
};

/**
 * Calculates monthly value from an annual value.
 * @param {number} value Annual value, such as annual income.
 * @returns Monthly value, such as monthly income.
 */
exports.calculateMonthlyValue = (value) => {
  const MONTHS_A_YEAR = 12;
  return value / MONTHS_A_YEAR;
};
