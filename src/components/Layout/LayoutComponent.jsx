import PropTypes from 'prop-types';
import React from 'react';
import { Header } from '../Header';
import { Menu } from '../Menu';
import styles from './styles.scss';

class LayoutComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpened: false,
    };

    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
  }

  handleOpenMenu() {
    this.setState({ isMenuOpened: true });
  }

  handleCloseMenu() {
    this.setState({ isMenuOpened: false });
  }

  render() {
    const {
      children,
      loggedUser,
      logout,
    } = this.props;
    const { isMenuOpened } = this.state;

    return (
      <div>
        <div className={styles.root}>
          <Header
            isMenuOpened={isMenuOpened}
            loggedUser={loggedUser}
            onLogout={logout}
            onOpenMenu={this.handleOpenMenu}
            title="Finance management"
          />
          <Menu
            isMenuOpened={isMenuOpened}
            onCloseMenu={this.handleCloseMenu}
          />
        </div>
        <main className={styles.content}>
          {children}
        </main>
      </div>
    );
  }
}

LayoutComponent.defaultProps = {
  children: null,
};

LayoutComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
  loggedUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
};

export default LayoutComponent;
