import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import { Divider } from '@material-ui/core';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import _ from 'lodash';
import axios from 'axios';

import NextHead from '../nextHead/NextHead';

import { getRootUrl } from '../../common/common';

const ROOT_URL = getRootUrl();

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Data {
  date_time: string;
  type: string;
  status: string;
  mock_interview_question: MockInterviewQuestion;
  action: string;
}

interface MockInterviewQuestion {
  mock_interview_question_id: number;
  question_title: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'date_time', numeric: false, disablePadding: false, label: 'When' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'mock_interview_question', numeric: false, disablePadding: false, label: 'Question' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'action', numeric: false, disablePadding: false, label: 'Action' },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }),
);

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Your upcoming interview schedule
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

function YourUpcomingInterviewSchedule(props: any): JSX.Element {
  const classes = useStyles();

  const [upcomingInterviewList, setUpcomingInterviewList] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);

  const [upcomingInterviewId, setUpcomingInterviewId] = useState(0);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('type');
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    getUpcomingInterviewList();
  }, []);

  const getUpcomingInterviewList = async () => {
    const token = localStorage.getItem('token');
    const users_id = localStorage.getItem('usersId');
    if (token) {
      let response = null;
      if (!users_id) {
        response = await axios.get(`${ROOT_URL}/upcoming-interview`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = await axios.get(`${ROOT_URL}/upcoming-interview`, {
          params: {
            users_id: users_id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (response) {
        const responseData = response.data;
        console.log('response.status = ', response.status);
        console.log('responseData = ', responseData);

        if (responseData.result) {
          setUpcomingInterviewList(responseData.result);
          setRows(responseData.result);
        }
      }
    }
  };

  const handleRescheduleButtonClick = (upcomingInterviewId: number) => {
    setRescheduleDialogOpen(true);
    setUpcomingInterviewId(upcomingInterviewId);
  };

  const handleCancelButtonClick = (upcomingInterviewId: number) => {
    setCancelDialogOpen(true);
    setUpcomingInterviewId(upcomingInterviewId);
  };

  const renderUpcomingListView = (upcomingInterviewList: any[]) => {
    // let resultView = (
    //   <div className="card">
    //     <div className="card-body">
    //       <h5 className="d-flex justify-content-center">
    //         <b>Your dont have upcoming interview</b>
    //       </h5>
    //     </div>
    //   </div>
    // );
    let resultView = null;

    if (!_.isEmpty(upcomingInterviewList)) {
      resultView = (
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table className={classes.table} aria-labelledby="tableTitle" size={'medium'} aria-label="enhanced table">
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, index: number) => {
                    const isItemSelected = isSelected(row.upcoming_interview_id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.upcoming_interview_id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                        </TableCell>
                        <TableCell align="left">
                          <div
                            className="d-flex justify-content-start"
                            style={{ display: 'flex', flexDirection: 'row' }}
                          >
                            <div className="mr-1">
                              <InsertInvitationIcon style={{ color: '#6f42c1' }} />
                            </div>
                            <div className="d-flex align-items-center">
                              <b>{row.date_time}</b>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell align="left">{row.type}</TableCell>
                        <TableCell align="left">
                          <span
                            className="hover-item pointer"
                            onClick={() => handleQuestionClick(row.mock_interview_question.mock_interview_question_id)}
                          >
                            {row.mock_interview_question.question_title}
                          </span>
                        </TableCell>
                        <TableCell align="left">
                          <div className="text-capitalize">{row.status}</div>
                        </TableCell>
                        <TableCell align="left">
                          <div
                            className="d-flex justify-content-start"
                            style={{ display: 'flex', flexDirection: 'row' }}
                          >
                            {renderCancelButton(row.status, row.upcoming_interview_id)}
                            {renderRescheduleButton(row.status, row.upcoming_interview_id)}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      );
    }

    return resultView;
  };

  const renderCancelButton = (status: string, upcomingInterviewId: number) => {
    let cancelButton = (
      <Button
        className="mr-3"
        variant="contained"
        color="primary"
        onClick={() => handleCancelButtonClick(upcomingInterviewId)}
      >
        Cancel
      </Button>
    );

    if (status === 'cancelled') {
      cancelButton = (
        <Button
          className="mr-3"
          variant="contained"
          color="primary"
          disabled={true}
          onClick={() => handleCancelButtonClick(upcomingInterviewId)}
        >
          Cancel
        </Button>
      );
    }

    return cancelButton;
  };

  const renderRescheduleButton = (status: string, upcomingInterviewId: number) => {
    let rescheduleButton = (
      <Button variant="contained" color="secondary" onClick={() => handleRescheduleButtonClick(upcomingInterviewId)}>
        Reschedule
      </Button>
    );

    if (status === 'cancelled') {
      rescheduleButton = (
        <Button
          variant="contained"
          color="secondary"
          disabled={true}
          onClick={() => handleRescheduleButtonClick(upcomingInterviewId)}
        >
          Reschedule
        </Button>
      );
    }

    return rescheduleButton;
  };

  const handleQuestionClick = (mockInterviewQuestionId: number) => {
    localStorage.setItem('mockInterviewQuestionId', mockInterviewQuestionId.toString());
    props.textEditorViewClick();
  };

  // const handleCancelDialogClose = () => {
  //   setCancelDialogOpen(false);
  // };

  const handleNoGoBackButtonClick = () => {
    setCancelDialogOpen(false);
  };

  const handleYesCancelButtonClick = (upcomingInterviewId: number) => {
    setCancelDialogOpen(false);
    cancelUpcomingInterview(upcomingInterviewId);
  };

  const handleRescheduleNoGoBackButtonClick = () => {
    setRescheduleDialogOpen(false);
  };

  const handleYesRescheduleButtonClick = () => {
    setRescheduleDialogOpen(false);
    props.rescheduleButtonClick();
  };

  const cancelUpcomingInterview = async (upcomingInterviewId: number) => {
    const token = localStorage.getItem('token');
    if (token) {
      const upcomingInterviewStatus = 'cancelled';
      const response = await axios.put(
        `${ROOT_URL}/upcoming-interview/cancel-upcoming-interview/${upcomingInterviewId}`,
        {
          upcomingInterviewStatus: upcomingInterviewStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response) {
        const responseData = response.data;
        console.log('response.status = ', response.status);
        console.log('responseData = ', responseData);

        if (response.status === 200) {
          getUpcomingInterviewList();
        }
      }
    }
  };

  const handleRequestSort = (_: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.upcoming_interview_id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (upcomingInterviewId: number) => selected.indexOf(upcomingInterviewId) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div>
      <NextHead />

      {renderUpcomingListView(upcomingInterviewList)}

      <Dialog
        open={cancelDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleCancelDialogClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ background: '#6f42c1' }} id="alert-dialog-slide-title">
          <div className="d-flex justify-content-center" style={{ color: 'white', fontWeight: 'bold' }}>
            CANCEL SESSION
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="my-3 p-4" style={{ color: 'black', fontSize: 20 }}>
            Are you sure want to cancel this session?
          </div>
          <Divider />
          <div className="my-3" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={() => handleNoGoBackButtonClick()}>
              No, go back
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleYesCancelButtonClick(upcomingInterviewId)}
            >
              Yes, cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={rescheduleDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleCancelDialogClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ background: '#6f42c1' }} id="alert-dialog-slide-title">
          <div className="d-flex justify-content-center" style={{ color: 'white', fontWeight: 'bold' }}>
            RESCHEDULE SESSION
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="my-3 p-4" style={{ color: 'black', fontSize: 20 }}>
            <div className="d-flex justify-content-center" style={{ display: 'flex', flexDirection: 'column' }}>
              <div>Are you sure to reschedule the session?</div>
            </div>
          </div>
          <Divider />
          <div className="my-3" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={() => handleRescheduleNoGoBackButtonClick()}>
              No, go back
            </Button>
            <Button variant="contained" color="secondary" onClick={() => handleYesRescheduleButtonClick()}>
              Yes, reschedule
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default YourUpcomingInterviewSchedule;
