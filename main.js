"use strict";

const prompt = require("prompt-sync")({ sigint: true });

/**
 * @typedef TaxTier
 * @property {number} min Maximum income of this tier.
 * @property {number} max Minimum income of this tier.
 * @property {number} floor Equals to the max of the lower tier.
 * @property {number} base Accumulated tax from lower tiers.
 * @property {number} rate Tax rate of this tier.
 */
/**
 * @type {TaxTier[]}
 */
const TAX_TABLE = [
  {
    min: 0,
    max: 20000,
    floor: 0,
    base: 0,
    rate: 0,
  },
  {
    min: 20001,
    max: 40000,
    floor: 20000,
    base: 0,
    rate: 0.1,
  },
  {
    min: 40001,
    max: 80000,
    floor: 40000,
    base: 2000,
    rate: 0.2,
  },
  {
    min: 80001,
    max: 180000,
    floor: 80000,
    base: 10000,
    rate: 0.3,
  },
  {
    min: 180001,
    max: Number.POSITIVE_INFINITY,
    floor: 180000,
    base: 40000,
    rate: 0.4,
  },
];

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
