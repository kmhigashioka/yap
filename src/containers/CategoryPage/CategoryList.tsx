import React from 'react';
import { makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';

import supportedCategories from './supportedCategory';
import { Category } from './types';

const useStyles = makeStyles({
  container: {
    padding: '24px',
  },
});

const CategoryList = (): React.ReactElement => {
  const classes = useStyles();

  const [categories, setCategories] = React.useState(supportedCategories);

  const handleSwitchChange = (category: Category, value: boolean): void => {
    setCategories(
      categories.map(mapCategory => {
        if (mapCategory.name === category.name) {
          return {
            ...mapCategory,
            display: value,
          };
        }
        return mapCategory;
      }),
    );
  };

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
            {categories.map(row => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <Switch
                    checked={row.display}
                    onChange={(_, value): void =>
                      handleSwitchChange(row, value)
                    }
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
