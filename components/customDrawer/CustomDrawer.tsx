import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ComputerIcon from '@material-ui/icons/Computer';
import PeopleIcon from '@material-ui/icons/People';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
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
import { purple } from '@material-ui/core/colors';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import NextHead from '../nextHead/NextHead';
import StudyForInterview from '../studyForInterview/StudyForInterview';
import TakeAMockInterview from '../takeAMockInterview/TakeAMockInterview';
import InterviewOthers from '../interviewOthers/InterviewOthers';
import DiscussionBoard from '../discussionBoard/DiscussionBoard';
import CreatePosts from '../createPosts/CreatePosts';
import ApplyForJobs from '../applyForJobs/ApplyForJobs';
import ParticipateInHackathons from '../participateInHackathons/ParticipateInHackathons';
import InviteYourFriends from '../inviteYourFriends/InviteYourFriends';
import BecomeAStudentTechAmbassador from '../becomeAStudentTechAmbassador/BecomeAStudentTechAmbassador';
import TechBlogListView from '../techBlogListView/TechBlogListView';
import CreateTechBlog from '../createTechBlog/CreateTechBlog';
import AccountSettings from '../accountSettings/AccountSettings';
import ReportABug from '../reportABug/ReportABug';

const drawerWidth = 280;

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
    purple: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
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

  const [currentPageValue, setCurrentPageValue] = useState('studyForInterview');

  const open = Boolean(anchorEl);

  const drawer = (
    <div style={{ background: '#eaeff5', minHeight: '100vh' }}>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <div onClick={() => handleLeftSideMenuItemClick('studyForInterview')}>
          <ListItem button>
            <ListItemIcon>
              <ImportContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Study for Interview" />
          </ListItem>
        </div>
        <div onClick={() => handleLeftSideMenuItemClick('takeAMockInterview')}>
          <ListItem button>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Take a Mock Interview" />
          </ListItem>
        </div>
        <div onClick={() => handleLeftSideMenuItemClick('interviewOthers')}>
          <ListItem button>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Interview Others" />
          </ListItem>
        </div>
        <div onClick={() => handleLeftSideMenuItemClick('discussionBoard')}>
          <ListItem button>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Discussion board" />
          </ListItem>
        </div>
        <div onClick={() => handleLeftSideMenuItemClick('applyForJobs')}>
          <ListItem button>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Apply for Jobs" />
          </ListItem>
        </div>
        <div onClick={() => handleLeftSideMenuItemClick('participateInHackathons')}>
          <ListItem button>
            <ListItemIcon>
              <ComputerIcon />
            </ListItemIcon>
            <ListItemText primary="Participate in Hackathons" />
          </ListItem>
        </div>
        <div onClick={() => handleLeftSideMenuItemClick('inviteYourFriends')}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Invite your friends" />
          </ListItem>
        </div>
        <div onClick={() => handleLeftSideMenuItemClick('becomeAStudentTechAmbassador')}>
          <ListItem button>
            <ListItemIcon>
              <EmojiPeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Become a Student Tech Ambassador" />
          </ListItem>
        </div>
        <div onClick={() => handleLeftSideMenuItemClick('techBlog')}>
          <ListItem button>
            <ListItemIcon>
              <PostAddIcon />
            </ListItemIcon>
            <ListItemText primary="Tech blog" />
          </ListItem>
        </div>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    setIcon();
    getAvatarText();
  }, []);

  const setIcon = () => {
    const div = document.querySelector('.MuiPaper-root.MuiDrawer-paper > div > div');
    if (div) {
      const divChild = document.querySelector('.MuiPaper-root.MuiDrawer-paper > div > div')?.childNodes;

      if (divChild && divChild.length === 0) {
        const divContainer = document.createElement('div');
        divContainer.setAttribute('class', 'd-flex justify-content-center');

        const img = document.createElement('img');
        img.setAttribute('src', 'logo.png');
        img.setAttribute('width', '200');
        img.setAttribute('height', '65');

        divContainer.appendChild(img);

        if (div != null) {
          div.appendChild(divContainer);
        }
      }
    }
  };

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

  const handleLeftSideMenuItemClick = (currentPageValue: string) => {
    setCurrentPageValue(currentPageValue);
    setMobileOpen(false);
  };

  const handleCreateTechBlog = () => {
    setCurrentPageValue('createTechBlog');
  };

  const handleCreatePostButtonClick = () => {
    setCurrentPageValue('createPosts');
  };

  const renderCurrentPage = (currentPageValue: string) => {
    let currentPage = null;

    switch (currentPageValue) {
      case 'studyForInterview':
        currentPage = <StudyForInterview />;
        break;
      case 'takeAMockInterview':
        currentPage = <TakeAMockInterview />;
        break;
      case 'interviewOthers':
        currentPage = <InterviewOthers />;
        break;
      case 'discussionBoard':
        currentPage = <DiscussionBoard postsClick={() => handleCreatePostButtonClick()} />;
        break;
      case 'createPosts':
        currentPage = <CreatePosts discussionBoardClick={() => handleLeftSideMenuItemClick('discussionBoard')} />;
        break;
      case 'applyForJobs':
        currentPage = <ApplyForJobs />;
        break;
      case 'participateInHackathons':
        currentPage = <ParticipateInHackathons />;
        break;
      case 'inviteYourFriends':
        currentPage = <InviteYourFriends />;
        break;
      case 'becomeAStudentTechAmbassador':
        currentPage = <BecomeAStudentTechAmbassador />;
        break;
      case 'techBlog':
        currentPage = (
          <div>
            <div className="d-flex justify-content-end mx-3 mb-4">
              <Button variant="contained" color="secondary" onClick={() => handleCreateTechBlog()}>
                Create tech blog
              </Button>
            </div>
            <TechBlogListView />
          </div>
        );
        break;
      case 'createTechBlog':
        currentPage = <CreateTechBlog techBlogClick={() => handleLeftSideMenuItemClick('techBlog')} />;
        break;
      case 'accountSettings':
        currentPage = <AccountSettings />;
        break;
      case 'reportABug':
        currentPage = <ReportABug />;
        break;
      default:
        break;
    }

    return currentPage;
  };

  const renderAppBarIcon = () => {
    let appBarIcon = null;

    if (document.documentElement.clientWidth < 600) {
      appBarIcon = (
        <a className="navbar-brand" href="/">
          <img src="/logo.png" width="200" height="65" alt="" loading="lazy" />
        </a>
      );
    }

    return appBarIcon;
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
              {renderAppBarIcon()}
            </Typography>

            <Avatar
              className={`${classes.purple} pointer`}
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
