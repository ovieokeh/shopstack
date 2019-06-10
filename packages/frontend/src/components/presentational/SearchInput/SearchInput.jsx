import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});

const SearchInput = props => {
  const { placeholder, value, onChange, onSearchSubmit } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputProps={{ 'aria-label': placeholder }}
        fullWidth
      />
      <IconButton onClick={onSearchSubmit} className={classes.iconButton} aria-label="Search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
