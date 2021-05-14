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

module.exports = { TAX_TABLE };
