"use strict";

import promptSync from 'prompt-sync';
import { TAX_TABLE } from './constants.js';

const prompt = promptSync({ sigint: true });

/**
 * @description
 * Prints monthly payslip based on user input and tax table.
 * @param {TaxTier[]} taxTable
 */
const generateMonthlyPayslip = (taxTable) => {
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
 * @description
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
 * @description
 * Calculates tax based on income and tax tier.
 * @param {number} income
 * @param {TaxTier} taxTier The proper tax tier used to calculate tax.
 * @returns Calculated tax.
 */
const calculateTax = (income, { floor, base, rate }) => {
  const taxableInThisTier = income -floor;
  const taxInThisTier = taxableInThisTier * rate;
  return base + taxInThisTier;
}

/**
 * @description
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
 * @description
 * Calculates monthly value from an annual value.
 * @param {number} value Annual value, such as annual income.
 * @returns Monthly value, such as monthly income.
 */
const calculateMonthlyValue = (value) => {
  const MONTHS_A_YEAR = 12;
  return value / MONTHS_A_YEAR;
}

generateMonthlyPayslip(TAX_TABLE);
