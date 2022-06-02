import { computed } from 'vue';
import { configure } from 'vee-validate';
import { localize } from '@vee-validate/i18n';

import i18n from '@/locale';
import en from '@vee-validate/i18n/dist/locale/en.json';
import ja from '@vee-validate/i18n/dist/locale/ja.json';

export function useConfigValidate() {
  const dictionary = computed(() => {
    return {
      en: {
        full_half_regex: 'Name can not contain invalid symbols',
        required: '{field} is required',
        min: 'Please input at least 0:{length} characters',
        max: 'Please input within 0:{length} characters',
        email: 'Please input email address in the right format',
        password:
          'Only alphanumerical characters including uppercase letters, lowercase letters, and symbols are valid',
        phone: '{field} format is not correct',
        fax: '{field} format is not correct',
        post_code: '{field} format is not correct',
        confirmed: 'Does not match the password',
      },
      ja: {
        full_half_regex: '無効な記号は含めないで下さい。',
        required: '{field}は必須項目です。',
        min: '0:{length}文字以上でご入力ください。',
        max: '0:{length}文字以内でご入力ください。',
        email: '{field}形式でご入力ください。',
        password: '大文字・小文字・記号を含む英数字でご入力ください。',
        phone: '{field}の形式が正しくありません',
        fax: '{field}の形式が正しくありません',
        post_code: '{field}の形式が正しくありません',
        confirmed: 'パスワードと一致しません。',
      },
    };
  });

  const messages: any = {
    en: { ...en.messages, ...dictionary.value.en },
    ja: { ...ja.messages, ...dictionary.value.ja },
  };

  const configureMessage = () => {
    configure({
      generateMessage: localize(i18n.global.locale, {
        messages: { ...messages[i18n.global.locale] },
      }),
      validateOnInput: true,
    });
  };

  return { configureMessage };
}
