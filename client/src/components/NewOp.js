import React, { useState, useContext, useEffect } from 'react';
import operationContext from '../context/operations/operationContext';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

const options = [
    {
      value: "unselect",
      label: 'Seleccionar',
    },
    {
      value: 'ingreso',
      label: 'Ingreso',
    },
    {
      value: 'egreso',
      label: 'Egreso',
    }
  ];

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    typo: {
        fontWeight: 700
    }
}));

const NewOp = ({setOpen}) => {

    const operationsContext = useContext(operationContext);
    const { operationSelected, addOperation, editOperation } = operationsContext;

    const [ error, setError ] = useState(false);

    useEffect(() => {
        if(operationSelected !== null) {
            setTransaction(operationSelected);
        } else {
            setTransaction({
                concept: '',
                amount: '',
                // date: '',
                operation: ''
            });
        }
    }, [operationSelected]);

    const [ transaction, setTransaction ] = useState({
        concept: '',
        amount: '',
        // date: '',
        operation: ''
    });

    const { concept, amount, operation } = transaction;

    const onChange = e => {
        setTransaction({
            ...transaction,
            [e.target.name] : e.target.value
        })
    } 

    const onSubmit = e => {
        e.preventDefault();

        if(concept === '' || amount === '' || operation === '') {
            setError(true)
            return;
        }

        if(operationSelected === null) {
            addOperation(transaction);            
        } else {
            editOperation(transaction);
        }


        setTransaction({
            concept: '',
            amount: '',
            // date: '',
            operation: ''
        });
        

        setOpen(false);
    }

    console.log(transaction)
    


    const classes = useStyles();
    return ( 
        <>
            <Container maxWidth="xs">                
                <Card>
                    <CardContent>
                        <Typography className={classes.typo} color="primary" component="h2" variant="h5">
                            Nueva Operaci??n
                        </Typography>
                        { error ? <Alert severity="error">Error! Todos los campos son obligatorios</Alert> : null }
                        <form className={classes.form} noValidate onSubmit={onSubmit} >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="text"
                                id="concept"
                                label="Concepto"
                                name="concept"
                                autoComplete="concept"
                                autoFocus
                                helperText="Ingrese un nombre de operaci??n"
                                value={concept}
                                onChange={onChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="number"
                                id="amount"
                                label="Monto"
                                name="amount"
                                autoComplete="amount"
                                helperText="Ingrese una cantidad num??rica"
                                value={amount}
                                onChange={onChange}
                            />
                            {/* <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="date"
                                id="date"
                                name="date"
                                autoComplete="date"
                                helperText="Seleccione una fecha"
                                value={date}
                                onChange={onChange}
                            /> */}
                            <TextField
                                variant="outlined"
                                margin="normal"
                                id="operation"
                                name="operation"
                                required
                                select
                                fullWidth
                                label="Tipo"
                                value={operation}
                                onChange={onChange}
                                SelectProps={{
                                    native: true,
                                }}
                                helperText="Seleccione el tipo de opreci??n"
                                >
                                {options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                    {option.label}
                                    </option>
                                ))}
                            </TextField>
                        
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                >
                                    Enviar
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </>
     );
}
 
export default NewOp;