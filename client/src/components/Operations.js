import React, { useContext, useEffect } from 'react';
import operationContext from '../context/operations/operationContext';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Swal from 'sweetalert2';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  btn: {
    marginRight: "10px"
  }
});

export default function Operations({setOpen}) {

  const operationsContext = useContext(operationContext);
  const { operations, deletOperation, selectedOperation, getOperation } = operationsContext;

  useEffect(() => {
    getOperation()
  }, []);

  const operationDelete = id => {
    Swal.fire({
      title: 'Estas Seguro?',
      text: "No podras revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!'
    }).then((result) => {
      console.log(result)
      if (result.value) {
        Swal.fire(
          'Eliminado!',
          'Acción realizada con éxito',
          'success'
        )
        deletOperation(id);
      }
    })
    
  }

  const operationSelected = transaction => {    
    selectedOperation(transaction);
    setOpen(true);
    
  }

  const classes = useStyles();

  return (
    <Container>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                    <StyledTableCell>Concepto</StyledTableCell>
                    <StyledTableCell align="center" >Monto</StyledTableCell>
                    <StyledTableCell align="center" >Fecha</StyledTableCell>
                    <StyledTableCell align="center" >Tipo</StyledTableCell>
                    <StyledTableCell align="center" >Acción</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
              {operations.map((transaction) => (
                  <StyledTableRow key={transaction._id}>
                  <StyledTableCell component="th" scope="row">
                      {transaction.concept}
                  </StyledTableCell>
                    <StyledTableCell align="center" >$ {transaction.amount}</StyledTableCell>
                    <StyledTableCell align="center" >{transaction.date}</StyledTableCell>
                    <StyledTableCell align="center" >{transaction.operation}</StyledTableCell>
                    <StyledTableCell align="center" >
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                        className={classes.btn}
                        onClick={() => operationSelected(transaction)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        onClick={() => operationDelete(transaction._id)}
                        
                      >
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
              ))}
              </TableBody>
          </Table>
        </TableContainer>
    </Container>
  );
}