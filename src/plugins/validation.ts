import { App } from '@vue/runtime-core';

import { defineRule, Form, Field } from 'vee-validate';
import { required, confirmed, min, max, numeric, email } from '@vee-validate/rules';

// Define the rule
defineRule('required', required);
defineRule('confirmed', confirmed);
defineRule('min', min);
defineRule('max', max);
defineRule('numeric', numeric);
defineRule('email', email);

defineRule('full_half_regex', (value: string) => {
  return /^[^\;\<\=\>\/\(\)\[\]\{\|\}\\]+$/.test(value);
});

defineRule('password', (value) => {
  // eslint-disable-next-line
  return /^([a-zA-Z0-9!@#$%^&*+_-]+)$/.test(value);
});

defineRule('phone', (value: string) => {
  if (!value) return true;
  return /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(value);
});

defineRule('fax', (value: string) => {
  if (!value) return true;
  return /^\+?[0-9]+$/.test(value);
});

defineRule('post_code', (value: string) => {
  if (!value) return true;
  return /^\d{7}$/.test(value);
});

const registerVee = (app: App<Element>) => {
  app.component('Field', Field);
  app.component('Form', Form);
};

export default registerVee;
