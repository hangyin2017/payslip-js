"use strict";

/**
 * @typedef MonthlyPayslipData
 * @property {string} name
 * @property {number} monthlyIncome
 * @property {number} monthlyTax
 * @property {number} netMonthlyIncome Monthly income minus monthly tax.
 * 
 * @typedef ResultItem
 * @property {string} label
 * @property {string | number} value
 * @property {VALUE_TYPES} type
 */

/**
 * @readonly
 * @enum {string}
 */
const VALUE_TYPES = {
  name: 'name',
  money: 'money',
};

/**
 * Prints monthly payslip.
 * @param {MonthlyPayslipData} monthlyPayslipData 
 */
const printResult = ({ name, monthlyIncome, monthlyTax, netMonthlyIncome }) => {
  /**@type {ResultItem[]} */
  const resultItems = [
    {
      label: 'Monthly Payslip for',
      value: name,
      type: VALUE_TYPES.name,
    },
    {
      label: 'Gross Monthly Income',
      value: monthlyIncome,
      type: VALUE_TYPES.money,
    },
    {
      label: 'Monthly Income Tax',
      value: monthlyTax,
      type: VALUE_TYPES.money,
    },
    {
      label: 'Net Monthly Income',
      value: netMonthlyIncome,
      type: VALUE_TYPES.money,
    },
  ];

  const result = resultItems.map(toRowText).join('\n');
  console.log(result);
};

const toRowText = ({ label, value, type }) => {
  const formatter = FORMATTERS[type] || String;
  const valueText = formatter(value);
  return `${label}: ${valueText}`;
};

const nameFormatter = (name) => `"${name}"`;

const moneyFormatter = (value) => {
  const PRECISION = 2;
  const SYMBOL = '$';
  return  `${SYMBOL}${value.toFixed(PRECISION)}`;
};

const FORMATTERS = {
  [VALUE_TYPES.name]: nameFormatter,
  [VALUE_TYPES.money]: moneyFormatter,
};

module.exports = { printResult };