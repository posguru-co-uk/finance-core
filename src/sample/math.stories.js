import React from 'react';
import { calculateTwoNumbers } from './math';

export default {
  title: 'Sample/Math/CalculateTwoNumbers',
  argTypes: {
    a: { control: 'number' },
    b: { control: 'number' },
    operation: {
      control: { type: 'select' },
      options: ['add', 'subtract', 'multiply', 'divide'],
    },
  },
};

const Template = (args) => (
  <div>
    Result: {calculateTwoNumbers(args.a, args.b, args.operation)}
  </div>
);

export const Default = Template.bind({});
Default.args = {
  a: 1,
  b: 2,
  operation: 'add',
};
