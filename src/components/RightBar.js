import {
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
} from "@material-ui/core";
import React from "react";

const RightBar = ({ mostDeaths, liveCases }) => {
  return (
    <Paper className="app__right">
      <Typography variant="h6">Total Death by Country</Typography>

      <Grid container spacing={2}>
        {mostDeaths.map((death, index) => {
          return (
            <Grid item key={index} md={4} xs={6}>
              <Paper variant="outlined">
                <Typography variant="subtitle1" color="primary">
                  {death[1]}
                </Typography>
                <Typography variant="body2">
                  {death[0].toLocaleString()}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <Typography variant="h6">Live Cases by Country</Typography>
      <TableCovid liveCases={liveCases} />
    </Paper>
  );
};

export default RightBar;

const TableCovid = ({ liveCases }) => {
  return (
    <TableContainer className="table">
      <Table size="small">
        <TableBody>
          {liveCases.map((item, index) => {
            const { active, country } = item;
            return (
              <TableRow key={index} className="table-row">
                <TableCell variant="head">{country}</TableCell>
                <TableCell>{active.toLocaleString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
