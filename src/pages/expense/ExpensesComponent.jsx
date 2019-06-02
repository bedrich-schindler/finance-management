import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import FloatingActionButton from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import IconAdd from '@material-ui/icons/Add';
import IconDelete from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { code } from 'currency-codes';
import { Layout } from '../../components/Layout';
import { CATEGORY_TYPES } from '../../resources/category';
import { AddExpenseForm } from './components/AddExpenseForm';
import { EditExpenseForm } from './components/EditExpenseForm';
import { DeleteExpenseForm } from './components/DeleteExpenseForm';
import styles from './styles.scss';

class ExpensesComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteExpenseFormOpenedId: null,
      editExpenseFormOpenedId: null,
      expenseTablePage: 0,
      expenseTableRowsPerPage: 5,
      isAddExpenseFormOpened: false,
      isDeleteExpenseFormOpened: false,
      isEditExpenseFormOpened: false,
    };

    this.handleOpenAddExpenseForm = this.handleOpenAddExpenseForm.bind(this);
    this.handleCloseAddExpenseForm = this.handleCloseAddExpenseForm.bind(this);
    this.handleOpenDeleteExpenseForm = this.handleOpenDeleteExpenseForm.bind(this);
    this.handleCloseDeleteExpenseForm = this.handleCloseDeleteExpenseForm.bind(this);
    this.handleOpenEditExpenseForm = this.handleOpenEditExpenseForm.bind(this);
    this.handleCloseEditExpenseForm = this.handleCloseEditExpenseForm.bind(this);
    this.handleChangeExpenseTablePage = this.handleChangeExpenseTablePage.bind(this);
    this.handleChangeExpenseTableRowsPerPage = this.handleChangeExpenseTableRowsPerPage.bind(this);
  }

  handleOpenAddExpenseForm() {
    return this.setState({ isAddExpenseFormOpened: true });
  }

  handleCloseAddExpenseForm() {
    return this.setState({ isAddExpenseFormOpened: false });
  }

  handleOpenDeleteExpenseForm(id) {
    return this.setState({
      deleteExpenseFormOpenedId: id,
      isDeleteExpenseFormOpened: true,
    });
  }

  handleCloseDeleteExpenseForm() {
    return this.setState({
      deleteExpenseFormOpenedId: null,
      isDeleteExpenseFormOpened: false,
    });
  }

  handleOpenEditExpenseForm(id) {
    return this.setState({
      editExpenseFormOpenedId: id,
      isEditExpenseFormOpened: true,
    });
  }

  handleCloseEditExpenseForm() {
    return this.setState({
      editExpenseFormOpenedId: null,
      isEditExpenseFormOpened: false,
    });
  }

  handleChangeExpenseTablePage(e, newPage) {
    return this.setState({
      expenseTablePage: newPage,
    });
  }

  handleChangeExpenseTableRowsPerPage(e) {
    const { expenseList } = this.props;
    const { expenseTablePage } = this.state;

    if (expenseTablePage * +e.target.value >= expenseList.length) {
      return this.setState({
        expenseTablePage: Math.floor(expenseList.length / +e.target.value),
        expenseTableRowsPerPage: +e.target.value,
      });
    }

    return this.setState({
      expenseTableRowsPerPage: +e.target.value,
    });
  }

  render() {
    const {
      addExpense,
      categoryList,
      deleteExpense,
      editExpense,
      expenseList,
      settings,
    } = this.props;
    const {
      deleteExpenseFormOpenedId,
      editExpenseFormOpenedId,
      expenseTablePage,
      expenseTableRowsPerPage,
      isAddExpenseFormOpened,
      isDeleteExpenseFormOpened,
      isEditExpenseFormOpened,
    } = this.state;

    const { currency } = settings;
    const currencyPrecision = code(currency).digits;

    const getCategoryLabel = (row) => {
      const category = categoryList.find(iCategory => iCategory.id === row.category);

      if (category) {
        return category.name;
      }

      return '-';
    };

    return (
      <Layout>
        <h1>Expenses</h1>
        <Paper className={styles.tableWrapper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Expense</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Category</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {expenseList
                .slice(
                  expenseTablePage * expenseTableRowsPerPage,
                  expenseTablePage * expenseTableRowsPerPage + expenseTableRowsPerPage,
                )
                .map(row => (
                  <TableRow key={row.id}>
                    <TableCell>
                      {moment(row.date).format('DD. MM. YYYY HH:mm')}
                    </TableCell>
                    <TableCell>
                      {row.expense}
                    </TableCell>
                    <TableCell>
                      {row.amount.toFixed(currencyPrecision)}
                      {' '}
                      {settings.currency}
                    </TableCell>
                    <TableCell>
                      {getCategoryLabel(row)}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => this.handleOpenEditExpenseForm(row.id)}>
                        <IconEdit />
                      </IconButton>
                      <IconButton onClick={() => this.handleOpenDeleteExpenseForm(row.id)}>
                        <IconDelete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              }
              {expenseList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3}>
                    No data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={expenseList.length}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangeExpenseTablePage}
            onChangeRowsPerPage={this.handleChangeExpenseTableRowsPerPage}
            page={expenseTablePage}
            rowsPerPage={expenseTableRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
        <FloatingActionButton
          className={styles.addButton}
          color="primary"
          onClick={this.handleOpenAddExpenseForm}
        >
          <IconAdd />
        </FloatingActionButton>
        {isAddExpenseFormOpened && (
          <AddExpenseForm
            categoryList={categoryList}
            onClose={this.handleCloseAddExpenseForm}
            onSave={addExpense}
            settings={settings}
          />
        )}
        {isDeleteExpenseFormOpened && (
          <DeleteExpenseForm
            id={deleteExpenseFormOpenedId}
            onClose={this.handleCloseDeleteExpenseForm}
            onDelete={deleteExpense}
          />
        )}
        {isEditExpenseFormOpened && (
          <EditExpenseForm
            categoryList={categoryList}
            id={editExpenseFormOpenedId}
            onClose={this.handleCloseEditExpenseForm}
            onSave={editExpense}
            expenseList={expenseList}
            settings={settings}
          />
        )}
      </Layout>
    );
  }
}

ExpensesComponent.propTypes = {
  addExpense: PropTypes.func.isRequired,
  categoryList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(CATEGORY_TYPES).isRequired,
  })).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  expenseList: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number.isRequired,
    category: PropTypes.string,
    date: PropTypes.string.isRequired,
    expense: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  settings: PropTypes.shape({
    currency: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExpensesComponent;
