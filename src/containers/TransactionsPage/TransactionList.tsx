import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {
  makeStyles,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';

import { ExpenseListProps } from './types';
import useHomePageContext from '../HomePage/useHomePageContext';
import AddTransactionDialog from './AddTransactionDialog';

const useStyles = makeStyles(theme => ({
  bannerContainer: {
    backgroundColor: theme.palette.grey[200],
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    height: '160px',
    justifyContent: 'flex-end',
    minWidth: 'calc(100vw - 320px)',
    padding: '12px',
  },
  titleContainer: {
    padding: '0 0 0 80px',
    position: 'relative',
  },
  fabContainer: {
    position: 'absolute',
    bottom: '-40px',
    left: '5px',
  },
  tableHeader: {
    color: theme.palette.text.hint,
  },
  hoverable: {
    cursor: 'pointer',
  },
}));

const TransactionList: React.FC<ExpenseListProps> = ({
  setSelectedExpense,
  selectedExpense,
  setSnackbarMessage,
}): React.ReactElement => {
  const classes = useStyles();
  const { expenses } = useHomePageContext();
  const [openAddExpenseDialog, setOpenAddExpenseDialog] = React.useState(false);

  const handleOpenAddExpenseDialog = (): void => {
    setOpenAddExpenseDialog(true);
  };

  const handleOnCloseDialog = (): void => {
    setOpenAddExpenseDialog(false);
  };

  return (
    <div>
      <div className={classes.bannerContainer}>
        <div className={classes.titleContainer}>
          <AddTransactionDialog
            open={openAddExpenseDialog}
            onClose={handleOnCloseDialog}
            setSnackbarMessage={setSnackbarMessage}
          />
          <Fab
            color="primary"
            classes={{ root: classes.fabContainer }}
            onClick={handleOpenAddExpenseDialog}
          >
            <AddIcon />
          </Fab>
          <Typography variant="h5">Expenses</Typography>
        </div>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell classes={{ root: classes.tableHeader }} />
            <TableCell classes={{ root: classes.tableHeader }}>
              Category
            </TableCell>
            <TableCell classes={{ root: classes.tableHeader }}>
              Amount
            </TableCell>
            <TableCell classes={{ root: classes.tableHeader }}>
              Description
            </TableCell>
            <TableCell classes={{ root: classes.tableHeader }}>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map(expense => (
            <TableRow
              key={expense.id}
              hover
              classes={{ root: classes.hoverable }}
              onClick={(): void => {
                setSelectedExpense(expense);
              }}
              selected={
                selectedExpense !== null
                  ? selectedExpense.id === expense.id
                  : false
              }
            >
              <TableCell component="th" scope="row" />
              <TableCell>{expense.category}</TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>{expense.date.toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionList;
