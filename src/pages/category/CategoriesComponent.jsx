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
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Layout } from '../../components/Layout';
import {
  CATEGORY_TYPES,
  getCategoryTypeLabel,
} from '../../resources/category';
import { AddCategoryForm } from './components/AddCategoryForm';
import { EditCategoryForm } from './components/EditCategoryForm';
import { DeleteCategoryForm } from './components/DeleteCategoryForm';
import styles from './styles.scss';

class CategoriesComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteCategoryFormOpenedId: null,
      editCategoryFormOpenedId: null,
      isAddCategoryFormOpened: false,
      isDeleteCategoryFormOpened: false,
      isEditCategoryFormOpened: false,
    };

    this.handleOpenAddCategoryForm = this.handleOpenAddCategoryForm.bind(this);
    this.handleCloseAddCategoryForm = this.handleCloseAddCategoryForm.bind(this);
    this.handleOpenDeleteCategoryForm = this.handleOpenDeleteCategoryForm.bind(this);
    this.handleCloseDeleteCategoryForm = this.handleCloseDeleteCategoryForm.bind(this);
    this.handleOpenEditCategoryForm = this.handleOpenEditCategoryForm.bind(this);
    this.handleCloseEditCategoryForm = this.handleCloseEditCategoryForm.bind(this);
  }

  handleOpenAddCategoryForm() {
    return this.setState({ isAddCategoryFormOpened: true });
  }

  handleCloseAddCategoryForm() {
    return this.setState({ isAddCategoryFormOpened: false });
  }

  handleOpenDeleteCategoryForm(id) {
    return this.setState({
      deleteCategoryFormOpenedId: id,
      isDeleteCategoryFormOpened: true,
    });
  }

  handleCloseDeleteCategoryForm() {
    return this.setState({
      deleteCategoryFormOpenedId: null,
      isDeleteCategoryFormOpened: false,
    });
  }

  handleOpenEditCategoryForm(id) {
    return this.setState({
      editCategoryFormOpenedId: id,
      isEditCategoryFormOpened: true,
    });
  }

  handleCloseEditCategoryForm() {
    return this.setState({
      editCategoryFormOpenedId: null,
      isEditCategoryFormOpened: false,
    });
  }

  render() {
    const {
      addCategory,
      categoryList,
      deleteCategory,
      editCategory,
    } = this.props;
    const {
      deleteCategoryFormOpenedId,
      editCategoryFormOpenedId,
      isAddCategoryFormOpened,
      isDeleteCategoryFormOpened,
      isEditCategoryFormOpened,
    } = this.state;

    return (
      <Layout>
        <h1>Categories</h1>
        <Paper className={styles.tableWrapper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryList.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>
                    {getCategoryTypeLabel(row.type)}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => this.handleOpenEditCategoryForm(row.id)}>
                      <IconEdit />
                    </IconButton>
                    <IconButton onClick={() => this.handleOpenDeleteCategoryForm(row.id)}>
                      <IconDelete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {categoryList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3}>
                    No data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
        <FloatingActionButton
          className={styles.addButton}
          color="primary"
          onClick={this.handleOpenAddCategoryForm}
        >
          <IconAdd />
        </FloatingActionButton>
        {isAddCategoryFormOpened && (
          <AddCategoryForm
            categoryList={categoryList}
            onClose={this.handleCloseAddCategoryForm}
            onSave={addCategory}
          />
        )}
        {isDeleteCategoryFormOpened && (
          <DeleteCategoryForm
            id={deleteCategoryFormOpenedId}
            onClose={this.handleCloseDeleteCategoryForm}
            onDelete={deleteCategory}
          />
        )}
        {isEditCategoryFormOpened && (
          <EditCategoryForm
            categoryList={categoryList}
            id={editCategoryFormOpenedId}
            onClose={this.handleCloseEditCategoryForm}
            onSave={editCategory}
          />
        )}
      </Layout>
    );
  }
}

CategoriesComponent.propTypes = {
  addCategory: PropTypes.func.isRequired,
  categoryList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(CATEGORY_TYPES).isRequired,
  })).isRequired,
  deleteCategory: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
};

export default CategoriesComponent;
