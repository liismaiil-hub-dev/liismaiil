import { useEffect, ReactElement } from 'react';
import { spacing, styled } from '@mui/system';
import { Divider as MuiDivider, Drawer, Grid, Typography, useMediaQuery, Container } from '@mui/material';

// third party

import { dbFirestore } from '@/api/fb-utils-admin';
import Layout from 'layout';
import SkeletonProductPlaceholder from '@/components/selections/Products/ProductPlaceholder';

import SelectionCard from '@/components/selections/cards/SelectionCard';
import { gridSpacing } from '@/store/constants/constants';
import Page from '@/components/shared/Page';
import MainCard from '@/components/shared/cards/MainCard';

import useSelection from '@/store/hooks/useSelection';
import { SelectionTypeData } from '@/api/selection/selection.types';

const Divider = styled(MuiDivider)(spacing);
// ==============================|| E-COMMERCE - PRODUCT GRID ||============================== //

const Selections = ({ selections }: { selections: SelectionTypeData[] }) => {
  const { setSelections } = useSelection();

  let selectionResult: ReactElement | ReactElement[] | null = <></>;

  useEffect(() => {
    if (selections && selections?.length && selections[0] !== null && typeof selections[0] !== undefined) {
      setSelections(selections);
    }
  }, [selections]);

  if (!selections || selections.length === 0) {
    return (
      <Container>
        <MainCard>
          <Grid container spacing={1} justifyContent={'center'}>
            <Grid item xs={12} textAlign={'center'}>
              <Typography variant="h2" component="div" color={'primary'}>
                Selections from multiple stakeholders and collaborators
              </Typography>
            </Grid>
            <Grid item xs={12} textAlign={'center'}>
              <Typography variant="body2" color="secondary">
                Selections from all around the word.
              </Typography>
            </Grid>
            <Divider mb={1} />
            <Grid item xs={12}>
              <Grid container spacing={1}>
                {[1, 2, 3, 4].map((item) => (
                  <Grid key={item} item xs={12} sm={6} md={4} lg={3}>
                    <SkeletonProductPlaceholder />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      </Container>
    );
  } else {
  }

  return (
    <Container>
      <MainCard>
        <Grid container spacing={1} justifyContent={'center'}>
          <Grid item xs={12} textAlign={'center'}>
            <Typography variant="h2" component="div" color={'primary'}>
              Selections from multiple stakeholders and collaborators
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign={'center'}>
            <Typography variant="body2" color="secondary">
              Selections from all around the word.
            </Typography>
          </Grid>
          <Divider mb={1} />
          <Grid item xs={12}>
            <Grid container justifyContent="flex-start" alignItems={'flex-start'} spacing={gridSpacing} sx={{ textAlign: 'center' }}>
              {selections.map((selection: SelectionTypeData, index) => {
                if (selection.products && selection.products.length > 0) {
                  return (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                      <SelectionCard
                        image={selection.image.url}
                        title={selection?.title}
                        description={selection?.description}
                        promote={selection.promote}
                        products={selection.products}
                        author={selection.author}
                      />
                    </Grid>
                  );
                } else {
                  return null;
                }
              })}
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </Container>
  );
};

Selections.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="minimal">{page}</Layout>;
};

export default Selections;

export async function getStaticProps() {
  const selections: SelectionTypeData[] = [];
  const querySnapshot = await dbFirestore.collection('selections').get();
  querySnapshot.forEach((doc: unknown) => {
    selections.push({ id: doc.id, ...doc.data() });
  });

  return {
    props: {
      selections
    },
    revalidate: 600
  };
}
