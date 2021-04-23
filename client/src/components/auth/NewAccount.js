import React, { useState, useContext, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AlertContext from '../../context/alerts/alertContext';
import AuthContext from  '../../context/authentication/authContext';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        {new Date().getFullYear()}{' '}{' '}
        <Link color="inherit" href="https://github.com/NicooRomero">
          github.com/NicooRomero
        </Link>     
      </Typography>
    );
}
  
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alerts: {
        width: '100%',
        '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

const NewAccount = (props) => {

    const alertaContext = useContext(AlertContext);
    const { alert, showAlert } = alertaContext;

    const authContext = useContext(AuthContext);
    const { msg, regUser, authenticated } = authContext;

    useEffect(() => {
        if(authenticated) {
            props.history.push('/transactions');
        }
  
        if(msg) {
          showAlert(msg.msg, msg.category)
        }
  
    }, [msg, authenticated, props.history]);

    const [ user, setUser ] = useState({
        name: '',
        email: '',
        password: '',
        repassword: ''
    });
    
    const { name, email, password, repassword } = user;
    
    const onChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }   
    
    const onSubmit = e => {
        e.preventDefault();

        if(name.trim() === '' || email.trim() === '' || password.trim() === '') {
            showAlert('Todos los campos son obligatorios', 'error')
            return;
        }
    
          if(password.length < 6){
            showAlert('Password debe contener mínimo 6 caracteres', 'error')
            return;
        }
    
          if(password !== repassword) {
            showAlert('Password deben ser iguales', 'error')
            return;
        }

        regUser({
            name,
            email,
            password
        });
    }

    const classes = useStyles();
    return ( 
        <Container maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}></Avatar>
                <Typography component="h1" variant="h5">
                    Crear Cuenta
                </Typography>
                <Card>
                    <CardContent>
                        { alert ? (<Alert severity={alert.category}>{alert.msg}</Alert>) : null }
                        <form className={classes.form} onSubmit={onSubmit} noValidate>
                            <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            type="text"
                            id="name"
                            label="Tu nombre"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={name}
                            onChange={onChange}
                            />

                            <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            type="email"
                            id="email"
                            label="Tu Email"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={onChange}
                            />

                            <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Tu Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={onChange}
                            />

                            <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="repassword"
                            label="Repetir Password"
                            type="password"
                            id="repassword"
                            autoComplete="current-password"
                            value={repassword}
                            onChange={onChange}
                            />

                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            >
                                Registrarme
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/" variant="body2">
                                        Iniciar Sesión
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
 
export default NewAccount;