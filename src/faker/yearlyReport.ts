import { faker } from '@faker-js/faker';

const objectYearly = () => {
  return {
    id: faker.datatype.uuid(),
    service: faker.helpers.arrayElement([
      '原　富美子',
      '野口　みな美',
      '佐藤　明美',
      '木下　佳子',
      '鈴木　ミヨ子',
    ]),
    staff_code: faker.datatype.number(),
    total: ['348:00', '75:00', '39'],
    month_average: ['348:00', '', '30:30'],
    average: ['26:46', '05:46', ''],
    time_list: {
      0: ['08:01', '17:32', '09:15'],
      1: ['08:01', '17:32', '13:15'],
      2: ['08:01', '17:32', '12:15'],
      3: ['08:01', '17:32', '11:15'],
      4: ['08:01', '17:32', '10:15'],
      5: ['08:01', '17:32', '09:15'],
      6: ['08:01', '17:32', '08:15'],
      7: ['08:01', '17:32', '07:15'],
      8: ['08:01', '17:32', '06:15'],
      9: ['08:01', '17:32', '05:15'],
      10: ['08:01', '17:32', '04:15'],
      11: ['02:01', '12:32', '03:15'],
    },
  };
};

const generateYearly = (data) => {
  return {
    result: { data },
  };
};

export const renderYearly = (numUsers) => {
  return generateYearly(Array.from({ length: numUsers }, objectYearly));
};

export const renderHeaderYearly = () => {
  return {
    constrained_average: [
      '00:00',
      '00:00',
      '00:00',
      '00:00',
      '00:00',
      '00:00',
      '00:00',
      '00:00',
      '63:33',
      '108:35',
      '104:57',
      '128:28',
    ],
    overtime_average: [
      '00:00',
      '00:00',
      '00:00',
      '00:00',
      '00:00',
      '00:00',
      '00:00',
      '00:00',
      '12:52',
      '21:48',
      '21:00',
      '23:55',
    ],
  };
};
