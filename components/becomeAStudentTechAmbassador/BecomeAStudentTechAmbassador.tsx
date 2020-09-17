import React, { useEffect } from 'react';

import NextHead from '../nextHead/NextHead';

function BecomeAStudentTechAmbassador(): JSX.Element {
  useEffect(() => {
    openBecomeAStudentTechAmbassadorLink();
  }, []);

  const openBecomeAStudentTechAmbassadorLink = () => {
    window.open(`https://forms.gle/gCJGap2dpENuwhYi8`);
  };

  return (
    <div>
      <NextHead />
      Become a Student Tech Ambassador
    </div>
  );
}

export default BecomeAStudentTechAmbassador;
