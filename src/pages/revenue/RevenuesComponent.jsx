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
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Layout } from '../../components/Layout';
import { CATEGORY_TYPES } from '../../resources/category';
import { AddRevenueForm } from './components/AddRevenueForm';
import { EditRevenueForm } from './components/EditRevenueForm';
import { DeleteRevenueForm } from './components/DeleteRevenueForm';
import styles from './styles.scss';

class RevenuesComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteRevenueFormOpenedId: null,
      editRevenueFormOpenedId: null,
      isAddRevenueFormOpened: false,
      isDeleteRevenueFormOpened: false,
      isEditRevenueFormOpened: false,
    };

    this.handleOpenAddRevenueForm = this.handleOpenAddRevenueForm.bind(this);
    this.handleCloseAddRevenueForm = this.handleCloseAddRevenueForm.bind(this);
    this.handleOpenDeleteRevenueForm = this.handleOpenDeleteRevenueForm.bind(this);
    this.handleCloseDeleteRevenueForm = this.handleCloseDeleteRevenueForm.bind(this);
    this.handleOpenEditRevenueForm = this.handleOpenEditRevenueForm.bind(this);
    this.handleCloseEditRevenueForm = this.handleCloseEditRevenueForm.bind(this);
  }

  handleOpenAddRevenueForm() {
    return this.setState({ isAddRevenueFormOpened: true });
  }

  handleCloseAddRevenueForm() {
    return this.setState({ isAddRevenueFormOpened: false });
  }

  handleOpenDeleteRevenueForm(id) {
    return this.setState({
      deleteRevenueFormOpenedId: id,
      isDeleteRevenueFormOpened: true,
    });
  }

  handleCloseDeleteRevenueForm() {
    return this.setState({
      deleteRevenueFormOpenedId: null,
      isDeleteRevenueFormOpened: false,
    });
  }

  handleOpenEditRevenueForm(id) {
    return this.setState({
      editRevenueFormOpenedId: id,
      isEditRevenueFormOpened: true,
    });
  }

  handleCloseEditRevenueForm() {
    return this.setState({
      editRevenueFormOpenedId: null,
      isEditRevenueFormOpened: false,
    });
  }

  render() {
    const {
      addRevenue,
      categoryList,
      deleteRevenue,
      editRevenue,
      revenueList,
    } = this.props;
    const {
      deleteRevenueFormOpenedId,
      editRevenueFormOpenedId,
      isAddRevenueFormOpened,
      isDeleteRevenueFormOpened,
      isEditRevenueFormOpened,
    } = this.state;

    const getCategoryLabel = (row) => {
      const category = categoryList.find(iCategory => iCategory.id === row.category);

      if (category) {
        return category.name;
      }

      return '-';
    };

    return (
      <Layout>
        <h1>Revenues</h1>
        <Paper className={styles.tableWrapper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Revenue</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Category</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {revenueList.map(row => (
                <TableRow key={row.id}>
                  <TableCell>
                    {moment(row.date).format('DD. MM. YYYY HH:mm')}
                  </TableCell>
                  <TableCell>
                    {row.revenue}
                  </TableCell>
                  <TableCell>
                    {row.amount}
                    {' '}
CZK
                  </TableCell>
                  <TableCell>
                    {getCategoryLabel(row)}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => this.handleOpenEditRevenueForm(row.id)}>
                      <IconEdit />
                    </IconButton>
                    <IconButton onClick={() => this.handleOpenDeleteRevenueForm(row.id)}>
                      <IconDelete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {revenueList.length === 0 && (
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
          onClick={this.handleOpenAddRevenueForm}
        >
          <IconAdd />
        </FloatingActionButton>
        {isAddRevenueFormOpened && (
          <AddRevenueForm
            categoryList={categoryList}
            onClose={this.handleCloseAddRevenueForm}
            onSave={addRevenue}
          />
        )}
        {isDeleteRevenueFormOpened && (
          <DeleteRevenueForm
            id={deleteRevenueFormOpenedId}
            onClose={this.handleCloseDeleteRevenueForm}
            onDelete={deleteRevenue}
          />
        )}
        {isEditRevenueFormOpened && (
          <EditRevenueForm
            categoryList={categoryList}
            id={editRevenueFormOpenedId}
            onClose={this.handleCloseEditRevenueForm}
            onSave={editRevenue}
            revenueList={revenueList}
          />
        )}
      </Layout>
    );
  }
}

RevenuesComponent.propTypes = {
  addRevenue: PropTypes.func.isRequired,
  categoryList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(CATEGORY_TYPES).isRequired,
  })).isRequired,
  deleteRevenue: PropTypes.func.isRequired,
  editRevenue: PropTypes.func.isRequired,
  revenueList: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number.isRequired,
    category: PropTypes.string,
    date: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    revenue: PropTypes.string.isRequired,
  })).isRequired,
};

export default RevenuesComponent;
