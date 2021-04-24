import React, { useState, useContext, useEffect } from 'react';
import Nav from './layout/Nav';
import AddBtn from './layout/AddBtn';
import Operations from './Operations';
import Modal from './layout/Modal';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import AuthContext from '../context/authentication/authContext';

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

const Transactions = () => {

  const authContext = useContext(AuthContext);
  const { userAuth } = authContext;

  useEffect(() => {
    userAuth();
  }, []);

    return ( 
        <>
        <Nav />
        {/* <Operations /> */}
        <AddBtn />
        <Modal />       

        <Box mt={8}>
            <Copyright />
        </Box>
        </>

    );
}
 
export default Transactions;