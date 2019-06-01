import { connect } from 'react-redux';
import { selectCategoryList } from '../../resources/category';
import {
  addRevenue,
  deleteRevenue,
  editRevenue,
  selectRevenueList,
} from '../../resources/revenue';
import Component from './RevenuesComponent';

const mapStateToProps = state => ({
  categoryList: selectCategoryList(state),
  revenueList: selectRevenueList(state),
});

const mapDispatchToProps = dispatch => ({
  addRevenue: data => dispatch(addRevenue(data)),
  deleteRevenue: id => dispatch(deleteRevenue(id)),
  editRevenue: (id, data) => dispatch(editRevenue(id, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
