import { faker } from '@faker-js/faker';

const objectWorkData = () => {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    staff_code: faker.datatype.number(),
    day: faker.date.between('2022-01-01T00:00:00.000Z', '2022-04-01T00:00:00.000Z'),
    time_to_work: faker.fake('08:01'),
    time_out: faker.fake('17:29'),
    time_expected: faker.fake('8:30'),
    time_to_work_rounded: faker.fake('8:00'),
    time_out_rounded: faker.fake('17:30'),
    basic_rest: faker.datatype.number({ min: 0, max: 8 }),
    rest_start: faker.fake('12:01'),
    rest_end: faker.fake('13:29'),
    time_work: faker.datatype.float({ min: 0, max: 8, precision: 0.1 }),
    device: faker.fake('Computer'),
    overtime: faker.fake('0'),
    overtime_night: faker.fake('0'),
    work_night: faker.fake('0'),
    work_holiday: faker.fake('0'),
    overtime_holiday: faker.fake('0'),
    overtime_holiday_night: faker.fake('0'),
    overtime_dayoff_night: faker.fake('0'),
    distance: faker.datatype.number({ min: 1, max: 8 }),
    trip: faker.fake('0'),
    driver: faker.fake('0'),
    note: faker.word.adjective(5),
    allowance: faker.datatype.number({ min: 1000, max: 10000 }),
  };
};

const generateWorkData = (data) => {
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

export const renderWorkData = (numRecords) => {
  return generateWorkData(Array.from({ length: numRecords }, objectWorkData));
};
