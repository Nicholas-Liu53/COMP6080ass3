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

export const NewListingButton = () => {
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

  const updateCreate = async (title, address, thumbnail, price, metadata ) => {
    const url = config.PREPORT_URL + config.BACKEND_PORT + '/listings/new';

    const bodyData = {
      title: title,
      address: address,
      thumbnail: thumbnail,
      price: price,
      metadata: metadata
    };

    try {
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

    } catch (err) {
      console.log(err);
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
        <DialogTitle id="scroll-dialog-title">Create a new listing</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <TextField
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="filled"
            onInput={event => setTitle(event.target.value)}
          />
          //! Figure out addresses:
          //!   1. Address Line
          //!   2. Locality/Suburb/City
          //!   3. State/Province
          //!   4. Country
          <TextField
            id="price"
            label="Price"
            type="number"
            InputLabelProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              shrink: true
            }}
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