import React, { useEffect, useRef, useState } from 'react';
import { spacing, styled, useTheme } from '@mui/system';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  FormControlLabel,
  Checkbox,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import _ from 'lodash';

import { toast } from 'react-toastify';

import Avatar from '@/components/shared/Avatar';

import { LessonTypeData, LessonTypeData__typename } from '@/api/lesson/lesson.types';
import slug from 'slug';
import moment from 'moment';
import router from 'next/router';

import { useSelector, useDispatch } from 'react-redux';
import { lessonActions } from '@/store/reducers/slices/lessonSlice';

const headCells = [{ id: ' ' }, { id: 'video' }, { id: 'title ' }, { id: 'added' }, { id: 'pdf' }, { id: 'videoLink' }, { id: 'reviews' }];

const AyahNumber = styled('div')({
  fontSize: 10,
  borderLeft: 1,
  color: 'black',
  textAlign: 'center'
});

const LessonsAccordion = () => {
  const dispatch = useDispatch();
  const { selfLessons, lessonsChecked } = useSelector((state) => state.lesson);
  const [toggle, setToggle] = useState<string | number | boolean>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const { setLessonsChecked } = lessonActions;
  const [openAccordion, setOpenAccordion] = useState(false);

  const okHandler = () => {
    toast.info('OK');
    setOpenAccordion(false);
  };

  const setSelectedHandler = (r: LessonTypeData__typename) => {
    console.log({ r });
    const { __typename, createdAt, ...rest } = r;
    console.log({ rest });
    if (lessonsChecked && lessonsChecked.length > 0 && lessonsChecked[0]['title'] === '') {
      dispatch(setLessonsChecked({ lessons: [rest] }));
    } else if (
      _.find(lessonsChecked, function (less) {
        return less.title === r.title;
      })
    ) {
      dispatch(
        setLessonsChecked({
          lessons: _.filter(lessonsChecked, function (less) {
            return less['title'] !== r['title'];
          })
        })
      );
    } else {
      dispatch(setLessonsChecked({ lessons: [...lessonsChecked, rest] }));
    }
  };

  const handleChange = (panel: string | boolean) => (event: React.SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    if (toggle !== panel && expanded !== panel) {
      setExpanded(panel);
    } else if (toggle === panel && expanded === false) {
      setExpanded(panel);
    } else setExpanded(false);
    setToggle(panel);
  };

  const [page, setPage] = React.useState<number>(0);

  const [selfLessonsPaginated, setSelfLessonsPaginated] = useState([
    {
      title: '',
      description: '',
      author: '',
      video: '',
      videoLink: '',
      pdf: '',
      reviews: [''],
      updatedAt: '',
      createdAt: ''
    }
  ]);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

  useEffect(() => {
    setSelfLessonsPaginated(selfLessons.slice(page * rowsPerPage, rowsPerPage));
  }, [selfLessons, page]);

  useEffect(() => {
    setSelfLessonsPaginated(selfLessons.slice(page * rowsPerPage, rowsPerPage));
  }, [selfLessons, page]);

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
  const lessonIndexed = (title: string) => {
    const lessonInd = _.find(lessonsChecked, function (less) {
      return slug(less.title) === slug(title);
    });
    console.log(lessonInd);
    if (lessonInd && lessonInd['title'] !== '') {
      return true;
    } else return false;
  };
  const theme = useTheme();
  return (
    <Box sx={{ width: '100%' }}>
      <MuiAccordion
        defaultExpanded={false}
        expanded={expanded}
        onChange={() => {
          setExpanded((expanded) => !expanded);
        }}
      >
        <MuiAccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ color: 'grey.800', fontWeight: 500 }}>
          {`${selfLessons.length} lessons | and `}
          {` ${
            lessonsChecked && lessonsChecked.length > 0 && lessonsChecked[0]['title'] !== ''
              ? `${lessonsChecked.length} lessons selected exists `
              : 'No lesson selected'
          }`}
        </MuiAccordionSummary>
        <MuiAccordionDetails>
          {selfLessons && selfLessons[0]['title'] !== '' && (
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
                  selfLessonsPaginated[0]['title'] !== '' &&
                  selfLessonsPaginated?.map((row: LessonTypeData) => (
                    <TableRow key={slug(row['title'])}>
                      <TableCell align="center">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={lessonIndexed(row['title'])}
                              onChange={() => setSelectedHandler(row)}
                              name={'lesson'}
                              value={slug(row['title'])}
                            />
                          }
                          label={''}
                        />
                      </TableCell>
                      <TableCell align="center" id={slug(row['title'])} scope="row" sx={{ cursor: 'pointer' }}>
                        <Avatar size="md" variant="rounded" src={row.video ? row.video : row.videoLink} />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={slug(row['title'])}
                        scope="row"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => router.push(`/lessons/${slug(row['title'])}`)}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : 'grey.900',
                            textDecoration: 'none'
                          }}
                        >
                          {row.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {' '}
                        {moment(parseInt(row?.createdAt!)).year()} - {moment(parseInt(row?.createdAt!)).month() + 1} -{' '}
                        {moment(parseInt(row?.createdAt)).day()}{' '}
                      </TableCell>

                      <TableCell align="center">{row?.pdf ? row?.pdf : 'no pdf file'}</TableCell>
                      <TableCell align="center">{row?.videoLink ? row?.videoLink : 'no video link'}</TableCell>
                      <TableCell align="center">{row?.reviews ? row.reviews.length : 'No reviews yet '}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={selfLessons?.length ? selfLessons?.length : -1}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </MuiAccordionDetails>
      </MuiAccordion>
    </Box>
  );
};

export default LessonsAccordion;
