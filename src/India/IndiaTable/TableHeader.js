import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const TableHeader = (props) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell key="name">
                    <TableSortLabel
                        active={props.orderBy === "name"}
                        direction={
                            props.orderBy === "name" ? props.order : "desc"
                        }
                        onClick={() => {
                            props.handleRequestToSort("name");
                        }}
                    >
                        Country
          </TableSortLabel>
                </TableCell>
                <TableCell key="totalCases" align="right">
                    <TableSortLabel
                        active={props.orderBy === "totalCases"}
                        direction={
                            props.orderBy === "totalCases" ? props.order : "desc"
                        }
                        onClick={() => {
                            props.handleRequestToSort("totalCases");
                        }}
                    >
                        Total Cases
          </TableSortLabel>
                </TableCell>
                <TableCell align="right" key="activeCases">
                    <TableSortLabel
                        active={props.orderBy === "activeCases"}
                        direction={
                            props.orderBy === "activeCases" ? props.order : "desc"
                        }
                        onClick={() => {
                            props.handleRequestToSort("activeCases");
                        }}
                    >Active Cases</TableSortLabel>
                </TableCell>
                <TableCell align="right" key="totalDeaths">
                    <TableSortLabel
                        active={props.orderBy === "totalDeaths"}
                        direction={
                            props.orderBy === "totalDeaths" ? props.order : "desc"
                        }
                        onClick={() => {
                            props.handleRequestToSort("totalDeaths");
                        }}>Total Deaths</TableSortLabel>
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default TableHeader;
