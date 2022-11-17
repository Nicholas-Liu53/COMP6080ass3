import React from 'react';

import { Context, useContext } from './../context';
import config from './../config.json';

import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
// import FormHelperText from '@mui/material/FormHelperText';
// import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';

import { useNavigate, useParams } from 'react-router-dom';

import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

// Imports for Dialogue
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import { ContactSupport } from '@mui/icons-material';

// Imports for Card
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';

//* ********************************************************************** */
//*    Feature Set 2 - Creating & Editing & Publishing a Hosted Listing    */
//* ********************************************************************** */

export const ListingCard = (props) => {
  const { listingId, ownListing } = props
  const { getters, setters } = useContext(Context);

  const t1 = new Date();
  const t2 = new Date(t1);
  t2.setDate(t2.getDate() + 1);

  const [listingDetails, setListingDetails] = React.useState({});

  const [open, setOpen] = React.useState(false);
  const [deleteState, setDeleteState] = React.useState(false);
  const [openListing, setOpenListing] = React.useState(false);

  const [openPub, setOpenPub] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const [publishState, setPublishState] = React.useState(false);
  const [availabilities, setAvailabilities] = React.useState([]);
  const [availabilitiesCopy, setAvailabilitiesCopy] = React.useState([]);
  const [startDate, setStartDate] = React.useState(t1);
  const [endDate, setEndDate] = React.useState(t2);
  const [activeAvailId, setActiveAvailId] = React.useState('');
  const [availCounter, setAvailCounter] = React.useState(2);
  const [anAvailability, setAnAvailability] = React.useState({
    availId: availCounter,
    start: t1.getDate(),
    end: t2.getDate()
  });

  const [viewListing, setViewListing] = React.useState(false);
  const [editListing, setEditListing] = React.useState(false);

  const [isFetching, setIsFetching] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseYes = () => {
    setOpen(false);
    setDeleteState(true);
  };

  const handleClickOpenPub = (scrollType) => () => {
    console.log('yay');
    setOpenPub(true);
    setScroll(scrollType);
  };

  const handleClosePub = () => {
    setOpenPub(false);
  };

  const handleCloseYesPub = () => {
    setPublishState(true);
  };

  const navigate = useNavigate();

  const getListingDetails = async () => {
    const url = config.PREPORT_URL + config.BACKEND_PORT + '/listings/' + listingId;

    try {
      setIsFetching(true);
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + getters.token,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      setListingDetails(data.listing);
      // console.log('getListingDetails fetch:', data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  }

  const getNumBeds = () => {
    let nBeds = 0;
    for (var i = 0; i < listingDetails.metadata.bedroomDeets.length; i++) {
      nBeds += (listingDetails.metadata.bedroomDeets[i].king + listingDetails.metadata.bedroomDeets[i].queen + listingDetails.metadata.bedroomDeets[i].double + listingDetails.metadata.bedroomDeets[i].single);
    }
    return nBeds;
  }

  React.useEffect(() => {
    getListingDetails();
  }, []);

  React.useEffect(() => {
    if (viewListing) {
      setters.setListingToBeViewed(listingId);
      navigate('/listing/' + String(listingId));
      setViewListing(false);
    }
  }, [viewListing]);

  React.useEffect(() => {
    if (editListing) {
      setters.setListingToBeViewed(listingId);
      navigate('/listing/edit/' + String(listingId))
      setEditListing(false);
    }
  }, [editListing]);

  const deleteListing = async () => {
    const url = config.PREPORT_URL + config.BACKEND_PORT + '/listings/' + listingId;

    try {
      await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + getters.token,
          'Content-Type': 'application/json'
        }
      });
      // navigate('/');
    } catch (err) {
      console.log(err);
    } finally {
      setters.setReRenderPls(!(getters.reRenderPls));
    }
  }

  React.useEffect(() => {
    if (deleteState) {
      deleteListing();
    }
  }, [deleteState]);

  const publishListing = async () => {
    const url = config.PREPORT_URL + config.BACKEND_PORT + '/listings/publish/' + listingId;

    const bodyData = {
      availability: availabilities
    }

    try {
      await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + getters.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      });
    } catch (err) {
      console.error(err);
    } finally {
      setters.setReRenderPls(!(getters.reRenderPls));
    }
  }

  React.useEffect(() => {
    if (publishState && availabilities.length > 0) {
      publishListing();
      setOpenPub(false);
    }
    setPublishState(false);
  }, [publishState])

  React.useEffect(() => {
    setAvailabilitiesCopy(availabilities);
  }, [availabilities])

  React.useEffect(() => {
    if (endDate - startDate > 0) {
      setAnAvailability({
        availId: activeAvailId,
        start: startDate,
        end: endDate
      })
    }
  }, [startDate, endDate])

  React.useEffect(() => {
    if (anAvailability) {
      const newAvailabities = availabilities.map(obj => {
        if (obj.availId === activeAvailId) {
          return anAvailability;
        }
        return obj;
      })
      setAvailabilities(newAvailabities);
    }
  }, [anAvailability])

  React.useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setAvailabilities([...availabilities, { availId: availCounter, start: today.getDate(), end: tomorrow.getDate() }])
  }, [availCounter])

  const unpublishListing = async () => {
    const url = config.PREPORT_URL + config.BACKEND_PORT + '/listings/unpublish/' + listingId;

    try {
      await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + getters.token,
          'Content-Type': 'application/json'
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setters.setReRenderPls(!(getters.reRenderPls));
    }
  }

  React.useEffect(() => {
    getListingDetails();
  }, [getters.reRenderPls])

  React.useEffect(() => {
    if (openListing) {
      navigate('/listing/' + listingId);
      setOpenListing(false);
    }
  }, [openListing])

  return (
    <Box
      sx={{
        margin: '1em 1em 1em 1em'
      }}
    >
      {!isFetching && listingDetails.title &&
        (
          listingDetails.title.includes(getters.searchTerm) || listingDetails.address.locality.includes(getters.searchTerm) ||
          listingDetails.address.addressLine1.includes(getters.searchTerm) || listingDetails.address.province.includes(getters.searchTerm)
        ) &&
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea
            onClick={() => {
              setOpenListing(true);
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={listingDetails.thumbnail}
              alt="Listing Thumbnail"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={ { width: '234px' } }>
                {listingDetails.title} --- rating here
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {listingDetails.metadata.propertyType}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {getNumBeds()} beds • {listingDetails.metadata.numBathrooms} bathrooms
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {listingDetails.reviews.length} reviews
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                ${listingDetails.price} per night
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            { !(listingDetails.published) && ownListing &&
              <Button
                size="small"
                color="primary"
                onClick={handleClickOpenPub(scroll)}
              >
                Publish
              </Button>
            }
            { listingDetails.published && ownListing &&
              <Button
                size="small"
                color="primary"
                onClick={unpublishListing}
              >
                Unpublish
              </Button>
            }
            { ownListing &&
              <Button
                size="small"
                color="primary"
                onClick={() => setEditListing(true)}
              >
                Edit
              </Button>
            }
            { ownListing &&
              <Button
                size="small"
                color="primary"
                onClick={handleClickOpen}
              >
                Delete
              </Button>
            }
          </CardActions>
        </Card>
      }
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Are you sure you want to delete?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This listing would be deleted permanently. You can only recreate it to bring it back.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleCloseYes}>Yes</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openPub}
        onClose={handleClosePub}
        scroll={scroll}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Set Availabilities'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            By publishing this listing, it becomes visible to other AirBrB users.
          </DialogContentText>
          <section id='setAvailabilitiesSection'>
            {
              availabilitiesCopy.map(avail => {
                return (
                  <Box key={avail.availId}>
                    <Stack>
                      <TextField
                        label="Start Date"
                        onChange={event => {
                          setActiveAvailId(avail.availId);
                          setStartDate(event.target.value);
                        }}
                        type="date"
                        variant="outlined"
                        InputProps={{
                          startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                      />
                      <TextField
                        label="End Date"
                        onChange={event => {
                          setActiveAvailId(avail.availId);
                          setEndDate(event.target.value);
                        }}
                        type="date"
                        variant="outlined"
                        InputProps={{
                          startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                      />
                    </Stack>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setAvailabilities(availabilities => availabilities.filter(a => a.availId !== avail.availId));
                      }}
                    >
                      Delete Availability
                    </Button>
                  </Box>
                );
              })
            }
          </section>
          <Button
            variant="contained"
            onClick={() => {
              setAvailCounter(availCounter + 1);
            }}
          >Add new availability</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePub}>Cancel</Button>
          <Button onClick={handleCloseYesPub}>Publish</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export const MyListingScreen = () => {
  const { getters } = useContext(Context);
  const [listingsList, setListingsList] = React.useState([]);
  const [listingsListCopy, setListingsListCopy] = React.useState([]);

  const getListingsList = async () => {
    const url = config.PREPORT_URL + config.BACKEND_PORT + '/listings';

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + getters.token,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      const unfilteredList = [...data.listings];
      const filteredList = unfilteredList.filter((listItem) => { console.log(listItem.owner, getters.loggedInEmail); return listItem.owner === getters.loggedInEmail; });
      console.log('unfilteredList:', unfilteredList);
      console.log('filteredList:', filteredList);
      setListingsList(filteredList.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    getListingsList();
  }, []);

  React.useEffect(() => {
    getListingsList();
  }, [getters.reRenderPls]);

  React.useEffect(() => {
    if (listingsList[0]) {
      setListingsListCopy(listingsList);
    }
  }, [listingsList]);

  return (
      <Box
        sx={{
          width: '100vw',
          display: 'grid',
          justifyContent: 'center',
          gridTemplateColumns: 'repeat(auto-fill, 300px)',
          marginTop: '30px'
        }}
      >
        {
          listingsListCopy.map((listingsListItem) => {
            return (<ListingCard key={listingsListItem.id} listingId={listingsListItem.id} ownListing={getters.loggedInEmail} />);
          })
        }
      </Box>
  );
}

export const EditListingScreen = () => {
  const { getters } = useContext(Context);
  const { listingId } = useParams();

  const navigate = useNavigate();

  const [listingDetails, setListingDetails] = React.useState({});

  const [isFetchingDetails, setIsFetchingDetails] = React.useState(true);
  const [isFetchingUpdate, setIsFetchingUpdate] = React.useState(true);

  const [cancelState, setCancelState] = React.useState(false);

  // States for the attributes of the listing to be added/edited
  const [thumbnail, setThumbnail] = React.useState('');

  const [title, setTitle] = React.useState('');

  const [addressLine1, setAddressLine1] = React.useState('');
  const [locality, setLocality] = React.useState('');
  const [province, setProvince] = React.useState('');
  const [postcode, setPostcode] = React.useState('');
  const [country, setCountry] = React.useState('');
  //! UPDATE THIS IN FETCH
  const [address, setAddress] = React.useState({
    addressLine1: addressLine1,
    locality: locality,
    province: province,
    postcode: postcode,
    country: country
  });

  const [price, setPrice] = React.useState(0);

  const [propertyType, setPropertyType] = React.useState('');
  const [numBathrooms, setNumBathrooms] = React.useState(0);
  //! This one is complicated
  const [bedroomCounter, setBedroomCounter] = React.useState(1);
  const [bedroomBeds, setBedroomBeds] = React.useState({
    bedroomId: 1,
    king: 0,
    queen: 0,
    double: 0,
    single: 0
  });
  const [newBedroomBeds, setNewBedroomBeds] = React.useState({
    bedroomId: 1,
    king: 0,
    queen: 0,
    double: 0,
    single: 0
  });
  const [bedroomDeets, setBedroomDeets] = React.useState([]);
  const [bedroomDeetsCopy, setBedroomDeetsCopy] = React.useState(bedroomDeets);
  const [activeBedroomId, setActiveBedroomId] = React.useState(-1);
  const [amenities, setAmenities] = React.useState('');
  //! UPDATE THIS IN FETCH
  const [metadata, setMetadata] = React.useState({
    propertyType: propertyType,
    numBathrooms: numBathrooms,
    bedroomDeets: bedroomDeets,
    amenities: amenities
  });

  const getListingDetails = async () => {
    const url = config.PREPORT_URL + config.BACKEND_PORT + '/listings/' + listingId;

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + getters.token,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      setListingDetails(data.listing);
      // console.log('getListingDetails fetch:', data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetchingDetails(false);
    }
  }

  React.useEffect(() => {
    getListingDetails();
  }, []);

  React.useEffect(() => {
    console.log('Bruh:', listingDetails);
    if (listingDetails.title) {
      setThumbnail(listingDetails.thumbnail);
      setTitle(listingDetails.title);
      setAddressLine1(listingDetails.address.addressLine1);
      setLocality(listingDetails.address.locality);
      setProvince(listingDetails.address.province);
      setPostcode(listingDetails.address.postcode);
      setCountry(listingDetails.address.country);
      setPrice(listingDetails.price);
      setPropertyType(listingDetails.metadata.propertyType);
      setNumBathrooms(listingDetails.metadata.numBathrooms);
      setBedroomDeets(listingDetails.metadata.bedroomDeets);
      setBedroomCounter(listingDetails.metadata.bedroomDeets.length + 1);
    }
  }, [listingDetails])

  React.useEffect(() => {
    // Set metadata
    setMetadata({
      propertyType: propertyType,
      numBathrooms: numBathrooms,
      bedroomDeets: bedroomDeets,
      amenities: amenities
    });
  }, [propertyType, numBathrooms, bedroomDeets, amenities]);

  React.useEffect(() => {
    // Set address
    setAddress({
      addressLine1: addressLine1,
      locality: locality,
      province: province,
      postcode: postcode,
      country: country
    });
  }, [addressLine1, locality, province, postcode, country]);

  const updateListingDetails = async () => {
    const url = config.PREPORT_URL + config.BACKEND_PORT + '/listings/' + listingId;

    const bodyData = {
      title: title,
      address: address,
      thumbnail: thumbnail,
      price: price,
      metadata: metadata
    };

    try {
      await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + getters.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetchingUpdate(false);
    }
  }

  React.useEffect(() => {
    if (!isFetchingUpdate) {
      navigate('/my-listings');
    }
  }, [isFetchingUpdate]);

  React.useEffect(() => {
    if (cancelState) {
      navigate('/');
    }
  }, [cancelState]);

  React.useEffect(() => {
    // console.log(bedroomDeets);
    setBedroomDeetsCopy(bedroomDeets);
  }, [bedroomDeets]);

  React.useEffect(() => {
    const newBedroomDeets = bedroomDeets.map(obj => {
      if (obj.bedroomId === activeBedroomId) {
        return bedroomBeds;
      }
      return obj;
    })
    setBedroomDeets(newBedroomDeets);
  }, [bedroomBeds]);

  React.useEffect(() => {
    if (bedroomCounter > 1) {
      setNewBedroomBeds({
        bedroomId: bedroomCounter,
        king: 0,
        queen: 0,
        double: 0,
        single: 0
      });
      setBedroomDeets(bedroomDeets => [...bedroomDeets, newBedroomBeds]);
    }
  }, [bedroomCounter]);

  return (
    <>
      {!isFetchingDetails &&
        <Box>
          {/* Thumbnail */}
          <img src={thumbnail} alt="Listing Thumbnail" />
          <Button
            variant="contained"
            component="label"
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={event => {
                fileToDataUrl(event.target.files[0]).then(dataUrl => { setThumbnail(dataUrl) })
              }}
            />
          </Button>
          {/* Title */}
          <FormControl
            id="title"
            type="text"
            fullWidth
            variant="filled"
            required
          >
            <InputLabel htmlFor="component-filled">Title</InputLabel>
            <FilledInput id="component-filled" value={title} onChange={event => setTitle(event.target.value)} />
          </FormControl>
          {/* Property Type */}
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            value={propertyType}
            onChange={event => setPropertyType(event.target.value)}
            helperText="Please select your property type"
            required
          >
            {properties.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          {/* 1. Address Line */}
          <TextField
            id="addressLine1"
            label="Address Line"
            type="text"
            fullWidth
            variant="standard"
            onInput= {event => setAddressLine1(event.target.value)}
            required
            value={addressLine1}
          />
          {/* 2. Locality/Suburb/City */}
          <TextField
            id="locality"
            label="Locality/Suburb/City"
            type="text"
            variant="outlined"
            onInput= {event => setLocality(event.target.value)}
            required
            value={locality}
          />
          {/* 3. State/Province */}
          <TextField
            id="province"
            label="State/Province"
            type="text"
            variant="outlined"
            onInput= {event => setProvince(event.target.value)}
            required
            value={province}
          />
          {/* 4. Postcode */}
          <TextField
            id="postcode"
            label="Postcode"
            type="text"
            variant="outlined"
            onInput= {event => setPostcode(event.target.value)}
            required
            value={postcode}
          />
          {/* 5. Country */}
          <Autocomplete
            id="country-select-demo"
            sx={{ width: 300 }}
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.label}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
            onInputChange={(event, newValue) => {
              // console.log(newValue.label)
              setCountry(newValue.label)
            }}
            required
            inputValue={country}
            value={country}
          />
          {/* Price */}
          <TextField
            id="price"
            label="Price (per night)"
            type="number"
            InputLabelProps={{
              startadornment: <InputAdornment position="start">$</InputAdornment>,
              shrink: true
            }}
            variant="standard"
            onChange={event => setPrice(event.target.value)}
            required
            value={price}
          />
          {/* Bathrooms */}
          <TextField
            id="numBathrooms"
            label="Bathrooms"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
            onChange={event => setNumBathrooms(event.target.value)}
            required
            value={numBathrooms}
          />
          {/* Bedrooms geeez */}
          <section id="bedroomsSection">
            {
              bedroomDeetsCopy.map(details => {
                // console.log(details);
                return (
                  //! THIS PART BREAKS
                  <Box key={details.bedroomId}>
                    <h5>Bedroom</h5>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        aria-label="decrementKing"
                        onClick={() => {
                          if (details.king > 0) {
                            setActiveBedroomId(details.bedroomId);
                            setBedroomBeds({
                              bedroomId: details.bedroomId,
                              king: details.king - 1,
                              queen: details.queen,
                              double: details.double,
                              single: details.single
                            });
                          }
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      { 'King beds: ' + details.king }
                      <IconButton
                        aria-label="incrementKing"
                        onClick={() => {
                          setActiveBedroomId(details.bedroomId);
                          const newBedroomBeds = {
                            bedroomId: details.bedroomId,
                            king: details.king + 1,
                            queen: details.queen,
                            double: details.double,
                            single: details.single
                          };
                          setBedroomBeds(newBedroomBeds);
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        aria-label="decrementQueen"
                        onClick={() => {
                          if (details.queen > 0) {
                            setActiveBedroomId(details.bedroomId);
                            setBedroomBeds({
                              bedroomId: details.bedroomId,
                              king: details.king,
                              queen: details.queen - 1,
                              double: details.double,
                              single: details.single
                            });
                          }
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      { 'Queen beds: ' + details.queen }
                      <IconButton
                        aria-label="incrementQueen"
                        onClick={() => {
                          setActiveBedroomId(details.bedroomId);
                          setBedroomBeds({
                            bedroomId: details.bedroomId,
                            king: details.king,
                            queen: details.queen + 1,
                            double: details.double,
                            single: details.single
                          });
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        aria-label="decrementDouble"
                        onClick={() => {
                          if (details.double > 0) {
                            setActiveBedroomId(details.bedroomId);
                            setBedroomBeds({
                              bedroomId: details.bedroomId,
                              king: details.king,
                              queen: details.queen,
                              double: details.double - 1,
                              single: details.single
                            });
                          }
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      { 'Double beds: ' + details.double }
                      <IconButton
                        aria-label="incrementDouble"
                        onClick={() => {
                          setActiveBedroomId(details.bedroomId);
                          setBedroomBeds({
                            bedroomId: details.bedroomId,
                            king: details.king,
                            queen: details.queen,
                            double: details.double + 1,
                            single: details.single
                          });
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        aria-label="decrementSingle"
                        onClick={() => {
                          if (details.single > 0) {
                            setActiveBedroomId(details.bedroomId);
                            setBedroomBeds({
                              bedroomId: details.bedroomId,
                              king: details.king,
                              queen: details.queen,
                              double: details.double,
                              single: details.single - 1
                            });
                          }
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      { 'Single beds: ' + details.single }
                      <IconButton
                        aria-label="incrementSingle"
                        onClick={() => {
                          setActiveBedroomId(details.bedroomId);
                          setBedroomBeds({
                            bedroomId: details.bedroomId,
                            king: details.king,
                            queen: details.queen,
                            double: details.double,
                            single: details.single + 1
                          });
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Stack>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        // console.log('Removing:', details.bedroomId);
                        // console.log(bedroomDeets.filter(bedroomBeds => bedroomBeds.bedroomId !== details.bedroomId));
                        setBedroomDeets(bedroomDeets => bedroomDeets.filter(bedroomBeds => bedroomBeds.bedroomId !== details.bedroomId));
                      }}
                    >
                      Delete Bedroom
                    </Button>
                  </Box>
                );
              })
            }
            <Button
              variant="contained"
              onClick={() => {
                setBedroomCounter(bedroomCounter + 1)
                // console.log(bedroomDeets);
              }}
            >
              Add Bedroom
            </Button>
          </section>
          {/* Amenities */}
          <TextField
            id="amenities"
            label="Amenities"
            type="text"
            variant="standard"
            fullWidth
            onInput= {event => setAmenities(event.target.value)}
            required
          />
          <Button onClick={() => { setCancelState(true); }}>Cancel</Button>
          <Button onClick={updateListingDetails}>Update</Button>
        </Box>
      }
    </>
  );
}

export const AllListingsScreen = () => {
  const { getters } = useContext(Context);
  const [listingsList, setListingsList] = React.useState([]);
  const [listingsListCopy, setListingsListCopy] = React.useState([]);

  const getListingsList = async () => {
    const url = config.PREPORT_URL + config.BACKEND_PORT + '/listings';

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + getters.token,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      setListingsList(data.listings.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    getListingsList();
  }, []);

  React.useEffect(() => {
    getListingsList();
  }, [getters.reRenderPls]);

  React.useEffect(() => {
    if (listingsList[0]) {
      setListingsListCopy(listingsList);
    }
  }, [listingsList]);

  return (
    <Box
      sx={{
        width: '100vw',
        display: 'grid',
        justifyContent: 'center',
        gridTemplateColumns: 'repeat(auto-fill, 300px)',
        marginTop: '30px'
      }}
    >
      {
        listingsListCopy.map((listingsListItem) => {
          return (<ListingCard key={listingsListItem.id} listingId={listingsListItem.id} ownListing={listingsListItem.owner === getters.loggedInEmail} />);
        })
      }
    </Box>
  );
}

//! Turns out this is M4 --> HALT
export const ListingScreen = (props) => {
  const { getters } = useContext(Context);
  const { listingId } = useParams();

  // const navigate = useNavigate();

  const [listingDetails, setListingDetails] = React.useState({});
  const [isFetchingDetails, setIsFetchingDetails] = React.useState(true);

  // States for the attributes of the listing to be added/edited
  const [thumbnail, setThumbnail] = React.useState('');

  const [title, setTitle] = React.useState('');

  const [addressLine1, setAddressLine1] = React.useState('');
  const [locality, setLocality] = React.useState('');
  const [province, setProvince] = React.useState('');
  const [postcode, setPostcode] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [propertyType, setPropertyType] = React.useState('');
  const [numBathrooms, setNumBathrooms] = React.useState(0);
  const [bedroomDeets, setBedroomDeets] = React.useState([]);
  const [amenities, setAmenities] = React.useState('');

  const getListingDetails = async () => {
    const url = config.PREPORT_URL + config.BACKEND_PORT + '/listings/' + listingId;

    try {
      setIsFetchingDetails(true);
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + getters.token,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      console.log(data);
      setListingDetails(data.listing);
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetchingDetails(false);
    }
  }

  React.useEffect(() => {
    getListingDetails();
  }, []);

  React.useEffect(() => {
    console.log('Bruh:', listingDetails);
    if (listingDetails.title) {
      setThumbnail(listingDetails.thumbnail);
      setTitle(listingDetails.title);
      setAddressLine1(listingDetails.address.addressLine1);
      setLocality(listingDetails.address.locality);
      setProvince(listingDetails.address.province);
      setPostcode(listingDetails.address.postcode);
      setCountry(listingDetails.address.country);
      setPrice(listingDetails.price);
      setPropertyType(listingDetails.metadata.propertyType);
      setNumBathrooms(listingDetails.metadata.numBathrooms);
      setBedroomDeets(listingDetails.metadata.bedroomDeets);
      setAmenities(listingDetails.metadata.amenities);
    }
  }, [listingDetails])

  return (
    <>
      {!isFetchingDetails &&
        <Box>
          {/* Title */}
          <Typography variant="h4">{title}</Typography><br />
          {/* Property Type */}
          <Typography variant="h5">{propertyType}</Typography><br />
          {/* Price */}
          <Typography>${price} per night</Typography>
          {/* Thumbnail */}
          <img src={thumbnail} alt="Listing Thumbnail" width='100vw' /><br />
          {/* Address */}
          <Typography variant="h6">{addressLine1}, {locality}, {province} {'\n'} {country} {postcode} </Typography>
          {/* Bathrooms */}
          <Typography variant="h6">{numBathrooms}</Typography>
          {/* Bedrooms geeez */}
          <section id="bedroomsSection">
            {
              bedroomDeets.map(details => {
                // console.log(details);
                return (
                  //! THIS PART BREAKS
                  <Box key={details.bedroomId}>
                    <Typography variant="h5">Bedroom</Typography>
                    <Stack direction="column" spacing={1}>
                      { 'King beds: ' + String(details.king) }
                      { 'Queen beds: ' + String(details.queen) }
                      { 'Double beds: ' + String(details.double) }
                      { 'Single beds: ' + String(details.single) }
                    </Stack>
                  </Box>
                );
              })
            }
          </section>
          {/* Amenities */}
          <Typography>{amenities}</Typography>
        </Box>
      }
    </>
  );
}

export const NewListingButton = (props) => {
  const { loggedInState } = props;
  const { setters, getters } = useContext(Context);

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  // States for the attributes of the listing to be added/edited
  const [thumbnail, setThumbnail] = React.useState('');

  const [title, setTitle] = React.useState('');

  const [addressLine1, setAddressLine1] = React.useState('');
  const [locality, setLocality] = React.useState('');
  const [province, setProvince] = React.useState('');
  const [postcode, setPostcode] = React.useState('');
  const [country, setCountry] = React.useState('');
  //! UPDATE THIS IN FETCH
  const [address, setAddress] = React.useState({
    addressLine1: addressLine1,
    locality: locality,
    province: province,
    postcode: postcode,
    country: country
  });

  const [price, setPrice] = React.useState(0);

  const [propertyType, setPropertyType] = React.useState('');
  const [numBathrooms, setNumBathrooms] = React.useState(0);
  //! This one is complicated
  const [bedroomCounter, setBedroomCounter] = React.useState(1);
  const [bedroomBeds, setBedroomBeds] = React.useState({
    bedroomId: 1,
    king: 0,
    queen: 0,
    double: 0,
    single: 0
  });
  const [newBedroomBeds, setNewBedroomBeds] = React.useState({
    bedroomId: 1,
    king: 0,
    queen: 0,
    double: 0,
    single: 0
  });
  const [bedroomDeets, setBedroomDeets] = React.useState([]);
  const [bedroomDeetsCopy, setBedroomDeetsCopy] = React.useState(bedroomDeets);
  const [activeBedroomId, setActiveBedroomId] = React.useState(-1);
  const [amenities, setAmenities] = React.useState('');
  //! UPDATE THIS IN FETCH
  const [metadata, setMetadata] = React.useState({
    propertyType: propertyType,
    numBathrooms: numBathrooms,
    bedroomDeets: bedroomDeets,
    amenities: amenities
  });

  const handleClickOpen = (scrollType) => () => {
    setBedroomDeets([]);
    // setBedroomCounter(0);
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createClose = async () => {
    const url = config.PREPORT_URL + config.BACKEND_PORT + '/listings/new';

    const bodyData = {
      title: title,
      address: address,
      thumbnail: thumbnail,
      price: price,
      metadata: metadata
    };

    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + getters.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      });
    } catch (err) {
      console.log(err);
    } finally {
      setters.setReRenderPls(!(getters.reRenderPls));
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

  React.useEffect(() => {
    // console.log(bedroomDeets);
    setBedroomDeetsCopy(bedroomDeets);
  }, [bedroomDeets]);

  React.useEffect(() => {
    const newBedroomDeets = bedroomDeets.map(obj => {
      if (obj.bedroomId === activeBedroomId) {
        return bedroomBeds;
      }
      return obj;
    })
    setBedroomDeets(newBedroomDeets);
  }, [bedroomBeds]);

  React.useEffect(() => {
    if (bedroomCounter > 1) {
      setNewBedroomBeds({
        bedroomId: bedroomCounter,
        king: 0,
        queen: 0,
        double: 0,
        single: 0
      });
      setBedroomDeets(bedroomDeets => [...bedroomDeets, newBedroomBeds]);
    }
  }, [bedroomCounter]);

  React.useEffect(() => {
    // Set metadata
    setMetadata({
      propertyType: propertyType,
      numBathrooms: numBathrooms,
      bedroomDeets: bedroomDeets,
      amenities: amenities
    });
  }, [propertyType, numBathrooms, bedroomDeets, amenities]);

  React.useEffect(() => {
    // Set address
    setAddress({
      addressLine1: addressLine1,
      locality: locality,
      province: province,
      postcode: postcode,
      country: country
    });
  }, [addressLine1, locality, province, postcode, country]);

  return (
    <>
      <Button
        style={{ display: loggedInState ? 'inline-flex' : 'none' }}
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
          {/* Thumbnail */}
          <img src={thumbnail} alt="Listing Thumbnail" />
          <Button
            variant="contained"
            component="label"
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={event => {
                fileToDataUrl(event.target.files[0]).then(dataUrl => { setThumbnail(dataUrl) })
              }}
            />
          </Button>
          {/* Title */}
          <TextField
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="filled"
            onInput={event => setTitle(event.target.value)}
            required
          />
          {/* Property Type */}
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            value={propertyType}
            onChange={event => setPropertyType(event.target.value)}
            helperText="Please select your property type"
            required
          >
            {properties.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          {/* 1. Address Line */}
          <TextField
            id="addressLine1"
            label="Address Line"
            type="text"
            fullWidth
            variant="standard"
            onInput= {event => setAddressLine1(event.target.value)}
            required
          />
          {/* 2. Locality/Suburb/City */}
          <TextField
            id="locality"
            label="Locality/Suburb/City"
            type="text"
            variant="outlined"
            onInput= {event => setLocality(event.target.value)}
            required
          />
          {/* 3. State/Province */}
          <TextField
            id="province"
            label="State/Province"
            type="text"
            variant="outlined"
            onInput= {event => setProvince(event.target.value)}
            required
          />
          {/* 4. Postcode */}
          <TextField
            id="postcode"
            label="Postcode"
            type="text"
            variant="outlined"
            onInput= {event => setPostcode(event.target.value)}
            required
          />
          {/* 5. Country */}
          <Autocomplete
            id="country-select-demo"
            sx={{ width: 300 }}
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.label}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
            onChange={(event, newValue) => {
              // console.log(newValue.label)
              setCountry(newValue.label)
            }}
            required
          />
          {/* Price */}
          <TextField
            id="price"
            label="Price (per night)"
            type="number"
            InputLabelProps={{
              startadornment: <InputAdornment position="start">$</InputAdornment>,
              shrink: true
            }}
            variant="standard"
            onChange={event => setPrice(event.target.value)}
            required
          />
          {/* Bathrooms */}
          <TextField
            id="numBathrooms"
            label="Bathrooms"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
            onChange={event => setNumBathrooms(event.target.value)}
            required
          />
          {/* Bedrooms geeez */}
          <section id="bedroomsSection">
            {
              bedroomDeetsCopy.map(details => {
                // console.log(details);
                return (
                  //! THIS PART BREAKS
                  <Box key={details.bedroomId}>
                    <h5>Bedroom</h5>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        aria-label="decrementKing"
                        onClick={() => {
                          if (details.king > 0) {
                            setActiveBedroomId(details.bedroomId);
                            setBedroomBeds({
                              bedroomId: details.bedroomId,
                              king: details.king - 1,
                              queen: details.queen,
                              double: details.double,
                              single: details.single
                            });
                          }
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      { 'King beds: ' + details.king }
                      <IconButton
                        aria-label="incrementKing"
                        onClick={() => {
                          setActiveBedroomId(details.bedroomId);
                          const newBedroomBeds = {
                            bedroomId: details.bedroomId,
                            king: details.king + 1,
                            queen: details.queen,
                            double: details.double,
                            single: details.single
                          };
                          setBedroomBeds(newBedroomBeds);
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        aria-label="decrementQueen"
                        onClick={() => {
                          if (details.queen > 0) {
                            setActiveBedroomId(details.bedroomId);
                            setBedroomBeds({
                              bedroomId: details.bedroomId,
                              king: details.king,
                              queen: details.queen - 1,
                              double: details.double,
                              single: details.single
                            });
                          }
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      { 'Queen beds: ' + details.queen }
                      <IconButton
                        aria-label="incrementQueen"
                        onClick={() => {
                          setActiveBedroomId(details.bedroomId);
                          setBedroomBeds({
                            bedroomId: details.bedroomId,
                            king: details.king,
                            queen: details.queen + 1,
                            double: details.double,
                            single: details.single
                          });
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        aria-label="decrementDouble"
                        onClick={() => {
                          if (details.double > 0) {
                            setActiveBedroomId(details.bedroomId);
                            setBedroomBeds({
                              bedroomId: details.bedroomId,
                              king: details.king,
                              queen: details.queen,
                              double: details.double - 1,
                              single: details.single
                            });
                          }
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      { 'Double beds: ' + details.double }
                      <IconButton
                        aria-label="incrementDouble"
                        onClick={() => {
                          setActiveBedroomId(details.bedroomId);
                          setBedroomBeds({
                            bedroomId: details.bedroomId,
                            king: details.king,
                            queen: details.queen,
                            double: details.double + 1,
                            single: details.single
                          });
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        aria-label="decrementSingle"
                        onClick={() => {
                          if (details.single > 0) {
                            setActiveBedroomId(details.bedroomId);
                            setBedroomBeds({
                              bedroomId: details.bedroomId,
                              king: details.king,
                              queen: details.queen,
                              double: details.double,
                              single: details.single - 1
                            });
                          }
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      { 'Single beds: ' + details.single }
                      <IconButton
                        aria-label="incrementSingle"
                        onClick={() => {
                          setActiveBedroomId(details.bedroomId);
                          setBedroomBeds({
                            bedroomId: details.bedroomId,
                            king: details.king,
                            queen: details.queen,
                            double: details.double,
                            single: details.single + 1
                          });
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Stack>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        // console.log('Removing:', details.bedroomId);
                        // console.log(bedroomDeets.filter(bedroomBeds => bedroomBeds.bedroomId !== details.bedroomId));
                        setBedroomDeets(bedroomDeets => bedroomDeets.filter(bedroomBeds => bedroomBeds.bedroomId !== details.bedroomId));
                      }}
                    >
                      Delete Bedroom
                    </Button>
                  </Box>
                );
              })
            }
            <Button
              variant="contained"
              onClick={() => {
                setBedroomCounter(bedroomCounter + 1)
                // console.log(bedroomDeets);
              }}
            >
              Add Bedroom
            </Button>
          </section>
          {/* Amenities */}
          <TextField
            id="amenities"
            label="Amenities"
            type="text"
            variant="standard"
            fullWidth
            onInput= {event => setAmenities(event.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

//* Select variables
// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
  { code: 'AD', label: 'Andorra' },
  {
    code: 'AE',
    label: 'United Arab Emirates',
  },
  { code: 'AF', label: 'Afghanistan' },
  {
    code: 'AG',
    label: 'Antigua and Barbuda',
  },
  { code: 'AI', label: 'Anguilla' },
  { code: 'AL', label: 'Albania' },
  { code: 'AM', label: 'Armenia' },
  { code: 'AO', label: 'Angola' },
  { code: 'AQ', label: 'Antarctica' },
  { code: 'AR', label: 'Argentina' },
  { code: 'AS', label: 'American Samoa' },
  { code: 'AT', label: 'Austria' },
  {
    code: 'AU',
    label: 'Australia',
    suggested: true,
  },
  { code: 'AW', label: 'Aruba' },
  { code: 'AX', label: 'Alland Islands' },
  { code: 'AZ', label: 'Azerbaijan' },
  {
    code: 'BA',
    label: 'Bosnia and Herzegovina',
  },
  { code: 'BB', label: 'Barbados' },
  { code: 'BD', label: 'Bangladesh' },
  { code: 'BE', label: 'Belgium' },
  { code: 'BF', label: 'Burkina Faso' },
  { code: 'BG', label: 'Bulgaria' },
  { code: 'BH', label: 'Bahrain' },
  { code: 'BI', label: 'Burundi' },
  { code: 'BJ', label: 'Benin' },
  { code: 'BL', label: 'Saint Barthelemy' },
  { code: 'BM', label: 'Bermuda' },
  { code: 'BN', label: 'Brunei Darussalam' },
  { code: 'BO', label: 'Bolivia' },
  { code: 'BR', label: 'Brazil' },
  { code: 'BS', label: 'Bahamas' },
  { code: 'BT', label: 'Bhutan' },
  { code: 'BV', label: 'Bouvet Island' },
  { code: 'BW', label: 'Botswana' },
  { code: 'BY', label: 'Belarus' },
  { code: 'BZ', label: 'Belize' },
  {
    code: 'CA',
    label: 'Canada',
    suggested: true,
  },
  {
    code: 'CC',
    label: 'Cocos (Keeling) Islands',
  },
  {
    code: 'CD',
    label: 'Congo, Democratic Republic of the',
  },
  {
    code: 'CF',
    label: 'Central African Republic',
  },
  {
    code: 'CG',
    label: 'Congo, Republic of the',
  },
  { code: 'CH', label: 'Switzerland' },
  { code: 'CI', label: "Cote d'Ivoire" },
  { code: 'CK', label: 'Cook Islands' },
  { code: 'CL', label: 'Chile' },
  { code: 'CM', label: 'Cameroon' },
  { code: 'CN', label: 'China' },
  { code: 'CO', label: 'Colombia' },
  { code: 'CR', label: 'Costa Rica' },
  { code: 'CU', label: 'Cuba' },
  { code: 'CV', label: 'Cape Verde' },
  { code: 'CW', label: 'Curacao' },
  { code: 'CX', label: 'Christmas Island' },
  { code: 'CY', label: 'Cyprus' },
  { code: 'CZ', label: 'Czech Republic' },
  {
    code: 'DE',
    label: 'Germany',
    suggested: true,
  },
  { code: 'DJ', label: 'Djibouti' },
  { code: 'DK', label: 'Denmark' },
  { code: 'DM', label: 'Dominica' },
  {
    code: 'DO',
    label: 'Dominican Republic',
  },
  { code: 'DZ', label: 'Algeria' },
  { code: 'EC', label: 'Ecuador' },
  { code: 'EE', label: 'Estonia' },
  { code: 'EG', label: 'Egypt' },
  { code: 'EH', label: 'Western Sahara' },
  { code: 'ER', label: 'Eritrea' },
  { code: 'ES', label: 'Spain' },
  { code: 'ET', label: 'Ethiopia' },
  { code: 'FI', label: 'Finland' },
  { code: 'FJ', label: 'Fiji' },
  {
    code: 'FK',
    label: 'Falkland Islands (Malvinas)',
  },
  {
    code: 'FM',
    label: 'Micronesia, Federated States of',
  },
  { code: 'FO', label: 'Faroe Islands' },
  {
    code: 'FR',
    label: 'France',
    suggested: true,
  },
  { code: 'GA', label: 'Gabon' },
  { code: 'GB', label: 'United Kingdom' },
  { code: 'GD', label: 'Grenada' },
  { code: 'GE', label: 'Georgia' },
  { code: 'GF', label: 'French Guiana' },
  { code: 'GG', label: 'Guernsey' },
  { code: 'GH', label: 'Ghana' },
  { code: 'GI', label: 'Gibraltar' },
  { code: 'GL', label: 'Greenland' },
  { code: 'GM', label: 'Gambia' },
  { code: 'GN', label: 'Guinea' },
  { code: 'GP', label: 'Guadeloupe' },
  { code: 'GQ', label: 'Equatorial Guinea' },
  { code: 'GR', label: 'Greece' },
  {
    code: 'GS',
    label: 'South Georgia and the South Sandwich Islands',
  },
  { code: 'GT', label: 'Guatemala' },
  { code: 'GU', label: 'Guam' },
  { code: 'GW', label: 'Guinea-Bissau' },
  { code: 'GY', label: 'Guyana' },
  { code: 'HK', label: 'Hong Kong' },
  {
    code: 'HM',
    label: 'Heard Island and McDonald Islands',
  },
  { code: 'HN', label: 'Honduras' },
  { code: 'HR', label: 'Croatia' },
  { code: 'HT', label: 'Haiti' },
  { code: 'HU', label: 'Hungary' },
  { code: 'ID', label: 'Indonesia' },
  { code: 'IE', label: 'Ireland' },
  { code: 'IL', label: 'Israel' },
  { code: 'IM', label: 'Isle of Man' },
  { code: 'IN', label: 'India' },
  {
    code: 'IO',
    label: 'British Indian Ocean Territory',
  },
  { code: 'IQ', label: 'Iraq' },
  {
    code: 'IR',
    label: 'Iran, Islamic Republic of',
  },
  { code: 'IS', label: 'Iceland' },
  { code: 'IT', label: 'Italy' },
  { code: 'JE', label: 'Jersey' },
  { code: 'JM', label: 'Jamaica' },
  { code: 'JO', label: 'Jordan' },
  {
    code: 'JP',
    label: 'Japan',
    suggested: true,
  },
  { code: 'KE', label: 'Kenya' },
  { code: 'KG', label: 'Kyrgyzstan' },
  { code: 'KH', label: 'Cambodia' },
  { code: 'KI', label: 'Kiribati' },
  { code: 'KM', label: 'Comoros' },
  {
    code: 'KN',
    label: 'Saint Kitts and Nevis',
  },
  {
    code: 'KP',
    label: "Korea, Democratic People's Republic of",
  },
  { code: 'KR', label: 'Korea, Republic of' },
  { code: 'KW', label: 'Kuwait' },
  { code: 'KY', label: 'Cayman Islands' },
  { code: 'KZ', label: 'Kazakhstan' },
  {
    code: 'LA',
    label: "Lao People's Democratic Republic",
  },
  { code: 'LB', label: 'Lebanon' },
  { code: 'LC', label: 'Saint Lucia' },
  { code: 'LI', label: 'Liechtenstein' },
  { code: 'LK', label: 'Sri Lanka' },
  { code: 'LR', label: 'Liberia' },
  { code: 'LS', label: 'Lesotho' },
  { code: 'LT', label: 'Lithuania' },
  { code: 'LU', label: 'Luxembourg' },
  { code: 'LV', label: 'Latvia' },
  { code: 'LY', label: 'Libya' },
  { code: 'MA', label: 'Morocco' },
  { code: 'MC', label: 'Monaco' },
  {
    code: 'MD',
    label: 'Moldova, Republic of',
  },
  { code: 'ME', label: 'Montenegro' },
  {
    code: 'MF',
    label: 'Saint Martin (French part)',
  },
  { code: 'MG', label: 'Madagascar' },
  { code: 'MH', label: 'Marshall Islands' },
  {
    code: 'MK',
    label: 'Macedonia, the Former Yugoslav Republic of',
  },
  { code: 'ML', label: 'Mali' },
  { code: 'MM', label: 'Myanmar' },
  { code: 'MN', label: 'Mongolia' },
  { code: 'MO', label: 'Macao' },
  {
    code: 'MP',
    label: 'Northern Mariana Islands',
  },
  { code: 'MQ', label: 'Martinique' },
  { code: 'MR', label: 'Mauritania' },
  { code: 'MS', label: 'Montserrat' },
  { code: 'MT', label: 'Malta' },
  { code: 'MU', label: 'Mauritius' },
  { code: 'MV', label: 'MalBoxes' },
  { code: 'MW', label: 'Malawi' },
  { code: 'MX', label: 'Mexico' },
  { code: 'MY', label: 'Malaysia' },
  { code: 'MZ', label: 'Mozambique' },
  { code: 'NA', label: 'Namibia' },
  { code: 'NC', label: 'New Caledonia' },
  { code: 'NE', label: 'Niger' },
  { code: 'NF', label: 'Norfolk Island' },
  { code: 'NG', label: 'Nigeria' },
  { code: 'NI', label: 'Nicaragua' },
  { code: 'NL', label: 'Netherlands' },
  { code: 'NO', label: 'Norway' },
  { code: 'NP', label: 'Nepal' },
  { code: 'NR', label: 'Nauru' },
  { code: 'NU', label: 'Niue' },
  { code: 'NZ', label: 'New Zealand' },
  { code: 'OM', label: 'Oman' },
  { code: 'PA', label: 'Panama' },
  { code: 'PE', label: 'Peru' },
  { code: 'PF', label: 'French Polynesia' },
  { code: 'PG', label: 'Papua New Guinea' },
  { code: 'PH', label: 'Philippines' },
  { code: 'PK', label: 'Pakistan' },
  { code: 'PL', label: 'Poland' },
  {
    code: 'PM',
    label: 'Saint Pierre and Miquelon',
  },
  { code: 'PN', label: 'Pitcairn' },
  { code: 'PR', label: 'Puerto Rico' },
  {
    code: 'PS',
    label: 'Palestine, State of',
  },
  { code: 'PT', label: 'Portugal' },
  { code: 'PW', label: 'Palau' },
  { code: 'PY', label: 'Paraguay' },
  { code: 'QA', label: 'Qatar' },
  { code: 'RE', label: 'Reunion' },
  { code: 'RO', label: 'Romania' },
  { code: 'RS', label: 'Serbia' },
  { code: 'RU', label: 'Russian Federation' },
  { code: 'RW', label: 'Rwanda' },
  { code: 'SA', label: 'Saudi Arabia' },
  { code: 'SB', label: 'Solomon Islands' },
  { code: 'SC', label: 'Seychelles' },
  { code: 'SD', label: 'Sudan' },
  { code: 'SE', label: 'Sweden' },
  { code: 'SG', label: 'Singapore' },
  { code: 'SH', label: 'Saint Helena' },
  { code: 'SI', label: 'Slovenia' },
  {
    code: 'SJ',
    label: 'Svalbard and Jan Mayen',
  },
  { code: 'SK', label: 'Slovakia' },
  { code: 'SL', label: 'Sierra Leone' },
  { code: 'SM', label: 'San Marino' },
  { code: 'SN', label: 'Senegal' },
  { code: 'SO', label: 'Somalia' },
  { code: 'SR', label: 'Suriname' },
  { code: 'SS', label: 'South Sudan' },
  {
    code: 'ST',
    label: 'Sao Tome and Principe',
  },
  { code: 'SV', label: 'El Salvador' },
  {
    code: 'SX',
    label: 'Sint Maarten (Dutch part)',
  },
  {
    code: 'SY',
    label: 'Syrian Arab Republic',
  },
  { code: 'SZ', label: 'Swaziland' },
  {
    code: 'TC',
    label: 'Turks and Caicos Islands',
  },
  { code: 'TD', label: 'Chad' },
  {
    code: 'TF',
    label: 'French Southern Territories',
  },
  { code: 'TG', label: 'Togo' },
  { code: 'TH', label: 'Thailand' },
  { code: 'TJ', label: 'Tajikistan' },
  { code: 'TK', label: 'Tokelau' },
  { code: 'TL', label: 'Timor-Leste' },
  { code: 'TM', label: 'Turkmenistan' },
  { code: 'TN', label: 'Tunisia' },
  { code: 'TO', label: 'Tonga' },
  { code: 'TR', label: 'Turkey' },
  {
    code: 'TT',
    label: 'Trinidad and Tobago',
  },
  { code: 'TV', label: 'Tuvalu' },
  {
    code: 'TW',
    label: 'Taiwan, Republic of China',
  },
  {
    code: 'TZ',
    label: 'United Republic of Tanzania',
  },
  { code: 'UA', label: 'Ukraine' },
  { code: 'UG', label: 'Uganda' },
  {
    code: 'US',
    label: 'United States',
    suggested: true,
  },
  { code: 'UY', label: 'Uruguay' },
  { code: 'UZ', label: 'Uzbekistan' },
  {
    code: 'VA',
    label: 'Holy See (Vatican City State)',
  },
  {
    code: 'VC',
    label: 'Saint Vincent and the Grenadines',
  },
  { code: 'VE', label: 'Venezuela' },
  {
    code: 'VG',
    label: 'British Virgin Islands',
  },
  {
    code: 'VI',
    label: 'US Virgin Islands',
  },
  { code: 'VN', label: 'Vietnam' },
  { code: 'VU', label: 'Vanuatu' },
  { code: 'WF', label: 'Wallis and Futuna' },
  { code: 'WS', label: 'Samoa' },
  { code: 'XK', label: 'Kosovo' },
  { code: 'YE', label: 'Yemen' },
  { code: 'YT', label: 'Mayotte' },
  { code: 'ZA', label: 'South Africa' },
  { code: 'ZM', label: 'Zambia' },
  { code: 'ZW', label: 'Zimbabwe' },
];

const properties = [
  {
    value: 'Entire place'
  },
  {
    value: 'Private room'
  },
  {
    value: 'Shared room'
  },
];

// Helper function
const fileToDataUrl = (file) => {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg']
  const valid = validFileTypes.find(type => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error('provided file is not a png, jpg or jpeg image.');
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
}