import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.background.paper,
      },
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    typo: {
        marginRight: "8px",
        color: "white"
    }
  }));

const AddBtn = ({setOpen}) => {

    const handleOpen = () => {
        setOpen(true);
      };
      
    const classes = useStyles();
    return ( 
        <>
            <Grid container
                direction="row"
                justify="flex-end"
                alignItems="center"
                className={classes.fab}
            >
                    
                    <Typography  className={classes.typo} variant="h6" color="inherit">
                        Registrar Operación
                    </Typography>
                    
                    
                    <Fab color="secondary" onClick={handleOpen} >
                        <AddIcon />
                    </Fab>
                    
            </Grid>
        </>
     );
}
 
export default AddBtn;
