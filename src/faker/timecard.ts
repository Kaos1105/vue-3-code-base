import { faker } from '@faker-js/faker';

const objectTimecard1 = () => {
  return {
    id: faker.datatype.uuid(),
    user_id: faker.fake('1234567'),
    name: faker.fake('Staff Example'),
    day_calender:
      faker.datatype.number({ min: 1, max: 31 }) + '日(' + faker.date.weekday({ abbr: true }) + ')',
    time_to_work: faker.helpers.arrayElement(['8:11', '13:59', '']),
    time_out: faker.helpers.arrayElement(['17:55', '']),
    time_expected: faker.helpers.arrayElement(['8:00', '']),
    basic_rest: faker.datatype.float({ min: 0, max: 2, precision: 0.1 }),
    time_work: faker.datatype.number({ min: 0, max: 8 }),
    overtime: faker.helpers.arrayElement([faker.datatype.number({ min: 0, max: 8 }), '']),
    overtime_night: faker.helpers.arrayElement([faker.datatype.number({ min: 0, max: 8 }), '']),
    work_night: faker.helpers.arrayElement([faker.datatype.number({ min: 0, max: 8 }), '']),
    overtime_holiday: faker.helpers.arrayElement([faker.datatype.number({ min: 0, max: 8 }), '']),
    overtime_holiday_night: faker.helpers.arrayElement([
      faker.datatype.number({ min: 0, max: 8 }),
      '',
    ]),
    overtime_dayoff_night: faker.helpers.arrayElement([
      faker.datatype.number({ min: 0, max: 8 }),
      '',
    ]),
    distance: faker.datatype.number({ min: 1, max: 10 }),
    trip: faker.datatype.number({ min: 0, max: 8 }),
    driver: faker.datatype.number({ min: 0, max: 100 }),
    note: faker.helpers.arrayElement(['note example', '']),
    allowance: faker.datatype.number({ min: 10000, max: 100000 }),
    attendance_type: faker.helpers.arrayElement(['出勤タイプA ', '出勤タイプB', '一般']),
  };
};

const objectTimecard2 = () => {
  return {
    day_number: faker.datatype.number({ min: 1, max: 30 }),
    work_dayoff: faker.helpers.arrayElement(['0:00', '10:00', '5:00', '2:00']),
    sunday: faker.helpers.arrayElement(['0:00', '10:00', '5:00', '2:00']),
    day_offset: faker.helpers.arrayElement(['0:00', '10:00', '5:00', '2:00']),
    day_exchange: faker.helpers.arrayElement(['0:00', '10:00', '5:00', '2:00']),
    specify: faker.helpers.arrayElement(['0:00', '10:00', '5:00', '2:00']),
    dayoff_salary: faker.helpers.arrayElement(['0:00', '10:00', '5:00', '2:00']),
    special_holiday: faker.helpers.arrayElement(['0:00', '2:00']),
    mourning_dayoff: faker.helpers.arrayElement(['0:00', '10:00', '5:00', '2:00']),
    no_tropble: faker.helpers.arrayElement(['0:00', '10:00', '5:00', '2:00']),
    honeymoon_dayoff: faker.helpers.arrayElement(['0:00', '10:00', '5:00', '2:00']),
    leave_work: faker.helpers.arrayElement(['0:00', '10:00', '5:00', '2:00']),
    other_dayoff: faker.helpers.arrayElement(['0:00', '10:00', '5:00', '2:00']),
    rest: faker.fake('0:00'),
    time_work: faker.fake('9:30'),
    time_work_total: faker.fake('9:30'),
    overtime_basic: faker.fake('0:00'),
    overtime_night: faker.fake('0:00'),
    work_night: faker.fake('0:00'),
    overtime_holiday: faker.fake('0:00'),
    overtime_holiday_night: faker.fake('0:00'),
    overtime_dayoff_night: faker.fake('0:00'),
    total_overtime: faker.fake('2:22'),
    limit: faker.fake('3.39%'),
    time_limit: faker.fake('9:30'),
    maximum_time_limit: faker.fake('280'),
  };
};

const objectTimecard3 = () => {
  return {
    id: faker.datatype.uuid(),
    work: faker.fake('100000¥'),
    discount_salary: faker.fake('0'),
    distance: faker.fake('100km'),
  };
};

const objectTimecard4 = () => {
  return {
    id: faker.datatype.uuid(),
    shift_a: faker.fake('0'),
    shift_b: faker.fake('0'),
  };
};

const generateTimecard = (data) => {
  return {
    result: {
      data,
      meta: {
        total_records: 49,
        total_pages: 4,
        page_size: 10,
        page_number: 1,
      },
    },
  };
};

export const renderTimecard1 = (numRecords) => {
  return generateTimecard(Array.from({ length: numRecords }, objectTimecard1));
};

export const renderTimecard2 = (numRecords) => {
  return generateTimecard(Array.from({ length: numRecords }, objectTimecard2));
};

export const renderTimecard3 = (numRecords) => {
  return generateTimecard(Array.from({ length: numRecords }, objectTimecard3));
};

export const renderTimecard4 = (numRecords) => {
  return generateTimecard(Array.from({ length: numRecords }, objectTimecard4));
};
