import React from 'react';

import NextHead from '../nextHead/NextHead';
import CustomDrawer from '../customDrawer/CustomDrawer';

function MainView(): JSX.Element {
  return (
    <div>
      <NextHead />
      <CustomDrawer />
    </div>
  );
}

export default MainView;
