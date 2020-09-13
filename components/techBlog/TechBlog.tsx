import React from 'react';
import { useRouter } from 'next/router';

import NextHead from '../nextHead/NextHead';
import TechBlogListView from '../techBlogListView/TechBlogListView';

function TechBlog(): JSX.Element {
  const router = useRouter();

  const handleWriteATechBlogClick = () => {
    router.push(`/login`);
  };

  const handleLoginOrSignupClick = () => {
    router.push(`/login`);
  };

  return (
    <div>
      <NextHead />

      <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="/">
          <img src="/logo_transparent.png" width="180" height="180" alt="" loading="lazy" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto"></ul>
          <form className="form-inline my-2 my-lg-0">
            <div onClick={() => handleWriteATechBlogClick()} className="mx-3 pointer hover-item">
              <small>Write a Tech Blog</small>
            </div>
            <div onClick={() => handleLoginOrSignupClick()} className="mx-3 pointer hover-item">
              <small>Login/Signup</small>
            </div>
          </form>
        </div>
      </nav>

      <TechBlogListView />
    </div>
  );
}

export default TechBlog;
