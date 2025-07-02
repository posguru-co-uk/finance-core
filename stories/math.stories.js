import { calculateTwoNumbers } from '../src/math.js';

export default {
  title: 'Math/Calculate Two Numbers',
};

export const AddTwoNumbers = () => {
  const a = 5;
  const b = 7;
  const result = calculateTwoNumbers(a, b);
  return `<div>${a} + ${b} = <strong>${result}</strong></div>`;
}; 