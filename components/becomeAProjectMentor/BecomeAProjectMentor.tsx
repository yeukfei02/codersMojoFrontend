import React, { useEffect } from 'react';

import NextHead from '../nextHead/NextHead';

function BecomeAProjectMentor(): JSX.Element {
  useEffect(() => {
    openBecomeAProjectMentorLink();
  }, []);

  const openBecomeAProjectMentorLink = () => {
    window.open(`https://docs.google.com/forms/d/e/1FAIpQLSfYwWOUWDMidNSejVKu_et0kbBhZszMZsA23k_BegBOnfk1Qw/viewform`);
  };

  return (
    <div>
      <NextHead />
      Become a Project Mentor
    </div>
  );
}

export default BecomeAProjectMentor;
