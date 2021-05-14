"use strict";

const prompt = require('prompt-sync')({ sigint: true });

const getUserInput = () => ({
  name: prompt("Enter your name: "),
  income: prompt("Enter your annual salary: "),
});

module.exports = { getUserInput };