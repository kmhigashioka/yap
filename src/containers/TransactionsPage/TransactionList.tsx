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

import { TransactionsPageState } from './types';
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

const TransactionList: React.FC<TransactionsPageState> = ({
  setSelectedTransaction,
  selectedTransaction,
  setSnackbarMessage,
}): React.ReactElement => {
  const classes = useStyles();
  const { transactions } = useHomePageContext();
  const [
    openAddTransactionDialog,
    setOpenAddTransactionDialog,
  ] = React.useState(false);

  const handleOpenAddTransactionDialog = (): void => {
    setOpenAddTransactionDialog(true);
  };

  const handleOnCloseDialog = (): void => {
    setOpenAddTransactionDialog(false);
  };

  return (
    <div>
      <div className={classes.bannerContainer}>
        <div className={classes.titleContainer}>
          <AddTransactionDialog
            open={openAddTransactionDialog}
            onClose={handleOnCloseDialog}
            setSnackbarMessage={setSnackbarMessage}
          />
          <Fab
            color="primary"
            classes={{ root: classes.fabContainer }}
            onClick={handleOpenAddTransactionDialog}
          >
            <AddIcon />
          </Fab>
          <Typography variant="h5">Transactions</Typography>
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
          {transactions.map(transaction => (
            <TableRow
              key={transaction.id}
              hover
              classes={{ root: classes.hoverable }}
              onClick={(): void => {
                setSelectedTransaction(transaction);
              }}
              selected={
                selectedTransaction !== null
                  ? selectedTransaction.id === transaction.id
                  : false
              }
            >
              <TableCell component="th" scope="row" />
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionList;
