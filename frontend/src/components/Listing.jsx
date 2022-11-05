import React from 'react';

import { Context, useContext } from './../context';
import config from './../config.json';

import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

// Imports for Dialogue
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

//* ********************************************************************** */
//*    Feature Set 2 - Creating & Editing & Publishing a Hosted Listing    */
//* ********************************************************************** */

export const ListingCard = () => {
  const { getters, setters } = useContext(Context);

}

export const ListingScreen = () => {
  const { getters, setters } = useContext(Context);

}

export const NewEditListingButton = ({ editId }) => {
  const { getters } = useContext(Context);

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  // States for the attributes of the listing to be added/edited
  const [title, setTitle] = React.useState('');
  const [address, setAddress] = React.useState({});
  const [thumbnail, setThumbnail] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [metadata, setMetadata] = React.useState({});

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateCreate = async (listingId, title, address, thumbnail, price, metadata ) => {
    if (listingId) {
      const url = config.PREPORT_URL + config.BACKEND_PORT + '/listings/' + String(listingId);

      const bodyData = {
        title: title,
        address: address,
        thumbnail: thumbnail,
        price: price,
        metadata: metadata
      };

      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + getters.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      });

      const data = await res.json();
      console.log(data);

    } else {
      const url = config.PREPORT_URL + config.BACKEND_PORT + '/listings/new';

      const bodyData = {
        title: title,
        address: address,
        thumbnail: thumbnail,
        price: price,
        metadata: metadata
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + getters.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      });

      const data = await res.json();
      console.log(data);

    }
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Button
        onClick={handleClickOpen('paper')}
        endIcon={<AddLocationAltIcon />} 
      >
        Create New Listing
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={updateCreate}
            value={ editId ? 'Update' : 'Create' }
          />
        </DialogActions>
      </Dialog>
    </>
  );
}