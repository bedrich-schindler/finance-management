import moment from 'moment';

export const getThisMonthRecords = (records) => {
  const actualDate = moment();

  return records.filter(record => moment(record.date).isSame(actualDate, 'month'));
};

export const getLastMonthRecords = (records) => {
  const actualDate = moment().subtract(1, 'month');

  return records.filter(record => moment(record.date).isSame(actualDate, 'month'));
};

export const getThisYearRecords = (records) => {
  const actualDate = moment();

  return records.filter(record => moment(record.date).isSame(actualDate, 'year'));
};

