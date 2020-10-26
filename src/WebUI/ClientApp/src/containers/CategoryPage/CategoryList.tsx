import React from 'react';
import { makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';

import { CategoryListProps } from './types';

const useStyles = makeStyles({
  container: {
    padding: '24px',
  },
});

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
}): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Display</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((row) => (
              <TableRow
                key={row.name}
                data-testid={`category-row-name-${row.name}`}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <Switch
                    inputProps={{
                      'aria-label': row.name,
                    }}
                    checked={row.display}
                    disabled
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default CategoryList;
