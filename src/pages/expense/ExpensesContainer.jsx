import { connect } from 'react-redux';
import { selectCategoryList } from '../../resources/category';
import {
  addExpense,
  deleteExpense,
  editExpense,
  selectExpenseList,
} from '../../resources/expense';
import { selectSettings } from '../../resources/settings';
import Component from './ExpensesComponent';

const mapStateToProps = state => ({
  categoryList: selectCategoryList(state),
  expenseList: selectExpenseList(state),
  settings: selectSettings(state),
});

const mapDispatchToProps = dispatch => ({
  addExpense: data => dispatch(addExpense(data)),
  deleteExpense: id => dispatch(deleteExpense(id)),
  editExpense: (id, data) => dispatch(editExpense(id, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
