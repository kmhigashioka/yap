import React from 'react';
import { makeStyles, Typography, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { TitlePageWithSearchProps } from './types';

const useStyles = makeStyles(theme => ({
  bannerContainer: {
    backgroundColor: theme.palette.grey[200],
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    height: '136px',
    justifyContent: 'center',
    minWidth: 'calc(100vw - 320px)',
    padding: '24px',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    padding: '14px',
  },
  header: {
    display: 'inline',
  },
  searchContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    '&::before, &::after': { display: 'none' },
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '4px 8px',
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    borderRadius: '4px',
    backgroundColor: '#fff',
    width: '400px',
  },
  searchIconContainer: {
    margin: '0 8px 0 0',
  },
}));

const TitlePageWithSearch: React.FC<TitlePageWithSearchProps> = ({
  onSearch,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.bannerContainer}>
      <div className={classes.titleContainer}>
        <Typography className={classes.header} variant="h5">
          Category
        </Typography>
        <div className={classes.searchContainer}>
          <div className={classes.searchWrapper}>
            <SearchIcon classes={{ root: classes.searchIconContainer }} />
            <TextField
              placeholder="Search for anything"
              variant="standard"
              InputProps={{ className: classes.input }}
              fullWidth
              onChange={onSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitlePageWithSearch;
