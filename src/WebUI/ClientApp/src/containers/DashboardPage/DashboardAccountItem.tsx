import React from 'react';
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FormattedNumber } from 'react-intl';
import { DashboardAccountItemProps } from './types';
import PromptDialog from '../../components/PromptDialog';
import { useHomePageContext } from '../HomePage/HomePageContext';
import useFetch from '../../utils/useFetch';
import EditAccountDialog from './EditAccountDialog';

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: '4px',
    border: `1px solid ${theme.palette.secondary.light}`,
    margin: '0 16px 16px 0',
    minWidth: '300px',
  },
  header: {
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.main,
    borderTopLeftRadius: 'inherit',
    borderTopRightRadius: 'inherit',
    color: theme.palette.secondary.contrastText,
    display: 'flex',
    height: '64px',
    padding: '0 12px 0 24px',
    justifyContent: 'space-between',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '24px',
  },
  remainingBalanceText: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  moreVertIconButton: {
    color: theme.palette.secondary.contrastText,
  },
}));

const DashboardAccountItem: React.FC<DashboardAccountItemProps> = ({
  account,
  setSnackbarMessage,
}): React.ReactElement => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const [openEditAccountDialog, setOpenEditAccountDialog] = React.useState(
    false,
  );
  const { deleteAccount, editAccount } = useHomePageContext();
  const { requestWithToken } = useFetch();

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handlePromptDelete = (): void => {
    setOpen(true);
    setAnchorEl(null);
  };

  const handlePromptDialogClose = (): void => {
    setOpen(false);
  };

  const handlePromptDialogProceed = (): void => {
    setOpen(false);

    const deleteAsync = async (): Promise<void> => {
      try {
        setSnackbarMessage('Account deletion in progress.');
        const endpoint = `/api/Users/Accounts?accountId=${account.id}`;
        await requestWithToken<Account>(endpoint, {
          method: 'DELETE',
        });
        deleteAccount(account.id);
        setSnackbarMessage('Account successfully deleted.');
      } catch (error) {
        const errorResponse = await error.response.json();
        setSnackbarMessage(errorResponse.message);
      }
    };

    deleteAsync();
  };

  const handleCloseEditAccountDialog = (): void => {
    setOpenEditAccountDialog(false);
  };

  const handleClickOpenEditAccountDialog = (): void => {
    setOpenEditAccountDialog(true);
    setAnchorEl(null);
  };

  return (
    <li className={classes.container} data-testid={`account-${account.id}`}>
      <div className={classes.header}>
        <Typography>{account.name}</Typography>
        <IconButton
          classes={{ root: classes.moreVertIconButton }}
          onClick={handleClick}
          title="More Actions"
        >
          <MoreVert color="inherit" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClickOpenEditAccountDialog}>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </MenuItem>
          <MenuItem onClick={handlePromptDelete}>
            <ListItemIcon>
              <DeleteForever fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
        </Menu>
        <PromptDialog
          open={open}
          onClose={handlePromptDialogClose}
          onProceed={handlePromptDialogProceed}
          title={`Delete ${account.name}?`}
          contentText="This is an irreversible action. Do you want to proceed?"
        />
        <EditAccountDialog
          open={openEditAccountDialog}
          onClose={handleCloseEditAccountDialog}
          account={account}
          editAccount={editAccount}
          setSnackbarMessage={setSnackbarMessage}
        />
      </div>
      <div className={classes.body}>
        <Typography variant="subtitle2" color="textSecondary">
          Remaining Balance
        </Typography>
        <Typography className={classes.remainingBalanceText}>
          ₱ <FormattedNumber value={account.balance} />
        </Typography>
      </div>
    </li>
  );
};

export default DashboardAccountItem;
