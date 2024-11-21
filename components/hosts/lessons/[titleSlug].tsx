import React, { useEffect, useState, ReactElement } from 'react';
import { spacing, styled, useTheme } from '@mui/system';
import { Container, Grid, Divider as MuiDivider, TablePagination, Typography } from '@mui/material';

import Layout from 'layout';

import ProductCard from '@/components/selections/cards/ProductCard';
import SkeletonProductPlaceholder from '@/components/selections/Products/ProductPlaceholder';

import { useLazyQuery } from '@apollo/client';

import { LessonTypeData } from '@/api/lesson/lesson.types';
import LessonCard from '@/components/landingpage/cards/LessonCard';

import MainCard from '@/components/shared/MainCard';

import { useRouter } from 'next/router';
import { GET_COURS, GET_COURS_LESSONS } from '@/graphql/cours/queries';
import useCours from '@/store/hooks/useCours';

import useLesson from '@/store/hooks/useLesson';
import slug from 'slug';
import { title } from 'process';
const Divider = styled(MuiDivider)(spacing);

// ==============================|| E-COMMERCE - PRODUCT GRID ||============================== //

const CoursLessons = () => {
  const {
    query: { titleSlug }
  } = useRouter();
  const {
    state: { cours },
    setCours
  } = useCours();
  const {
    state: { coursLessons },
    addCoursLesson
  } = useLesson();
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(4);
  const [page, setPage] = useState(1);
  const [GetCours, { data: coursData, loading: coursLoading, error: coursError }] = useLazyQuery(GET_COURS);
  const [GetCoursLessons, { data: lessonData, loading: lessonLoading, error: lessonError }] = useLazyQuery(GET_COURS_LESSONS);
  const [lessonsPaged, setLessonsPaged] = useState<Array<Array<LessonTypeData>> | undefined>();

  const returnLessonsArrays = (items: LessonTypeData[]) => {
    const TwoDimensionalArray = [];
    if (items?.length > 9) {
      const remainder = items.length % 9;
      let i = 1;
      while (i < items.length - remainder) {
        const array = items.slice(i, i + 9);
        TwoDimensionalArray.push(array);
        i += 9;
      }
      const array = items.slice(i);
      TwoDimensionalArray.push(array);
      return TwoDimensionalArray;
    } else {
      const array = items?.slice(0);
      TwoDimensionalArray.push(array);
      return TwoDimensionalArray;
    }
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    event?.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    event?.target.value && setRowsPerPage(parseInt(event?.target.value, 10));
    console.log({ targ: event?.target.value });
    setPage(0);
  };

  useEffect(() => {
    if (coursData && coursData?.cours && !coursError && !coursLoading) {
      setCours(coursData.cours);
    }
  }, [coursData, coursError, coursLoading]);

  useEffect(() => {
    if (cours.lessons && cours.lessons.length > 0 && cours.lessons[0] !== '') {
      console.log({ coursLessonsLength: cours.lessons });
      GetCoursLessons({
        variables: {
          titleSlug
        }
      });
    }
  }, [cours]);
  useEffect(() => {
    if (lessonData && lessonData?.lesson && !lessonError && !lessonLoading) {
      console.log({ lesson: lessonData?.lesson });
      addCoursLesson(lessonData.lesson);
    }
  }, [lessonData, lessonError, lessonLoading]);
  useEffect(() => {
    console.log({ length: coursLessons.length });
    console.log({ lessonsLength: cours.lessons });
    if (coursLessons[0]['title'] !== '' && coursLessons.length === cours.lessons.length) {
      console.log({ coursLessons });
      setLessonsPaged(returnLessonsArrays(coursLessons));
    }
  }, [coursLessons]);

  useEffect(() => {
    // console.log(selection.titleSlug)
    GetCours({
      variables: {
        titleSlug
      }
    });
  }, []);
  useEffect(() => {
    if (typeof lessonsPaged !== 'undefined') {
      console.log({ lessonsPaged });
    }
  }, [lessonsPaged]);

  if (coursLoading) {
    return (
      <Container>
        <MainCard>
          <Grid container spacing={1} justifyContent={'center'}>
            <Grid item xs={12} textAlign={'center'}>
              <Typography variant="h2" component="div" color={'primary'}>
                {`Lessons for  ${titleSlug} cours  `}
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
  }
  return (
    <Container>
      <MainCard>
        <Grid container spacing={1} justifyContent={'center'}>
          <Grid item xs={12} textAlign={'center'}>
            <Typography variant="h2" component="div" color={'primary'}>
              {`Courses in ${cours.title} selection  `}
            </Typography>
          </Grid>
          <Divider mb={1} />,
          <Grid item xs={12}>
            <Grid container spacing={1}>
              {coursLessons &&
                coursLessons.length > 0 &&
                coursLessons[0]['title'] !== '' &&
                lessonsPaged &&
                lessonsPaged[page - 1].map((lesson: LessonTypeData, index) => {
                  if (lesson['title'] !== '') {
                    console.log({ lesson });

                    return (
                      <Grid key={slug(lesson.title)} item xs={12} sm={6} md={4} lg={3}>
                        <LessonCard
                          title={lesson.title}
                          author={lesson.author}
                          createdAt={lesson.createdAt}
                          description={lesson.description}
                          video={lesson.video}
                          pdf={lesson.pdf}
                          videoLink={lesson.videoLink}
                          reviews={lesson.reviews}
                        />
                      </Grid>
                    );
                  }
                })}
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={6} justifyContent="center" alignItems={'center'} mt={3}>
          {coursLessons && coursLessons?.length > rowsPerPage && (
            <TablePagination
              sx={{ fontSize: '2rem', color: 'blue' }}
              rowsPerPageOptions={[4, 8, 16]}
              component="div"
              count={coursLessons?.length ? coursLessons?.length : -1}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Grid>
      </MainCard>
    </Container>
  );
};

CoursLessons.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout variant="minimal" title={'cours lessons'}>
      {page}
    </Layout>
  );
};

export default CoursLessons;
