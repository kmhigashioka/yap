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
import { useTransactionsPageContext } from './TransactionsPageContext';
import AddTransactionDialog from './AddTransactionDialog';
import { TransactionType } from '../HomePage/types';
import useFetch from '../../utils/useFetch';
import { TransactionCategory } from '../CategoryPage/types';

const useStyles = makeStyles((theme) => ({
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
  const { transactions } = useTransactionsPageContext();
  const [
    openAddTransactionDialog,
    setOpenAddTransactionDialog,
  ] = React.useState(false);
  const [categories, setCategories] = React.useState<TransactionCategory[]>([]);
  const { requestWithToken } = useFetch();

  const handleOpenAddTransactionDialog = (): void => {
    setOpenAddTransactionDialog(true);
  };

  const handleOnCloseDialog = (): void => {
    setOpenAddTransactionDialog(false);
  };

  const typeDescription = {
    [TransactionType.Expense]: 'Expense',
    [TransactionType.Income]: 'Income',
  };

  React.useEffect(() => {
    const fetchTransactionCategories = async (): Promise<void> => {
      try {
        const data = await requestWithToken<TransactionCategory[]>(
          '/api/TransactionCategories',
        );
        setCategories(data);
      } catch (error) {
        setSnackbarMessage(error.message);
      }
    };
    fetchTransactionCategories();

  }, [requestWithToken, setSnackbarMessage]);

  return (
    <div>
      <div className={classes.bannerContainer}>
        <div className={classes.titleContainer}>
          <AddTransactionDialog
            open={openAddTransactionDialog}
            onClose={handleOnCloseDialog}
            setSnackbarMessage={setSnackbarMessage}
            categories={categories}
          />
          <Fab
            color="primary"
            classes={{ root: classes.fabContainer }}
            onClick={handleOpenAddTransactionDialog}
            data-testid="add-transaction"
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
            <TableCell classes={{ root: classes.tableHeader }}>Type</TableCell>
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
          {transactions.map((transaction) => (
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
              data-testid={`transaction-row-id-${transaction.id}`}
            >
              <TableCell component="th" scope="row" />
              <TableCell>{typeDescription[transaction.type]}</TableCell>
              <TableCell>{transaction.category.name}</TableCell>
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
