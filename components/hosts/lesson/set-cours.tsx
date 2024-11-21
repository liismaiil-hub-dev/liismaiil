import React, { ReactElement } from 'react';
import { styled } from '@mui/material/styles';
import Layout from 'layout';
import Page from '@/components/shared/Page';

import CoursSetting from '@/components/domain/lesson/CoursSetting';
import CoursList from '@/components/domain/lesson/CoursList';
// MUI THird packages
import { Divider as MuiDivider, Grid, Typography } from '@mui/material';
import { spacing } from '@mui/system';
import { gridSpacing } from '@/store/constants/constants';
import { useSelector } from 'react-redux';
import { RootStateType } from '@/store/store';
const Divider = styled(MuiDivider)(spacing);

function SetCours() {
  return (
    <Page title="lami1a ogranisator dashboard  | Set and modify your cours ">
      <Grid container justifyContent={'center'} alignItems={'center'}>
        <Typography variant="h3" gutterBottom display="inline-flex">
          {`Set your cours  { many Lessons}`}
        </Typography>
      </Grid>
      <Divider my={1} />
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <CoursSetting />
        </Grid>
        <Divider my={1} />
        <Grid item xs={12}>
          <CoursList /> *
        </Grid>
      </Grid>
    </Page>
  );
}

SetCours.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout variant={'main'} title="dashboard">
      {page}
    </Layout>
  );
};
export default SetCours;
