import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { getAlldata } from "../../actions/game";

const columns = [
  { id: "nickname", label: "Nickname", minWidth: 50, align: "center" },

  {
    id: "score",
    label: "Score",
    minWidth: 50,
    align: "center",
  },
  {
    id: "duration",
    label: "Time Taken",
    minWidth: 50,
    align: "center",
    format: (value) => {
      value = new Date(value);
      return value.toLocaleTimeString([], {
        timeZone: "UTC",
      });
    },
  },
];

const useStyles = makeStyles({
  root: {
    width: "50%",
    marginTop: "5rem",
    marginLeft: "25%",
  },
  container: {
    maxHeight: 440,
  },
});

const Admin_Table = ({ userdata, loading, getAlldata }) => {
  const classes = useStyles();

  useEffect(() => {
    getAlldata();
  }, [getAlldata]);
  console.log(userdata);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading
              ? userdata
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={userdata.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

Admin_Table.propTypes = {
  isAuthenticated: PropTypes.bool,
  getAlldata: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  userdata: state.users.userdata,
  loading: state.users.loading,
});

export default connect(mapStateToProps, { getAlldata })(Admin_Table);
