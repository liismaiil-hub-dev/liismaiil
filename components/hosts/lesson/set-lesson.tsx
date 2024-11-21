import React, { ReactElement } from 'react';
import { styled } from '@mui/material/styles';
import Layout from 'layout';
import Page from '@/components/shared/Page';
import LessonSetting from '@/components/domain/lesson/LessonSetting';
import LessonList from '@/components/domain/lesson/LessonList';
import { Divider as MuiDivider, Grid, Typography } from '@mui/material';
import { spacing } from '@mui/system';
import { gridSpacing } from '@/store/constants/constants';
const Divider = styled(MuiDivider)(spacing);

export default function SetLesson() {
  return (
    <Page title=" Set lesson">
      <Grid container justifyContent={'center'} alignItems={'center'}>
        <Typography variant="h3" gutterBottom display="inline-flex">
          Set your Lesson
        </Typography>
      </Grid>
      <Divider my={1} />
      <Grid container spacing={gridSpacing} justifyContent={'flex-start'} alignItems={'center'}>
        <Grid item xs={12}>
          <LessonSetting />
        </Grid>
        <Divider my={1} />
        <Grid item xs={12}>
          <LessonList />
        </Grid>
      </Grid>
    </Page>
  );
}
SetLesson.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout variant="main" title="set lesson">
      {page}
    </Layout>
  );
};
