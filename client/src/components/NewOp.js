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
            setOperation(operationSelected);
        } else {
            setOperation({
                concept: '',
                amount: '',
                date: '',
                type: ''
            });
        }
    }, [operationSelected]);

    const [ operation, setOperation ] = useState({
        concept: '',
        amount: '',
        date: '',
        type: ''
    });

    const { concept, amount, date, type } = operation;

    const onChange = e => {
        setOperation({
            ...operation,
            [e.target.name] : e.target.value
        })
    } 

    const onSubmit = e => {
        e.preventDefault();

        if(concept.trim() === '' || amount.trim() === '' || date.trim() === '' || type.trim() === '') {
            setError(true)
            return;
        }

        if(operationSelected === null) {
            addOperation(operation);            
        } else {
            editOperation(operation);
        }


        setOperation({
            concept: '',
            amount: '',
            date: '',
            type: ''
        });
        

        setOpen(false);
    }
    


    const classes = useStyles();
    return ( 
        <>
            <Container maxWidth="xs">                
                <Card>
                    <CardContent>
                        <Typography className={classes.typo} color="primary" component="h2" variant="h5">
                            Nueva Operación
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
                                helperText="Ingrese un nombre de operación"
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
                                helperText="Ingrese una cantidad numérica"
                                value={amount}
                                onChange={onChange}
                            />
                            <TextField
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
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                id="type"
                                name="type"
                                required
                                select
                                fullWidth
                                label="Tipo"
                                value={type}
                                onChange={onChange}
                                SelectProps={{
                                    native: true,
                                }}
                                helperText="Seleccione el tipo de opreción"
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