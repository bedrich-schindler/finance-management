import { connect } from 'react-redux';
import {
  addCategory,
  deleteCategory,
  editCategory,
  selectCategoryList,
} from '../../resources/category';
import Component from './CategoriesComponent';

const mapStateToProps = state => ({
  categoryList: selectCategoryList(state),
});

const mapDispatchToProps = dispatch => ({
  addCategory: data => dispatch(addCategory(data)),
  deleteCategory: id => dispatch(deleteCategory(id)),
  editCategory: (id, data) => dispatch(editCategory(id, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
