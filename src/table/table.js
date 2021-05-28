import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
});

function CountryTable(props) {

  const [filter, setFilter] = useState("");
  const columns = [
    { field: 'name', headerName: 'Country', flex: 1 },
    { field: 'totalCases', headerName: 'Total Cases', flex: 1, align: "right" },
    {
      field: 'activeCases',
      headerName: 'Active Cases', flex: 1, align: "right"
    },
    {
      field: 'totalDeaths',
      headerName: 'Total Deaths', flex: 1, align: "right"
    },
  ];

  const handleChange = (e) => setFilter(e.target.value);
  const search = (data) => {
    if (filter === "") return data
    else
      return data.filter(row => row.name.toLowerCase().includes(filter.toLowerCase()));
  }

  const rows = search(props.tableData)

  // const rows = props.tableData


  const classes = useStyles();

  return (
    <div>
      <div style={{ height: 630, width: '100%' }}>

        <TextField
          id="filled-basic"
          label="Search Country"
          variant="filled"
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <DataGrid className={classes.table} rows={rows} columns={columns} pageSize={10} onRowSelected={item => props.country(item.data.name)} />


      </div>
    </div>
  )
}

export default CountryTable
