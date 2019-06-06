import PropTypes from 'prop-types';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { code } from 'currency-codes';
import { Layout } from '../../components/Layout';
import {
  getLastMonthRecords,
  getThisMonthRecords,
  getThisYearRecords,
} from '../../services/statisticsService';
import styles from './styles.scss';

const DashboardComponent = (props) => {
  const {
    expenseList,
    revenueList,
    settings,
  } = props;

  const { currency } = settings;
  const currencyPrecision = code(currency).digits;

  const thisMonthExpenseList = getThisMonthRecords(expenseList);
  const lastMonthExpenseList = getLastMonthRecords(expenseList);
  const thisYearExpenseList = getThisYearRecords(expenseList);
  const thisMonthRevenueList = getThisMonthRecords(revenueList);
  const lastMonthRevenueList = getLastMonthRecords(revenueList);
  const thisYearRevenueList = getThisYearRecords(revenueList);

  const thisMonthExpenseAmount = thisMonthExpenseList
    .reduce((total, record) => total + record.amount, 0);
  const lastMonthExpenseAmount = lastMonthExpenseList
    .reduce((total, record) => total + record.amount, 0);
  const thisYearExpenseAmount = thisYearExpenseList
    .reduce((total, record) => total + record.amount, 0);
  const thisMonthRevenueAmount = thisMonthRevenueList
    .reduce((total, record) => total + record.amount, 0);
  const lastMonthRevenueAmount = lastMonthRevenueList
    .reduce((total, record) => total + record.amount, 0);
  const thisYearRevenueAmount = thisYearRevenueList
    .reduce((total, record) => total + record.amount, 0);

  const thisMonthBalance = thisMonthRevenueAmount - thisMonthExpenseAmount;
  const lastMonthBalance = lastMonthRevenueAmount - lastMonthExpenseAmount;
  const thisYearBalance = thisYearRevenueAmount - thisYearExpenseAmount;

  return (
    <Layout>
      <h1>Dashboard</h1>
      <div className={styles.paperWrapper}>
        <Paper className={styles.paper}>
          <h2>This month</h2>
          <hr />
          <Table className={styles.table}>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Revenues
                </TableCell>
                <TableCell align="right">
                  {thisMonthRevenueAmount.toFixed(currencyPrecision)}
                  {' '}
                  {currency}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Expenses
                </TableCell>
                <TableCell align="right">
                  {thisMonthExpenseAmount.toFixed(currencyPrecision)}
                  {' '}
                  {currency}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Balance
                </TableCell>
                <TableCell align="right">
                  {thisMonthBalance.toFixed(currencyPrecision)}
                  {' '}
                  {currency}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <Paper className={styles.paper}>
          <h2>Last month</h2>
          <hr />
          <Table className={styles.table}>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Revenues
                </TableCell>
                <TableCell align="right">
                  {lastMonthRevenueAmount.toFixed(currencyPrecision)}
                  {' '}
                  {currency}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Expenses
                </TableCell>
                <TableCell align="right">
                  {lastMonthExpenseAmount.toFixed(currencyPrecision)}
                  {' '}
                  {currency}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Balance
                </TableCell>
                <TableCell align="right">
                  {lastMonthBalance.toFixed(currencyPrecision)}
                  {' '}
                  {currency}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <Paper className={styles.paper}>
          <h2>This year</h2>
          <hr />
          <Table className={styles.table}>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Revenues
                </TableCell>
                <TableCell align="right">
                  {thisYearRevenueAmount.toFixed(currencyPrecision)}
                  {' '}
                  {currency}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Expenses
                </TableCell>
                <TableCell align="right">
                  {thisYearExpenseAmount.toFixed(currencyPrecision)}
                  {' '}
                  {currency}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Balance
                </TableCell>
                <TableCell align="right">
                  {thisYearBalance.toFixed(currencyPrecision)}
                  {' '}
                  {currency}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
    </Layout>
  );
};

DashboardComponent.propTypes = {
  expenseList: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number.isRequired,
    category: PropTypes.string,
    date: PropTypes.string.isRequired,
    expense: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  revenueList: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number.isRequired,
    category: PropTypes.string,
    date: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    revenue: PropTypes.string.isRequired,
  })).isRequired,
  settings: PropTypes.shape({
    currency: PropTypes.string.isRequired,
  }).isRequired,
};

export default DashboardComponent;
