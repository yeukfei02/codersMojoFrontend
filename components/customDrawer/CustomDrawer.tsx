import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import PostAddIcon from '@material-ui/icons/PostAdd';
import WorkIcon from '@material-ui/icons/Work';
import ChatIcon from '@material-ui/icons/Chat';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { pink } from '@material-ui/core/colors';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

import NextHead from '../nextHead/NextHead';
import TechBlogListView from '../techBlogListView/TechBlogListView';
import CreateTechBlog from '../createTechBlog/CreateTechBlog';
import JobBlog from '../jobBlog/JobBlog';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      fontFamily: 'Inter, sans-serif',
    },
    title: {
      flexGrow: 1,
    },
    pink: {
      color: theme.palette.getContrastText(pink[500]),
      backgroundColor: pink[500],
    },
  }),
);

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

function CustomDrawer(props: Props): JSX.Element {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [avatarText, setAvatarText] = useState('');

  const [currentPageValue, setCurrentPageValue] = useState('techBlog');

  const open = Boolean(anchorEl);

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider style={{ marginTop: '0.8em' }} />
      <List>
        <div onClick={() => handleTechBlogClick()}>
          <ListItem button>
            <ListItemIcon>
              <PostAddIcon />
            </ListItemIcon>
            <ListItemText primary="Tech blog" />
          </ListItem>
        </div>
        <div onClick={() => handleJobBoardClick()}>
          <ListItem button>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Job board" />
          </ListItem>
        </div>
        <div onClick={() => handleDiscussionBoardClick()}>
          <ListItem button>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Discussion board" />
          </ListItem>
        </div>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    getAvatarText();
  }, []);

  const getAvatarText = () => {
    const firstName = localStorage.getItem('firstName');
    if (firstName) {
      const avatarText = firstName.substring(0, 1).toUpperCase();
      setAvatarText(avatarText);
    }
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccountSettings = () => {
    setAnchorEl(null);

    setCurrentPageValue('accountSettings');
  };

  const handleReportABug = () => {
    setAnchorEl(null);

    setCurrentPageValue('reportABug');
  };

  const handleLogout = () => {
    setAnchorEl(null);

    localStorage.clear();
    location.href = '/';
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleDrawerOpen = () => {
    setMobileOpen(true);
  };

  const handleTechBlogClick = () => {
    setCurrentPageValue('techBlog');
    setMobileOpen(false);
  };

  const handleJobBoardClick = () => {
    setCurrentPageValue('jobBoard');
    setMobileOpen(false);
  };

  const handleDiscussionBoardClick = () => {
    setCurrentPageValue('discussionBoard');
    setMobileOpen(false);
  };

  const handleCreateTechBlog = () => {
    setCurrentPageValue('createTechBlog');
  };

  const renderCurrentPage = (currentPageValue: string) => {
    let currentPage = null;

    switch (currentPageValue) {
      case 'techBlog':
        currentPage = (
          <div>
            <div className="d-flex justify-content-end mx-3 mb-4">
              <button type="button" className="btn btn-primary btn" onClick={() => handleCreateTechBlog()}>
                Create tech blog
              </button>
            </div>
            <TechBlogListView />
          </div>
        );
        break;
      case 'createTechBlog':
        currentPage = <CreateTechBlog techBlogClick={() => handleTechBlogClick()} />;
        break;
      case 'jobBoard':
        currentPage = <JobBlog />;
        break;
      case 'discussionBoard':
        currentPage = <div>discussionBoard</div>;
        break;
      case 'accountSettings':
        currentPage = <div>accountSettings</div>;
        break;
      case 'reportABug':
        currentPage = <div>reportABug</div>;
        break;
      case 'yourAccount':
        currentPage = <div>yourAccount</div>;
        break;
      default:
        break;
    }

    return currentPage;
  };

  return (
    <div>
      <NextHead />

      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerOpen}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <a className="navbar-brand" href="/">
                <img src="/logo.png" width="200" height="65" alt="" loading="lazy" />
              </a>
            </Typography>

            <Avatar
              className={`${classes.pink} pointer`}
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              {avatarText}
            </Avatar>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleAccountSettings}>Account Settings</MenuItem>
              <MenuItem onClick={handleReportABug}>Report a Bug</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <SwipeableDrawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerClose}
              onOpen={handleDrawerOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </SwipeableDrawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <SwipeableDrawer
              classes={{
                paper: classes.drawerPaper,
              }}
              onClose={handleDrawerClose}
              onOpen={handleDrawerOpen}
              variant="permanent"
              open={mobileOpen}
            >
              {drawer}
            </SwipeableDrawer>
          </Hidden>
        </nav>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className="mx-3 my-4">{renderCurrentPage(currentPageValue)}</div>
        </main>
      </div>
    </div>
  );
}

export default CustomDrawer;
