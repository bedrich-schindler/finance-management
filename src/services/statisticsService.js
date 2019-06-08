import moment from 'moment';

/**
 * Gets filtered records for this month.
 *
 * @param records Records to be filtered.
 * @returns {array} Filtered records.
 */
export const getThisMonthRecords = (records) => {
  const actualDate = moment();

  return records.filter(record => moment(record.date).isSame(actualDate, 'month'));
};

/**
 * Gets filtered records for last month.
 *
 * @param records Records to be filtered.
 * @returns {array} Filtered records.
 */
export const getLastMonthRecords = (records) => {
  const actualDate = moment().subtract(1, 'month');

  return records.filter(record => moment(record.date).isSame(actualDate, 'month'));
};

/**
 * Gets filtered records for this year.
 *
 * @param records Records to be filtered.
 * @returns {array} Filtered records.
 */
export const getThisYearRecords = (records) => {
  const actualDate = moment();

  return records.filter(record => moment(record.date).isSame(actualDate, 'year'));
};

