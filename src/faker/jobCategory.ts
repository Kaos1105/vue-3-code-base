import { faker } from '@faker-js/faker';

const objectJobCategory = () => {
  return {
    id: faker.datatype.uuid(),
    job_category: faker.lorem.words(),
    show: faker.datatype.boolean(),
  };
};

const generateJob = (data) => {
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

export const renderJobCategory = (num) => {
  return generateJob(Array.from({ length: num }, objectJobCategory));
};
