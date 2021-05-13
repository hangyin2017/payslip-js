"use strict";

const { TAX_TABLE } = require('./taxTable2021');
const { generateMonthlyPayslip } = require('./generateMonthlyPayslip');

generateMonthlyPayslip(TAX_TABLE);
