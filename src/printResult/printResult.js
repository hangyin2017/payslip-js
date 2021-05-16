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
 * @property {VALUE_TYPE} type
 */

/**
 * Enum for value types in monthly payslip data.
 * @readonly
 * @enum {string}
 */
const VALUE_TYPE = {
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
      type: VALUE_TYPE.name,
    },
    {
      label: 'Gross Monthly Income',
      value: monthlyIncome,
      type: VALUE_TYPE.money,
    },
    {
      label: 'Monthly Income Tax',
      value: monthlyTax,
      type: VALUE_TYPE.money,
    },
    {
      label: 'Net Monthly Income',
      value: netMonthlyIncome,
      type: VALUE_TYPE.money,
    },
  ];

  const result = resultItems.map(toRowText).join('\n');
  console.log(result);
};

/**
 * Converts a result item to text.
 * @param {ResultItem} resultItem
 * @returns {string}
 */
const toRowText = ({ label, value, type }) => {
  const formatter = FORMATTERS[type] || String;
  const valueText = formatter(value);
  return `${label}: ${valueText}`;
};

/**
 * @typedef {(value: string | number) => string} Formatter
 */
/**
 * Name formatter.
 * @type {Formatter}
 */
const nameFormatter = (name) => `"${name}"`;

/**
 * Money formatter.
 * @type {Formatter}
 */
const moneyFormatter = (value) => {
  const PRECISION = 2;
  const SYMBOL = '$';
  return  `${SYMBOL}${value.toFixed(PRECISION)}`;
};

/**
 * A map from value types to formatters.
 * @const
 * @type {Object<string, Formatter>}
 * */
const FORMATTERS = {
  [VALUE_TYPE.name]: nameFormatter,
  [VALUE_TYPE.money]: moneyFormatter,
};

module.exports = { printResult };