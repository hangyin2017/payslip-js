const { toRowText, VALUE_TYPE } = require('./printResult');

it('should return name text given name item', () => {
  const rowText = toRowText({
    label: 'Monthly Payslip for',
    value: 'John',
    type: VALUE_TYPE.name,
  });

  expect(rowText).toBe('Monthly Payslip for: "John"');
});

it('should return money text given money item', () => {
  const rowText = toRowText({
    label: 'Gross Monthly Income',
    value: 5000,
    type: VALUE_TYPE.money,
  });

  expect(rowText).toBe('Gross Monthly Income: $5000.00');
});