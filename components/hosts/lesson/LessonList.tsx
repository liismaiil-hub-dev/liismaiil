import React, { useEffect, useState } from 'react';
// material-ui
import Avatar from '@/components/shared/Avatar';
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  Alert as MuiAlert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { spacing } from '@mui/system';
import { useRouter } from 'next/router';

import MainCard from '@/components/shared/MainCard';
import { LESSONS_BY_ID } from '@/graphql/lesson/queries';
import { useLazyQuery } from '@apollo/client';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import TelegramIcon from '@mui/icons-material/Telegram';

import { LessonTypeData } from '@/api/lesson/lesson.types';

import { toast } from 'react-toastify';

import { lessonActions } from '@/store/reducers/slices/lessonSlice';
import { RootStateType } from '@/store/store';
import { red } from '@mui/material/colors';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import slug from 'slug';
import ConfirmDeleteLessonDialog from './ConfirmDeleteLessonDialog';
const headCells = [{ id: ' ' }, { id: 'title ' }, { id: 'videoLink' },  { id: 'pdf' }, { id: 'added' }, { id: 'reviews' }];

const Alert = styled(MuiAlert)(spacing);
const LessonList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const [page, setPage] = React.useState<number>(0);

  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

  const { selfLessons, checkedLesson, openDeleteConfirmDialog } = useSelector((state: RootStateType) => state.lesson);
  const {
    profileAuth: { _id }
  } = useSelector((state: RootStateType) => state.profile);
  const { setSelfLessons, setCheckedLesson, setOpenDeleteConfirmDialog } = lessonActions;
  const [LessonsById, { loading, data, error }] = useLazyQuery(LESSONS_BY_ID);

  useEffect(() => {
    if (_id !== '') {
      LessonsById({
        variables: {
          id: _id
        }
      });
    }
  }, []);

  useEffect(() => {
    if (data?.lessonsById && data?.lessonsById.success && !error && !loading) {
      console.log(data.lessonsById.message);
      dispatch(setSelfLessons({ lessons: JSON.parse(data.lessonsById.message) }));
    }
  }, [data, error, loading]);

  const removeLessonsHandler = async () => {
    if (checkedLesson.title !== '') {
      dispatch(setOpenDeleteConfirmDialog({ open: true }));
    } else {
      toast.info('you must check one lesson for delete ');
    }
  };
  const telegramLessonHandler = async () => {
    toast.info('telegram the checked lessoon ');
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    console.log({ newPage });
    event?.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    event?.target.value && setRowsPerPage(parseInt(event?.target.value, 10));
    console.log({ targ: event?.target.value });
    setPage(0);
  };
  const setSelectedHandler = (lesson: LessonTypeData) => {
    const { title, pdf, author, description, videoLink, cours, createdAt } = lesson;
    dispatch(
      setCheckedLesson({
        lesson: {
          pdf,
          title: slug(title),
          description: description ?? '',
          author: author ?? '',
          videoLink: videoLink ?? '',
          cours: cours ?? '',
        }
      })
    );
  };
  const [selfLessonsPaginated, setSelfLessonsPaginated] = useState([
    {
      title: '',
      description: '',
      author: '',
      video: '',
      videoLink: '',
      pdf: '',
      createdAt: ''
    }
  ]);
  useEffect(() => {
    return setSelfLessonsPaginated(selfLessons.slice(page * rowsPerPage, rowsPerPage));
  }, [selfLessons, page]);

  useEffect(() => {
    if (checkedLesson && checkedLesson.title !== '') {
      console.log({ checkedLesson });
    }
  }, [checkedLesson]);

  const isLessonChecked = (title: string) => {
    console.log({ checkedLesson });
    if (typeof title !== 'undefined' && title) {
      return checkedLesson?.title === slug(title);
    } else return false
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - selfLessons.length) : 0;
  return (
    <MainCard title="Lesson List" content={false}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert mt={2} mb={1} severity="warning" variant="outlined">
          there is an error
        </Alert>
      ) : (
        <>
          <TableContainer>
            <Tooltip title="Delete selected lessons">
              <IconButton onClick={() => removeLessonsHandler()} size="large">
                <DeleteTwoToneIcon sx={{ color: 'red.50' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="send telegram alert">
              <IconButton
                onClick={telegramLessonHandler}
                size="large"
                onClickCapture={() => {
                  console.log('telegram');
                }}
              >
                <TelegramIcon sx={{ color: `${red[200]}` }} />
              </IconButton>
            </Tooltip>

            <Table sx={{ minWidth: 750 }} aria-labelledby="Lesson table">
              <TableHead>
                <TableRow>
                  {headCells.map((cell) => (
                    <TableCell key={cell.id} align="center">
                      {' '}
                      {cell.id}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {selfLessonsPaginated &&
                  selfLessonsPaginated.length > 0 &&
                  selfLessonsPaginated[0]['title'] !== '' &&
                  selfLessonsPaginated?.map((row: LessonTypeData, index) => {
                    console.log({ row });

                    return (<TableRow key={`-${index}`}>
                      <TableCell>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isLessonChecked(row.title)}
                              onChange={() => setSelectedHandler(row)}
                              name={'lesson'}
                              value={row['title'] ? slug(row['title']) : ''}
                            />
                          }
                          label={''}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={row['title'] ? slug(row['title']) : ''}
                        align="center"
                        scope="row"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => router.push(`/lessons/${slug(row['title'])}`)}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            textAlign: 'center',
                            color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : 'grey.900',
                            textDecoration: 'none'
                          }}
                        >
                          {row.title}
                        </Typography>
                      </TableCell>

                      <TableCell component="th" id={row['title'] ? slug(row['title']) : ''} scope="row" sx={{ cursor: 'pointer' }}>
                        <Avatar size="md" variant="rounded" src={row.videoLink ? row.videoLink : 'no Video file'} />
                      </TableCell>

                      <TableCell align="center">{row?.pdf ? row?.pdf : 'No pdf file'}</TableCell>
                      <TableCell align="center">  {`${moment(new Date(parseInt(row.createdAt!))).format('dddd DD MMM YYYY')}`} </TableCell>
                      <TableCell align="center">{row?.reviews ? row.reviews[0] : 'No reviews yet '}</TableCell>
                    </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={selfLessons?.length ? selfLessons?.length : -1}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {openDeleteConfirmDialog && <ConfirmDeleteLessonDialog open={openDeleteConfirmDialog} lesson={checkedLesson} />}
        </>
      )}
    </MainCard>
  );
};

export default LessonList;
