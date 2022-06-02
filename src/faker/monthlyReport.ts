import { faker } from '@faker-js/faker';

const objectMonthly = () => {
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
    restrain_time: faker.helpers.arrayElement(['65:15', '58:30', '29:00', '99:30']),
    overtime_hours: faker.helpers.arrayElement(['14:30', '07:45', '07:15', '30:00']),
    time_list: {
      '05-16': ['08:01', '17:32', '09:15', '02:00'],
      '05-17': ['08:01', '17:32', '', '02:00'],
      '05-18': ['08:08', '17:32', '09:15', '02:00'],
      '05-19': ['08:08', '17:32', '09:15', '02:00'],
      '05-20': ['08:01', '17:32', '09:15', '02:00'],
      '05-21': ['', '', '', ''],
      '05-22': ['', '', '', ''],
      '05-23': ['08:01', '', '', '02:00'],
      '05-24': ['08:01', '01:00', '02:00', '02:00'],
      '05-25': ['08:01', '', '', '02:00'],
      '05-26': ['08:01', '', '', '02:00'],
      '05-27': ['08:01', '10:20', '', '02:00'],
      '05-28': ['08:01', '', '20:00', '02:00'],
      '05-29': ['08:01', '', '', '02:00'],
      '05-30': ['08:01', '', '', '02:00'],
      '05-31': ['08:01', '', '', '02:00'],
      '06-01': ['08:01', '', '', '02:00'],
      '06-02': ['08:01', '', '', '02:00'],
      '06-03': ['08:01', '', '', '02:00'],
      '06-04': ['08:01', '', '', '02:00'],
      '06-05': ['08:01', '', '', '02:00'],
      '06-06': ['08:01', '', '', '02:00'],
      '06-07': ['08:01', '', '', '02:00'],
      '06-08': ['08:01', '', '', '02:00'],
      '06-09': ['08:01', '', '', '02:00'],
      '06-10': ['08:01', '', '', '02:00'],
      '06-11': ['08:01', '', '', '02:00'],
      '06-12': ['08:01', '', '', '02:00'],
      '06-13': ['08:01', '', '', '02:00'],
      '06-14': ['08:01', '', '', '02:00'],
      '06-15': ['08:01', '', '', '02:00'],
    },
  };
};

const generateMonthly = (data) => {
  return {
    result: { data },
  };
};

export const renderMonthly = (numUsers) => {
  return generateMonthly(Array.from({ length: numUsers }, objectMonthly));
};
