import React, { ReactElement, useState } from 'react';

// material-ui
import { Button, Grid, InputAdornment, Menu, MenuItem, OutlinedInput, Pagination, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import GuestSimpleCard from '@/components/dashboard/cards/GuestSimpleCard';
import Page from '@/components/shared/Page';
import { gridSpacing } from '@/store/constants/constants';
import MainCard from '@/ui-component/cards/MainCard';
import Layout from 'layout';
import { useDispatch, useSelector } from 'react-redux';

// assets
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { IconSearch } from '@tabler/icons';

// types
import { GuestType } from '@/api/profile/profile.types';
import { RootStateType } from '@/store/store';
import _ from 'lodash';

// ==============================|| USER CARD STYLE 2 ||============================== //

const GuestCards = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { ownGuests } = useSelector((state: RootStateType) => state.profile);
  const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);
  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [searched, setSearched] = useState<GuestType[] | undefined>([]);

  const [search, setSearch] = useState<string | undefined>('');
  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
    const newString = event?.target.value;
    setSearch(newString);
    const filteredGuest = _.filter(ownGuests, (gust: GuestType) => {
      return gust.tokenId === parseInt(newString!)
    })
    if (newString) {
      setSearched(filteredGuest)
    } else {
      setSearched(ownGuests)

    }
  };

  let ownGuestsResult: React.ReactElement | React.ReactElement[] = <></>;
  if (ownGuests) {
    ownGuestsResult = ownGuests.map((guest: GuestType, index) => (
      <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
        <GuestSimpleCard {...guest} />
      </Grid>
    ));
  }

  return (
    <Page title="Card 2">
      <MainCard
        title={
          <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
            <Grid item textAlign={'center'} alignItems={'center'} justifyContent={'center'} >
              <Typography variant="h3">Guests Cards</Typography>
            </Grid>
            <Grid item>
              <OutlinedInput
                id="input-search-card-style2"
                placeholder="Search"
                value={search}
                onChange={handleSearch}
                startAdornment={
                  <InputAdornment position="start">
                    <IconSearch stroke={1.5} size="16px" />
                  </InputAdornment>
                }
                size="small"
              />
            </Grid>
          </Grid>
        }
      >
        <Grid container direction="row" spacing={gridSpacing}>
          {ownGuestsResult}
          <Grid item xs={12}>
            <Grid container justifyContent="space-between" spacing={gridSpacing}>
              <Grid item>
                <Pagination count={10} color="primary" />
              </Grid>
              <Grid item>
                <Button
                  variant="text"
                  size="large"
                  sx={{ color: theme.palette.grey[900] }}
                  color="secondary"
                  endIcon={<ExpandMoreRoundedIcon />}
                  onClick={handleClick}
                >
                  10 Rows
                </Button>
                {anchorEl && (
                  <Menu
                    id="menu-user-card-style2"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    variant="selectedMenu"
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                  >
                    <MenuItem onClick={handleClose}> 10 Rows</MenuItem>
                    <MenuItem onClick={handleClose}> 20 Rows</MenuItem>
                    <MenuItem onClick={handleClose}> 30 Rows </MenuItem>
                  </Menu>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </Page>
  );
};

GuestCards.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default GuestCards;
