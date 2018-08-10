import React from 'react';
import { UserConsumer } from '../../utils/UserContext';
import HeaderNav from './HeaderNav/HeaderNav';

const Header = () => (
  <div>
    <UserConsumer>
      {context => <HeaderNav {...context} />}
    </UserConsumer>
  </div>
);

export default Header;
