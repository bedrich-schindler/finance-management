import PropTypes from 'prop-types';
import React from 'react';
import { Header } from '../Header';
import { Menu } from '../Menu';
import styles from './styles.scss';

class Layout extends React.Component {
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
    const { children } = this.props;
    const { isMenuOpened } = this.state;

    return (
      <div>
        <div className={styles.root}>
          <Header
            isMenuOpened={isMenuOpened}
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

Layout.defaultProps = {
  children: null,
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
};

export default Layout;
