import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
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

import NextHead from '../nextHead/NextHead';

const selectStyles = {
  container: (base: any, state: any) => ({
    ...base,
    opacity: state.isDisabled ? '.5' : '1',
    backgroundColor: 'transparent',
    zIndex: '999',
  }),
};

interface Data {
  company: string;
  jobTitle: string;
  description: string;
  totalCompensation: string;
  location: string;
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
  { id: 'company', numeric: false, disablePadding: false, label: 'Company' },
  { id: 'jobTitle', numeric: false, disablePadding: false, label: 'Job Title' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'totalCompensation', numeric: false, disablePadding: false, label: 'Total Compensation' },
  { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
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
          Tech salary
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

function TechSalaries(props: any): JSX.Element {
  const classes = useStyles();

  const [selectedCompanyList, setSelectedCompanyList] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  const [selectedJobTitleList, setSelectedJobTitleList] = useState<any[]>([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState<any>(null);

  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  const [techSalaryList, setTechSalaryList] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('company');
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    getTechSalaryList(jobTitle, company);
  }, []);

  useEffect(() => {
    if (techSalaryList) {
      getSelectedCompanyList(techSalaryList);
      getSelectedJobTitleList(techSalaryList);
    }
  }, [techSalaryList]);

  const getSelectedCompanyList = (techSalaryList: any[]) => {
    let selectedCompanyList: any[] = [];

    if (techSalaryList) {
      selectedCompanyList = techSalaryList.map((item: any, _: number) => {
        const obj = {
          label: item.company,
          value: item.company,
        };
        return obj;
      });
    }

    const uniqSelectedCompanyList = _.uniqBy(selectedCompanyList, 'label');
    setSelectedCompanyList(uniqSelectedCompanyList);
  };

  const getSelectedJobTitleList = (techSalaryList: any[]) => {
    let selectedJobTitleList: any[] = [];

    if (techSalaryList) {
      selectedJobTitleList = techSalaryList.map((item: any, _: number) => {
        const obj = {
          label: item.job_title,
          value: item.job_title,
        };
        return obj;
      });
    }

    const uniqSelectedJobTitleList = _.uniqBy(selectedJobTitleList, 'label');
    setSelectedJobTitleList(uniqSelectedJobTitleList);
  };

  const handleJobTitleDropdownChange = (selectedJobTitle: any) => {
    if (selectedJobTitle) {
      setSelectedJobTitle(selectedJobTitle);
      setJobTitle(selectedJobTitle.value);
    } else {
      setSelectedJobTitle(null);
      setJobTitle('');
    }
  };

  const handleCompanyDropdownChange = (selectedCompany: any) => {
    if (selectedCompany) {
      setSelectedCompany(selectedCompany);
      setCompany(selectedCompany.value);
    } else {
      setSelectedCompany(null);
      setCompany('');
    }
  };

  const handleSearchButtonClick = (jobTitle: string, company: string) => {
    getTechSalaryList(jobTitle, company);
  };

  const handleCreateTechSalaryButtonClick = () => {
    props.createTechSalaryClick();
  };

  const handleRequestSort = (_: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.tech_salary_id);
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

  const isSelected = (techSalaryId: number) => selected.indexOf(techSalaryId) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const getTechSalaryList = async (jobTitle: string, company: string) => {
    const token = localStorage.getItem('token');
    if (token) {
      let queryString = null;
      if (!jobTitle && !company) {
        queryString = new URLSearchParams({
          token: token,
        });
      } else {
        queryString = new URLSearchParams({
          jobTitle: jobTitle,
          company: company,
          token: token,
        });
      }

      const response = await fetch(`/api/tech-salary?${queryString}`);
      if (response) {
        const responseData = await response.json();
        console.log('response.status = ', response.status);
        console.log('responseData = ', responseData);

        if (response.status === 200) {
          setTechSalaryList(responseData.result.result);
          setRows(responseData.result.result);
        }
      }
    }
  };

  const renderTechSalaryListView = (techSalaryList: any[]) => {
    let techSalaryListView = null;

    if (!_.isEmpty(techSalaryList)) {
      techSalaryListView = (
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
                    const isItemSelected = isSelected(row.tech_salary_id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.tech_salary_id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                        </TableCell>
                        <TableCell align="left">{row.company}</TableCell>
                        <TableCell align="left">{row.job_title}</TableCell>
                        <TableCell align="left">{row.description}</TableCell>
                        <TableCell align="left">{row.total_compensation}</TableCell>
                        <TableCell align="left">{row.location}</TableCell>
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

    return techSalaryListView;
  };

  return (
    <div>
      <NextHead />

      <div className="mx-3">
        <div className="d-flex justify-content-end">
          <Button variant="contained" color="secondary" onClick={() => handleCreateTechSalaryButtonClick()}>
            Create Tech Salary
          </Button>
        </div>

        <div className="container my-4">
          <div className="row">
            <div className="col-sm p-3">
              <Select
                styles={selectStyles}
                placeholder={'Select company'}
                value={selectedCompany}
                onChange={handleCompanyDropdownChange}
                options={selectedCompanyList}
                isClearable={true}
              />
            </div>
            <div className="col-sm p-3">
              <Select
                styles={selectStyles}
                placeholder={'Select job title'}
                value={selectedJobTitle}
                onChange={handleJobTitleDropdownChange}
                options={selectedJobTitleList}
                isClearable={true}
              />
            </div>
            <div className="col-sm">
              <Button
                className="w-100 my-3"
                variant="contained"
                color="secondary"
                onClick={() => handleSearchButtonClick(jobTitle, company)}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {renderTechSalaryListView(techSalaryList)}
    </div>
  );
}

export default TechSalaries;
