import { connect } from 'react-redux';
import { selectCategoryList } from '../../resources/category';
import { selectExpenseList } from '../../resources/expense';
import { selectRevenueList } from '../../resources/revenue';
import { selectSettings } from '../../resources/settings';
import Component from './DashboardComponent';

const mapStateToProps = state => ({
  categoryList: selectCategoryList(state),
  expenseList: selectExpenseList(state),
  revenueList: selectRevenueList(state),
  settings: selectSettings(state),
});

export default connect(mapStateToProps)(Component);
