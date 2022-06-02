import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

const objectCalendar = () => {
  return {
    id: faker.datatype.uuid(),
    date: dayjs(faker.date.between('2022-01-01T00:00:00.000Z', '2022-04-01T00:00:00.000Z')),
    all: faker.datatype.boolean(),
    holiday: faker.datatype.boolean(),
    create_date: dayjs(faker.date.between('2022-01-01T00:00:00.000Z', '2022-04-01T00:00:00.000Z')),
    note: faker.lorem.words(),
  };
};

const generateCalendar = (data) => {
  return {
    result: {
      data,
      meta: {
        total: 2,
        count: 2,
        per_page: 30,
        current_page: 1,
        total_pages: 1,
        links: {},
      },
    },
  };
};

export const renderCalendar = (num) => {
  return generateCalendar(Array.from({ length: num }, objectCalendar));
};
