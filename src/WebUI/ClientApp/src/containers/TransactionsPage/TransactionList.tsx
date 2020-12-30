import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {
  IconButton,
  makeStyles,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { TransactionsPageState } from './types';
import { useTransactionsPageContext } from './TransactionsPageContext';
import AddTransactionDialog from './AddTransactionDialog';
import { Account, TransactionType } from '../HomePage/types';
import useFetch from '../../utils/useFetch';
import { TransactionCategory } from '../CategoryPage/types';
import Empty from '../../components/Empty';
import DeleteTransactionDialog from './DeleteTransactionDialog';
import { useHomePageContext } from '../HomePage/HomePageContext';

const useStyles = makeStyles((theme) => ({
  bannerContainer: {
    backgroundColor: theme.palette.grey[200],
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    height: '160px',
    justifyContent: 'flex-end',
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
  placeholderText: {
    position: 'absolute',
    bottom: '60px',
  },
  tableContainer: {
    width: '100%',
    overflowX: 'auto',
  },
  actionButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const TransactionList: React.FC<TransactionsPageState> = ({
  setSelectedTransaction,
  selectedTransaction,
  setSnackbarMessage,
}): React.ReactElement => {
  const classes = useStyles();
  const { deleteTransaction, transactions } = useTransactionsPageContext();
  const { updateAccountBalance } = useHomePageContext();
  const [
    openAddTransactionDialog,
    setOpenAddTransactionDialog,
  ] = React.useState(false);
  const [categories, setCategories] = React.useState<TransactionCategory[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const { requestWithToken } = useFetch();

  const handleOpenAddTransactionDialog = (): void => {
    setOpenAddTransactionDialog(true);
  };

  const handleOnCloseDialog = (): void => {
    setOpenAddTransactionDialog(false);
  };

  const handleOpenDeleteTransactionDialog = (): void => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = (): void => {
    setOpenDeleteDialog(false);
  };

  const handleProceedDeleteDialog = (): void => {
    if (!selectedTransaction) {
      return;
    }
    const requestDeleteTransaction = async (): Promise<void> => {
      try {
        const data = await requestWithToken<Account>(
          `/api/users/transactions/${selectedTransaction.id}`,
          {
            method: 'delete',
          },
        );
        deleteTransaction(selectedTransaction.id);
        setOpenDeleteDialog(false);
        setSelectedTransaction(null);
        setSnackbarMessage('Transaction successfully deleted.');
        updateAccountBalance(data.id, data.balance);
      } catch (error) {
        const errorResponse = await error.response.json();
        setSnackbarMessage(errorResponse.message);
      }
    };
    requestDeleteTransaction();
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

  React.useEffect(() => {
    if (!openDeleteDialog) {
      setSelectedTransaction(null);
    }
  }, [openDeleteDialog, setSelectedTransaction]);

  return (
    <>
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
      {transactions.length > 0 ? (
        <div className={classes.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell classes={{ root: classes.tableHeader }} />
                <TableCell classes={{ root: classes.tableHeader }}>
                  Type
                </TableCell>
                <TableCell classes={{ root: classes.tableHeader }}>
                  Category
                </TableCell>
                <TableCell classes={{ root: classes.tableHeader }}>
                  Amount
                </TableCell>
                <TableCell classes={{ root: classes.tableHeader }}>
                  Description
                </TableCell>
                <TableCell classes={{ root: classes.tableHeader }}>
                  Date
                </TableCell>
                <TableCell
                  classes={{ root: classes.tableHeader }}
                  align="center"
                >
                  Action
                </TableCell>
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
                  data-testid={`transaction-row-id-${transaction.id}`}
                >
                  <TableCell component="th" scope="row" />
                  <TableCell>{typeDescription[transaction.type]}</TableCell>
                  <TableCell>{transaction.category.name}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
                  <TableCell align="center">
                    <div className={classes.actionButtonContainer}>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={handleOpenDeleteTransactionDialog}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Empty
          label={
            <Typography className={classes.placeholderText} variant="body1">
              There are no transactions.
            </Typography>
          }
        />
      )}
      <DeleteTransactionDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onProceed={handleProceedDeleteDialog}
      />
    </>
  );
};

export default TransactionList;
