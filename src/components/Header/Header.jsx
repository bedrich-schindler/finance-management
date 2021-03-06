import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconAccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import IconMenu from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import muiStyles from './muiStyles';
import styles from './styles.scss';

export class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accountMenuEl: null,
    };

    this.handleOpenAccountMenu = this.handleOpenAccountMenu.bind(this);
    this.handleCloseAccountMenu = this.handleCloseAccountMenu.bind(this);
  }

  handleOpenAccountMenu(e) {
    this.setState({ accountMenuEl: e.currentTarget });
  }

  handleCloseAccountMenu() {
    this.setState({ accountMenuEl: null });
  }

  renderAccountMenu() {
    const {
      loggedUser,
      onLogout,
    } = this.props;
    const { accountMenuEl } = this.state;

    return (
      <div className={styles.accountMenuButton}>
        <span className={styles.userName}>
          {loggedUser.name}
        </span>
        <IconButton
          color="inherit"
          onClick={this.handleOpenAccountMenu}
        >
          <IconAccountCircle />
        </IconButton>
        <Menu
          anchorEl={accountMenuEl}
          open={Boolean(accountMenuEl)}
          onClose={this.handleCloseAccountMenu}
        >
          <MenuItem onClick={onLogout}>
            Logout
          </MenuItem>
        </Menu>
      </div>
    );
  }

  renderMenu() {
    const {
      isMenuOpened,
      onOpenMenu,
    } = this.props;

    if (isMenuOpened) {
      return null;
    }

    return (
      <div className={styles.menuButton}>
        <IconButton
          color="inherit"
          onClick={onOpenMenu}
        >
          <IconMenu />
        </IconButton>
      </div>
    );
  }

  renderTitle() {
    const { title } = this.props;

    return (
      <span className={styles.title}>
        {title}
      </span>
    );
  }

  render() {
    const {
      classes,
      isMenuOpened,
    } = this.props;

    return (
      <AppBar
        className={classNames(
          classes.appBar,
          {
            [classes.appBarWithOpenedMenu]: isMenuOpened,
          },
        )}
        position="static"
      >
        <Toolbar disableGutters={!isMenuOpened}>
          {this.renderMenu()}
          {this.renderTitle()}
          {this.renderAccountMenu()}
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  isMenuOpened: PropTypes.bool.isRequired,
  loggedUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
  onOpenMenu: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(muiStyles, { withTheme: true })(Header);
