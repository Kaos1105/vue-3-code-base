import { faker } from '@faker-js/faker';

const objectWaitingRequest = () => {
  return {
    id: faker.datatype.number(),
    name: faker.name.firstName(),
    day: faker.date.between('2022-01-01T00:00:00.000Z', '2022-05-01T00:00:00.000Z'),
    time_expected: faker.helpers.arrayElement(['12:00', '8:00', '17:30']),
    reason: faker.helpers.arrayElement(['出勤', '退勤', '無し']),
    note: faker.helpers.arrayElement(['あああ', '打刻誤り', '休日深夜', '日付あやまり']),
    time_approve: faker.fake('N/A'),
    apllication_type: faker.helpers.arrayElement(['修正', '削除リクエスト']),
  };
};

const generateWaitingRequest = (data) => {
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

export const renderWaitingRequest = (numRecords) => {
  return generateWaitingRequest(Array.from({ length: numRecords }, objectWaitingRequest));
};
