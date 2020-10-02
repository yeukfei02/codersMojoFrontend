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
import ScheduleIcon from '@material-ui/icons/Schedule';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ForwardIcon from '@material-ui/icons/Forward';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
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
import { makeStyles, useTheme, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import NextHead from '../nextHead/NextHead';
import StudyForInterview from '../studyForInterview/StudyForInterview';
import TakeAMockInterview from '../takeAMockInterview/TakeAMockInterview';
import TextEditorView from '../textEditorView/TextEditorView';
import InterviewOthers from '../interviewOthers/InterviewOthers';
import DiscussionBoard from '../discussionBoard/DiscussionBoard';
import CreatePosts from '../createPosts/CreatePosts';
import ApplyForJobs from '../applyForJobs/ApplyForJobs';
import TechSalaries from '../techSalaries/TechSalaries';
import CreateTechSalary from '../createTechSalary/CreateTechSalary';
import GetTechReferrals from '../getTechReferrals/GetTechReferrals';
import ParticipateInHackathons from '../participateInHackathons/ParticipateInHackathons';
import InviteYourFriends from '../inviteYourFriends/InviteYourFriends';
import WomenInvestorsCommunity from '../womenInvestorsCommunity/WomenInvestorsCommunity';
import CreateWomenInvestorsCommunity from '../createWomenInvestorsCommunity/CreateWomenInvestorsCommunity';
import BecomeAStudentTechAmbassador from '../becomeAStudentTechAmbassador/BecomeAStudentTechAmbassador';
import TechBlogListView from '../techBlogListView/TechBlogListView';
import CreateTechBlog from '../createTechBlog/CreateTechBlog';
import YourUpcomingInterviewSchedule from '../yourUpcomingInterviewSchedule/YourUpcomingInterviewSchedule';
import ViewPastInterviewPerformance from '../viewPastInterviewPerformance/ViewPastInterviewPerformance';
import AccountSettings from '../accountSettings/AccountSettings';
import ReportABug from '../reportABug/ReportABug';

const drawerWidth = 320;

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

const CustomListItem = withStyles({
  root: {
    '&:hover': {
      backgroundColor: '#DBC0F9',
      color: 'black',
    },
  },
})(ListItem);

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
          <CustomListItem button>
            <ListItemIcon>
              <ImportContactsIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Study for Interview" />
          </CustomListItem>
        </div>
        <div onClick={() => handleLeftSideMenuItemClick('takeAMockInterview')}>
          <CustomListItem button>
            <ListItemIcon>
              <LibraryBooksIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Take a Mock Interview" />
          </CustomListItem>
        </div>
        <div onClick={() => handleLeftSideMenuItemClick('discussionBoard')}>
          <CustomListItem button>
            <ListItemIcon>
              <ChatIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Discussion board" />
          </CustomListItem>
        </div>
        <div onClick={() => handleLeftSideMenuItemClick('participateInHackathons')}>
          <CustomListItem button>
            <ListItemIcon>
              <ComputerIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Participate in Hackathons" />
          </CustomListItem>
        </div>
        <div onClick={() => handleLeftSideMenuItemClick('applyForJobs')}>
          <CustomListItem button>
            <ListItemIcon>
              <WorkIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Apply for Jobs" />
          </CustomListItem>
        </div>
        <div onClick={() => handleLeftSideMenuItemClick('techSalaries')}>
          <CustomListItem button>
            <ListItemIcon>
              <MonetizationOnIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Tech Salaries" />
          </CustomListItem>
        </div>
        <div onClick={() => handleLeftSideMenuItemClick('getTechReferrals')}>
          <CustomListItem button>
            <ListItemIcon>
              <ForwardIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Get Tech Referrals" />
          </CustomListItem>
        </div>
        <div onClick={() => handleLeftSideMenuItemClick('becomeAStudentTechAmbassador')}>
          <CustomListItem button>
            <ListItemIcon>
              <EmojiPeopleIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Become a Student/Company Ambassador" />
          </CustomListItem>
        </div>
        <div onClick={() => handleLeftSideMenuItemClick('techBlog')}>
          <CustomListItem button>
            <ListItemIcon>
              <PostAddIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Tech blog" />
          </CustomListItem>
        </div>
        <div onClick={() => handleLeftSideMenuItemClick('inviteYourFriends')}>
          <CustomListItem button>
            <ListItemIcon>
              <PeopleIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Invite your friends" />
          </CustomListItem>
        </div>
        <div onClick={() => handleLeftSideMenuItemClick('womenInvestorsCommunity')}>
          <CustomListItem button>
            <ListItemIcon>
              <SupervisedUserCircleIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Women Investors Community" />
          </CustomListItem>
        </div>
        <div onClick={() => handleLeftSideMenuItemClick('interviewOthers')}>
          <CustomListItem button>
            <ListItemIcon>
              <ChatIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Interview Others" />
          </CustomListItem>
        </div>
        <Divider />
        <div onClick={() => handleLeftSideMenuItemClick('yourUpcomingInterviewSchedule')}>
          <CustomListItem button>
            <ListItemIcon>
              <ScheduleIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Your Upcoming Interview Schedule" />
          </CustomListItem>
        </div>
        <div onClick={() => handleLeftSideMenuItemClick('viewPastInterviewPerformance')}>
          <CustomListItem button>
            <ListItemIcon>
              <VideoCallIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="View Past Interview Performance" />
          </CustomListItem>
        </div>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    setIcon();
    getAvatarText();
  }, []);

  useEffect(() => {
    setIcon();
  }, [currentPageValue]);

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

  const handleGotItButtonClick = () => {
    setCurrentPageValue('yourUpcomingInterviewSchedule');
  };

  const handleTextEditorViewClick = () => {
    setCurrentPageValue('textEditorView');
  };

  const handleCreatePostButtonClick = () => {
    setCurrentPageValue('createPosts');
  };

  const handleBackToDashBoardButtonClick = () => {
    setCurrentPageValue('studyForInterview');
  };

  const handleRescheduleButtonClick = () => {
    setCurrentPageValue('takeAMockInterview');
  };

  const handleCreateTechSalaryClick = () => {
    setCurrentPageValue('createTechSalary');
  };

  const handleJoinOurWomenInvestorNetWorkClick = () => {
    setCurrentPageValue('createWomenInvestorsCommunity');
  };

  const renderCurrentPage = (currentPageValue: string) => {
    let currentPage = null;

    switch (currentPageValue) {
      case 'studyForInterview':
        currentPage = <StudyForInterview />;
        break;
      case 'takeAMockInterview':
        currentPage = <TakeAMockInterview gotItClick={() => handleGotItButtonClick()} />;
        break;
      case 'textEditorView':
        currentPage = <TextEditorView backToDashBoardClick={() => handleBackToDashBoardButtonClick()} />;
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
      case 'techSalaries':
        currentPage = <TechSalaries createTechSalaryClick={() => handleCreateTechSalaryClick()} />;
        break;
      case 'createTechSalary':
        currentPage = <CreateTechSalary techSalariesClick={() => handleLeftSideMenuItemClick('techSalaries')} />;
        break;
      case 'getTechReferrals':
        currentPage = <GetTechReferrals />;
        break;
      case 'participateInHackathons':
        currentPage = <ParticipateInHackathons />;
        break;
      case 'inviteYourFriends':
        currentPage = <InviteYourFriends />;
        break;
      case 'womenInvestorsCommunity':
        currentPage = (
          <WomenInvestorsCommunity joinOurWomenInvestorNetWorkClick={() => handleJoinOurWomenInvestorNetWorkClick()} />
        );
        break;
      case 'createWomenInvestorsCommunity':
        currentPage = (
          <CreateWomenInvestorsCommunity
            womenInvestorsCommunityClick={() => handleLeftSideMenuItemClick('womenInvestorsCommunity')}
          />
        );
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
      case 'yourUpcomingInterviewSchedule':
        currentPage = (
          <YourUpcomingInterviewSchedule
            textEditorViewClick={() => handleTextEditorViewClick()}
            rescheduleButtonClick={() => handleRescheduleButtonClick()}
          />
        );
        break;
      case 'viewPastInterviewPerformance':
        currentPage = <ViewPastInterviewPerformance textEditorViewClick={() => handleTextEditorViewClick()} />;
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

  const renderView = (currentPageValue: string) => {
    let resultView = (
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
    );

    if (currentPageValue === 'textEditorView') {
      resultView = (
        <div className="m-4">
          <TextEditorView backToDashBoardClick={() => handleBackToDashBoardButtonClick()} />
        </div>
      );
    }

    return resultView;
  };

  return (
    <div>
      <NextHead />

      {renderView(currentPageValue)}
    </div>
  );
}

export default CustomDrawer;
