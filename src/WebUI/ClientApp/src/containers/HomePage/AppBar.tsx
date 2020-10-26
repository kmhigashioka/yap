import React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import { makeStyles, Typography, Popover } from '@material-ui/core';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import CategoryIcon from '@material-ui/icons/Category';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Create from '@material-ui/icons/Create';
import { useHistory } from 'react-router-dom';

import CreateNewAccountDialog from './CreateNewAccountDialog';
import { useHomePageContext } from './HomePageContext';

const useStyle = makeStyles({
  toolbarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  toolbarLeftContent: {},
  toolbarRightContent: {},
  toolbarAccountSelection: {
    color: '#fff',
    justifyContent: 'space-between',
    width: '300px',
  },
  avatarContainer: {
    margin: '0 10px 0 0',
  },
  iconButton: {
    color: '#fff',
  },
  accountSelectionContainer: {
    width: '300px',
  },
  createAccountContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 24px',
  },
  createIcon: {
    margin: '0 6px 0 0',
  },
  accountContainer: {
    justifyContent: 'flex-start',
    padding: '10px',
  },
});

const AppBar: React.FC = () => {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const open = Boolean(anchorEl);
  const [
    openCreateNewAccountDialog,
    setOpenCreateNewAccountDialog,
  ] = React.useState<boolean>(false);
  const {
    addAccount,
    setActiveAccount,
    activeAccount,
    accounts,
  } = useHomePageContext();
  const history = useHistory();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleCreateNewAccount = (): void => {
    setAnchorEl(null);
    setOpenCreateNewAccountDialog(true);
  };

  const handleCloseDialog = (): void => {
    setOpenCreateNewAccountDialog(false);
  };

  const handleNavigateTo = (path: string): void => {
    history.push(path);
  };

  return (
    <MuiAppBar position="sticky">
      <Toolbar classes={{ root: classes.toolbarContainer }}>
        <div className={classes.toolbarLeftContent}>
          <Tooltip title="Dashboard">
            <IconButton
              className={classes.iconButton}
              onClick={(): void => handleNavigateTo('/')}
              data-testid="navigation-button-dashboard"
            >
              <DashboardIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Transactions">
            <IconButton
              className={classes.iconButton}
              onClick={(): void => handleNavigateTo('/transactions')}
              data-testid="navigation-button-transactions"
            >
              <LibraryBooks />
            </IconButton>
          </Tooltip>
          <Tooltip title="Category">
            <IconButton
              className={classes.iconButton}
              onClick={(): void => handleNavigateTo('/category')}
              data-testid="navigation-button-category"
            >
              <CategoryIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className={classes.toolbarRightContent}>
          <Button
            classes={{ root: classes.toolbarAccountSelection }}
            onClick={handleClick}
          >
            <Avatar classes={{ root: classes.avatarContainer }}>
              {activeAccount ? activeAccount.abbreviation : 'A'}
            </Avatar>
            <Typography noWrap variant="body1" color="inherit">
              {activeAccount ? activeAccount.name : 'ALL'}
            </Typography>
            <KeyboardArrowDown />
          </Button>
          <Popover
            classes={{ paper: classes.accountSelectionContainer }}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            {accounts.length > 0 ? (
              <>
                <Button
                  fullWidth
                  className={classes.accountContainer}
                  onClick={(): void => setActiveAccount(null)}
                >
                  <Avatar classes={{ root: classes.avatarContainer }}>A</Avatar>
                  <Typography noWrap>ALL</Typography>
                </Button>
                <Divider />
              </>
            ) : null}
            {accounts.map((account) => (
              <React.Fragment key={account.id}>
                <Button
                  fullWidth
                  className={classes.accountContainer}
                  onClick={(): void => setActiveAccount(account)}
                >
                  <Avatar classes={{ root: classes.avatarContainer }}>
                    {account.abbreviation}
                  </Avatar>
                  <Typography noWrap>{account.name}</Typography>
                </Button>
                <Divider />
              </React.Fragment>
            ))}
            <Button
              fullWidth
              className={classes.createAccountContainer}
              onClick={handleCreateNewAccount}
            >
              <Create className={classes.createIcon} />
              <Typography variant="subtitle2">CREATE NEW ACCOUNT</Typography>
            </Button>
          </Popover>
        </div>
      </Toolbar>
      <CreateNewAccountDialog
        open={openCreateNewAccountDialog}
        onClose={handleCloseDialog}
        addAccount={addAccount}
      />
    </MuiAppBar>
  );
};

export default AppBar;
