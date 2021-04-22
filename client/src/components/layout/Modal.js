import React, { useState } from 'react';
import NewOp from '../NewOp';
import AddBtn from './AddBtn';
import Operations from '../Operations';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: "inherit",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2),
    alignContent: "center"
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <NewOp setOpen={setOpen} />
    </div>
  );

  return (
    <div>
      <AddBtn setOpen={setOpen}   />
      <Operations setOpen={setOpen} />
      <Modal
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  );
}