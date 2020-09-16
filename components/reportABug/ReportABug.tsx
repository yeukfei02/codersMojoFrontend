import React, { useEffect } from 'react';

import NextHead from '../nextHead/NextHead';

function MainView(): JSX.Element {
  useEffect(() => {
    openReportABugLink();
  }, []);

  const openReportABugLink = () => {
    window.open(`https://forms.gle/rBba5xyeysw9232FA`);
  };

  return (
    <div>
      <NextHead />
      Report a Bug
    </div>
  );
}

export default MainView;
