import { REMOVE_COURS } from '@/graphql/cours/mutations';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
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
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { CoursTypeData } from '@/api/cours/cours.types';
import Avatar from '@/components/shared/Avatar';
import MainCard from '@/components/shared/MainCard';
import { COURSES_BY_ID } from '@/graphql/cours/queries';
import { coursActions } from '@/store/reducers/slices/coursSlice';
import { RootStateType } from '@/store/store';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import slug from 'slug';

const headCells = [
  { id: 'select' },
  { id: 'title' },
  { id: 'image' },
  { id: 'created' },
  { id: 'lessons' },
  { id: 'guests' }
];

const CoursList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { selfCourses, checkedCours } = useSelector((state: RootStateType) => state.cours);
  const {
    profileAuth: { _id }
  } = useSelector((state: RootStateType) => state.profile);

  const { setSelfCourses, setCheckedCours } = coursActions;
  const [coursesPaginated, setCoursesPaginated] = useState<CoursTypeData[]>(selfCourses);

  const [page, setPage] = React.useState<number>(1);

  const [rowsPerPage, setRowsPerPage] = React.useState<number>(4);
  const [checkedId, setCheckedId] = useState({ title: '', image: '' });

  //const [anchorEl, setAnchorEl] = React.useState<Element | ((element: Element) => Element) | null | undefined>(null);
  const [GetCoursesById, { data: dataCourses, error: errorCourses, loading: loadingCourses }] = useLazyQuery(COURSES_BY_ID);
  const [RemoveCours, { data: dataRemoveCours, loading: loadingRemoveCours }] = useMutation(REMOVE_COURS, {
    refetchQueries: [
      {
        query: COURSES_BY_ID,
        variables: {
          id: _id
        }
      }
    ]
  });
  useEffect(() => {
    if (typeof selfCourses !== 'undefined' && selfCourses && selfCourses.length === 1 && selfCourses[0]['title'] === '') {
      setCoursesPaginated(selfCourses?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    }
  }, [selfCourses, page, rowsPerPage]);

  useEffect(() => {
    if (typeof _id !== 'undefined' && _id !== '') {
      GetCoursesById({
        variables: {
          id: _id
        }
      });
    }
  }, []);

  useEffect(() => {
    console.log({ cousesById: dataCourses?.coursesById.message });
    if (typeof dataCourses !== 'undefined' && dataCourses?.coursesById && dataCourses?.coursesById.success && !loadingCourses && !errorCourses) {
      console.log({ cousesById: dataCourses?.coursesById });
      dispatch(setSelfCourses({ courses: JSON.parse(dataCourses?.coursesById.message) }));
    }
  }, [dataCourses, loadingCourses, errorCourses]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    event?.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    event?.target.value && setRowsPerPage(parseInt(event?.target.value, 10));
    console.log({ targ: event?.target.value });
    setPage(0);
  };

  console.log({ selfCourses, coursesPaginated });
  const removeCoursesHandler = async () => {
    if (checkedCours && checkedCours.title !== '') {
      try {
        console.log({ title: checkedCours.title });
        RemoveCours({
          variables: { input: { title: checkedCours.title } }
        });
      } catch (error) {
        console.log({ error });
        toast.info('you must check a selection to delete');
      }
    } else {
      toast.info('you must check a selection to delete');
    }
  };

  const removeImageHandler = async () => {
    try {
      fetch(`/api/upload-cours`, {
        method: 'DELET',
        body: checkedCours.image.public_id
      }).then(async (res) => {
        toast.info('image has been deleted');
        //setCreateObjectURL(URL.createObjectURL(avatar));
      });
    } catch (error) {
      console.log({ error });
      toast.info('you must check a selection to delete');
    }
  };
  useEffect(() => {
    if (dataRemoveCours && dataRemoveCours.removeCours.succes && !loadingRemoveCours) {
      toast.info(`${dataRemoveCours.removeCours?.message}`);
      removeImageHandler();
    }
  }, [dataRemoveCours, loadingRemoveCours]);

 
  return (
    <MainCard title="Cours List" content={false}>
      <TableContainer>
        <Tooltip title="Delete selected cours">
          <IconButton onClick={removeCoursesHandler} size="large">
            <DeleteTwoToneIcon sx={{ color: 'red.50' }} />
          </IconButton>
        </Tooltip>
        <Table sx={{ minWidth: 750 }} aria-labelledby="courses list">
          <TableHead>
            <TableRow>
              {headCells.map((cell) => (
                <TableCell key={cell.id} align="center">

                  {cell.id}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {selfCourses &&
            selfCourses[0] &&
            selfCourses[0]['title'] !== '' &&
            coursesPaginated.map((row: CoursTypeData, index: number) => {
              return (
                <TableBody key={`${slug(row?.title)}-${index}`}>
                  {typeof row !== 'undefined' && typeof row['title'] !== 'undefined' && typeof row['title'] === 'string' && (
                    <TableRow>
                      <TableCell align='center' >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checkedCours['title'] === row?.title}
                              onChange={() => dispatch(setCheckedCours({ cours: row }))}
                              name={'selection'}
                              value={row['title'] ? slug(row['title']) : ''}
                            />
                          }
                          label={''}
                        />
                      </TableCell>
                      <TableCell align='center' component="th" id={slug(row['title'])} sx={{ cursor: 'pointer' }}>
                        <Link href={`/cours/${slug(row['title'])}`}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : 'grey.900',
                              textDecoration: 'none'
                            }}
                          >
                            {row['title']}
                          </Typography>
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        <Avatar size="md" variant="rounded" src={row.image?.url ? row.image?.url : ''} />
                      </TableCell>
                      <TableCell align="center">  {`${moment(new Date(parseInt(row.createdAt!))).format('dddd DD MMM YYYY')}`} </TableCell>
                      <TableCell align="center">{row?.lessons && row?.lessons.length ? row?.lessons.length : '0 lessons'}</TableCell>
                      <TableCell align="center">{row?.guests && row?.guests.length ? row?.guests.length : 'none'}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              );
            })}
        </Table>
      </TableContainer>
      <Grid container spacing={6} justifyContent="center" alignItems={'center'} mt={3}>
        {selfCourses && selfCourses?.length > rowsPerPage && (
          <TablePagination
            sx={{ fontSize: '2rem', color: 'blue' }}
            rowsPerPageOptions={[4, 8, 16]}
            component="div"
            count={selfCourses?.length ? selfCourses?.length : -1}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Grid>
    </MainCard>
  );
};

export default CoursList;
