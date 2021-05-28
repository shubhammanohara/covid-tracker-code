import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHeader from "./TableHeader";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from '@material-ui/core/TableFooter';

const useStyles = makeStyles({
    table: {
        minWidth: 600,
    },
});

const IndiaTable = (props) => {

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const [filter, setFilter] = useState("");

    const handleChange = (e) => setFilter(e.target.value);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const classes = useStyles();

    const search = (data) => {
        if (filter === "") return data
        else
            return data.filter(row => row.name.toLowerCase().includes(filter.toLowerCase()));
    }

    const rows = search(props.tableData)
    // const rows = [data.map((row)=>)]


    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

    const [order, setOrder] = useState("desc");
    const [orderBy, setOrderBy] = useState("totalCases");

    const handleRequestToSort = (columnName) => {
        const isDesc = (orderBy === columnName && order === "desc");
        setOrderBy(columnName);
        setOrder(isDesc ? "asc" : "desc");
    };

    const handleTableClick = (event) => {

        console.log(event.target.value)
    }

    return (
        <>
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
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHeader
                        orderBy={orderBy}
                        order={order}
                        handleRequestToSort={handleRequestToSort}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(
                                (row, index) => (
                                    <TableRow key={row.name} onClick={handleTableClick}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.totalCases} </TableCell>
                                        <TableCell align="right">{row.activeCases}</TableCell>
                                        <TableCell align="right">{row.totalDeaths}</TableCell>
                                    </TableRow>
                                )
                            )}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
};



export default IndiaTable
