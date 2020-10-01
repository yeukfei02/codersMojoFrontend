import React, { useEffect, useState } from 'react';
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
  title: string;
  type: string;
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
  { id: 'company', numeric: true, disablePadding: false, label: 'Company' },
  { id: 'title', numeric: true, disablePadding: false, label: 'Title' },
  { id: 'type', numeric: true, disablePadding: false, label: 'Type' },
  { id: 'location', numeric: true, disablePadding: false, label: 'Location' },
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
          Jobs
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

function ApplyForJobs(): JSX.Element {
  const classes = useStyles();

  // const [countryList, setCountryList] = useState<any[]>([]);

  const [selectedTypeList, setSelectedTypeList] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<any>(null);

  const [selectedDepartmentList, setSelectedDepartmentList] = useState<any[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);

  const [selectedLocationList, setSelectedLocationList] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const [type, setType] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');

  const [jobsList, setJobsList] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('company');
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    // getCountryList();

    getSelectedTypeList();

    getJobsList(type, department, location);
  }, []);

  useEffect(() => {
    if (jobsList) {
      getSelectedDepartmentList(jobsList);
      getSelectedLocationList(jobsList);
    }
  }, [jobsList]);

  // const getCountryList = async () => {
  //   const response = await fetch(`/api/country`);
  //   if (response) {
  //     const responseData = await response.json();
  //     console.log('response.status = ', response.status);
  //     console.log('responseData = ', responseData);

  //     if (responseData) {
  //       setCountryList(responseData.result.result);
  //     }
  //   }
  // };

  const getSelectedTypeList = () => {
    const typeList = [
      {
        label: 'Full Time',
        value: 'Full Time',
      },
      {
        label: 'Part Time',
        value: 'Part Time',
      },
      {
        label: 'Contract',
        value: 'Contract',
      },
      {
        label: 'Remote',
        value: 'Remote',
      },
    ];
    setSelectedTypeList(typeList);
  };

  const getSelectedDepartmentList = (jobsList: any[]) => {
    if (jobsList) {
      const departmentList = jobsList.map((item: any, _: number) => {
        const obj = {
          label: item.title,
          value: item.title,
        };
        return obj;
      });
      setSelectedDepartmentList(departmentList);
    }
  };

  const getSelectedLocationList = (jobsList: any[]) => {
    if (jobsList) {
      const formateedLocationList = jobsList.map((item: any, _: number) => {
        const obj = {
          label: item.location,
          value: item.location,
        };
        return obj;
      });
      const filteredLocationList = _.uniqBy(formateedLocationList, 'label');
      setSelectedLocationList(filteredLocationList);
    }
  };

  const handleTypeDropdownChange = (selectedType: any) => {
    if (selectedType) {
      setSelectedType(selectedType);
      setType(selectedType.value);
    } else {
      setSelectedType(null);
      setType('');
    }
  };

  const handleDepartmentDropdownChange = (selectedDepartment: any) => {
    if (selectedDepartment) {
      setSelectedDepartment(selectedDepartment);
      setDepartment(selectedDepartment.value);
    } else {
      setSelectedDepartment(null);
      setDepartment('');
    }
  };

  const handleLocationDropdownChange = (selectedLocation: any) => {
    if (selectedLocation) {
      setSelectedLocation(selectedLocation);
      setLocation(selectedLocation.value);
    } else {
      setSelectedLocation(null);
      setLocation('');
    }
  };

  const handleSearchButtonClick = (type: string, department: string, location: string) => {
    getJobsList(type, department, location);
  };

  const getJobsList = async (type: string, department: string, location: string) => {
    let response = null;

    const token = localStorage.getItem('token');
    if (!type && !department && !location) {
      if (token) {
        const queryString = new URLSearchParams({
          token: token,
        });
        response = await fetch(`/api/jobs?${queryString}`);
      }
    } else {
      if (token) {
        const queryString = new URLSearchParams({
          type: type,
          department: department,
          location: location,
          token: token,
        });
        response = await fetch(`/api/jobs?${queryString}`);
      }
    }

    if (response) {
      const responseData = await response.json();
      console.log('response.status = ', response.status);
      console.log('responseData = ', responseData);

      if (responseData) {
        setJobsList(responseData.result.result);
        setRows(responseData.result.result);
      }
    }
  };

  const handleCompanyNameClick = (companyUrl: string) => {
    window.open(companyUrl);
  };

  const handleRequestSort = (_: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.company);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div>
      <NextHead />

      <div className="mx-3">
        <div className="card">
          <div className="card-body">
            <h5 className="text-center my-1">Find a Job With CodersMojo</h5>
          </div>
        </div>

        <div className="container my-4">
          <div className="row">
            <div className="col-sm p-3">
              <Select
                styles={selectStyles}
                placeholder={'Select type'}
                value={selectedType}
                onChange={handleTypeDropdownChange}
                options={selectedTypeList}
                isClearable={true}
              />
            </div>
            <div className="col-sm p-3">
              <Select
                styles={selectStyles}
                placeholder={'Select department'}
                value={selectedDepartment}
                onChange={handleDepartmentDropdownChange}
                options={selectedDepartmentList}
                isClearable={true}
              />
            </div>
            <div className="col-sm p-3">
              <Select
                styles={selectStyles}
                placeholder={'Select location'}
                value={selectedLocation}
                onChange={handleLocationDropdownChange}
                options={selectedLocationList}
                isClearable={true}
              />
            </div>
            <div className="col-sm">
              <Button
                className="w-100 my-3"
                variant="contained"
                color="secondary"
                onClick={() => handleSearchButtonClick(type, department, location)}
              >
                Search
              </Button>
            </div>
          </div>
        </div>

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
                    const isItemSelected = isSelected(row.company);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.company)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                        </TableCell>
                        <TableCell align="right">
                          <span className="hover-item pointer" onClick={() => handleCompanyNameClick(row.company_url)}>
                            {row.company}
                          </span>
                        </TableCell>
                        <TableCell align="right">{row.title}</TableCell>
                        <TableCell align="right">{row.type}</TableCell>
                        <TableCell align="right">{row.location}</TableCell>
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
      </div>
    </div>
  );
}

export default ApplyForJobs;
