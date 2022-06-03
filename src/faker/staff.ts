import { faker } from '@faker-js/faker';

const objectStaff = () => {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    staff_code: faker.datatype.number(),
    email: faker.internet.email(),
    group_name: faker.company.companyName(),
    registration_date: faker.date.between('2022-01-01T00:00:00.000Z', '2022-04-01T00:00:00.000Z'),
    show: faker.datatype.boolean(),
  };
};

const generateStaff = (data) => {
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

export const renderStaff = (numUsers) => {
  return generateStaff(Array.from({ length: numUsers }, objectStaff));
};
