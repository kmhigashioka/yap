import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  makeStyles,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import EditOutlined from '@material-ui/icons/EditOutlined';
import { useFormState } from 'react-use-form-state';
import ExpensesPageContext from './ExpensesPageContext';
import { IExpensesPageProps, TExpense } from './types';

const useStyle = makeStyles(theme => ({
  actionsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
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
  dataContainer: {},
  expensesContainer: {
    display: 'flex',
    height: 'inherit',
  },
  expenseViewerBannerContainer: {
    backgroundColor: theme.palette.grey[300],
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    height: '160px',
    padding: '12px',
    justifyContent: 'space-between',
  },
  expenseViewerContainer: {
    borderLeft: `1px solid ${theme.palette.grey[500]}`,
    width: '320px',
  },
  expenseViewerDetailsContainer: {
    padding: '12px',
  },
  fabContainer: {
    position: 'absolute',
    bottom: '-40px',
    left: '5px',
  },
  hoverable: {
    cursor: 'pointer',
  },
  tableHeader: {
    color: theme.palette.text.hint,
  },
  titleContainer: {
    padding: '0 0 0 80px',
    position: 'relative',
  },
}));

const ExpensesPage: React.FC<IExpensesPageProps> = (): React.ReactElement => {
  const classes = useStyle();
  const [formState, { text }] = useFormState();
  const [selectedExpense, setSelectedExpense] = React.useState<TExpense | null>(
    null,
  );
  React.useEffect(() => {
    if (selectedExpense === null) {
      return;
    }
    const { setField } = formState;
    setField('amount', selectedExpense.amount);
    setField('date', selectedExpense.date);
    setField('description', selectedExpense.description);
  }, [selectedExpense, formState]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function createData(
    name: string,
    category: string,
    amount: number,
    description: string,
    date: string,
    id: number,
  ) {
    return { name, category, amount, description, date, id };
  }

  const rows = [
    createData('', 'Charges', 350.0, '', '10/22/2019', 1),
    createData('', 'Withdrawal', 1500, '', '10/22/2019', 2),
    createData('', 'Charges', 187, '', '10/20/2019', 3),
    createData('', 'Charges', 200, '', '09/30/2019', 4),
    createData('', 'Charges', 20, '', '09/30/2019', 5),
  ];

  return (
    <ExpensesPageContext.Provider value={{}}>
      <Helmet>
        <title>Expenses</title>
        <meta name="description" content="" />
      </Helmet>
      <div className={classes.expensesContainer}>
        <div>
          <div className={classes.bannerContainer}>
            <div className={classes.titleContainer}>
              <Fab color="primary" classes={{ root: classes.fabContainer }}>
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
                <TableCell classes={{ root: classes.tableHeader }}>
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow
                  key={row.id}
                  hover
                  classes={{ root: classes.hoverable }}
                  onClick={(): void => {
                    setSelectedExpense(row);
                  }}
                  selected={
                    selectedExpense !== null
                      ? selectedExpense.id === row.id
                      : false
                  }
                >
                  <TableCell component="th" scope="row" />
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className={classes.expenseViewerContainer}>
          <form>
            <div className={classes.expenseViewerBannerContainer}>
              {selectedExpense === null ? null : (
                <>
                  <div className={classes.actionsContainer}>
                    <IconButton>
                      <DeleteOutline />
                    </IconButton>
                    <IconButton>
                      <EditOutlined />
                    </IconButton>
                  </div>
                  <div>
                    <Typography>
                      {selectedExpense === null
                        ? '--'
                        : selectedExpense.category}
                    </Typography>
                  </div>
                </>
              )}
            </div>
            <div className={classes.expenseViewerDetailsContainer}>
              {selectedExpense === null ? null : (
                <>
                  <TextField
                    type="number"
                    margin="dense"
                    label="Amount"
                    fullWidth
                    disabled
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...text('amount')}
                  />
                  <TextField
                    type="text"
                    margin="dense"
                    label="Description"
                    fullWidth
                    disabled
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...text('description')}
                  />
                  <TextField
                    type="text"
                    margin="dense"
                    label="Date"
                    fullWidth
                    disabled
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...text('date')}
                  />
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </ExpensesPageContext.Provider>
  );
};

export default ExpensesPage;
