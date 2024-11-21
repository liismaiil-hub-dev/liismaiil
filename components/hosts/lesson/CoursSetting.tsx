import { useFormik } from 'formik';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { CloudUpload as MuiCloudUpload } from '@mui/icons-material';
import {
  Avatar,
  CardContent,
  Grid,
  Button as MuiButton,
  Card as MuiCard,
  FormControl as MuiFormControl,
  TextField as MuiTextField,
  Typography
} from '@mui/material';
import Resizer from 'react-image-file-resizer';

import { spacing, SpacingProps, styled } from '@mui/system';
import { toast } from 'react-toastify';

import { ADD_COURS, ADD_LESSONS_TO_COURS } from '@/graphql/cours/mutations';
import { LESSONS_BY_ID } from '@/graphql/lesson/queries';
import { useLazyQuery, useMutation } from '@apollo/client';

import { useDispatch, useSelector } from 'react-redux';

import { COURSES_BY_ID } from '@/graphql/cours/queries';
import { gridSpacing } from '@/store/constants/constants';
import { coursActions } from '@/store/reducers/slices/coursSlice';
import { lessonActions } from '@/store/reducers/slices/lessonSlice';
import { RootStateType } from '@/store/store';
import slug from 'slug';
import LessonsAccordion from './LessonsAccordion';

const Card = styled(MuiCard)(spacing);

const FormControlSpacing = styled(MuiFormControl)(spacing);

const FormControl = styled(FormControlSpacing) <{ m?: number }>`
  min-width: 148px;
`;

const BigAvatar = styled(Avatar)`
  width: 50px;
  height: 50px;
  margin: 0 auto ${(props) => props.theme.spacing(2)}px;
`;

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

const CloudUpload = styled(MuiCloudUpload)(spacing);

interface ButtonPropstype extends SpacingProps {
  component?: string;
}
const Button = styled(MuiButton)<ButtonPropstype>(spacing);
//Components

const initialValues = {
  title: '',
  description: '',
  price: 0,
  author: '',
  imageUrl: { public_id: '', url: '' },
  url: null
};
const CoursSetting: NextPage = () => {
  const dispatch = useDispatch();
  const [loadingImage, setLoadingImage] = useState(false);
  const { checkedCourses, checkedCours } = useSelector((state: RootStateType) => state.cours);
  const { profileAuth: { _id, email } } = useSelector((state: RootStateType) => state.profile);
  const { selfLessons, checkedLesson, checkedLessons } = useSelector((state: RootStateType) => state.lesson);
  const { setSelfLessons } = lessonActions;
  const { setSelfCourses } = coursActions;

  const [AddCours, { data: dataAddCours, loading: loadingAddCours, error: errorAddCours }] = useMutation(ADD_COURS, {
    refetchQueries: [{
      query: COURSES_BY_ID,
      variables: {
        id: _id
      }
    }]
  });

  useEffect(() => {
    if (typeof dataAddCours !== 'undefined') {
      if (dataAddCours && dataAddCours.addCours.success && !loadingAddCours && !errorAddCours) {
        toast.info(`${dataAddCours?.addCours?.message}`);
      } else {
        toast.error(`${dataAddCours?.addCours?.message}`);
      }
    }
  }, [dataAddCours, loadingAddCours, errorAddCours]);

  const [AddLessonsToCours, { data: dataAddLesson, error: errorAddLesson, loading: loadingAddLesson }] = useMutation(ADD_LESSONS_TO_COURS);

  const addLessonsCours = () => {
    try {
      if (checkedCours && checkedCours['title'] !== '') {
        AddLessonsToCours({
          variables: {
            input: {
              cours: slug(checkedCours['title']),
              lessons: checkedLessons
            }
          }
        });
        toast.info(`lessons was succefully added `);
      } else {
        toast.warning(`you must check one cours to add lessons `);
      }
    } catch (error) {
      toast.error(`error occurred when registering lessons ${error} `);
    }
  };
  const [LessonsById, { loading: loadingLessonsById, data: dataLessonsById, error: errorLessonsById }] =
    useLazyQuery(LESSONS_BY_ID);

  useEffect(() => {
    console.log({ checkedCours });
    formik.setFieldValue('title', checkedCours.title);
    formik.setFieldValue('description', checkedCours.description);
  }, [checkedCours]);
  useEffect(() => {
    console.log({ checkedLessons });
  }, [checkedLessons]);

  useEffect(() => {
    if (dataAddLesson && dataAddLesson.addLesson.success && !errorAddLesson && !loadingAddLesson) {
      toast.success(JSON.parse(dataAddLesson.addLesson.messge));
    } else if (errorAddLesson) {
      toast.error(errorAddLesson.message);
    }
  }, [dataAddLesson, errorAddLesson, loadingAddLesson]);

  useEffect(() => {
    if (email !== '') {
      LessonsById({
        variables: {
          id: _id
        }
      });
    }
  }, []);

  useEffect(() => {
    if (dataLessonsById?.lessonsById.length >= 0 && !errorLessonsById && !loadingLessonsById) {
      console.log(dataLessonsById.lessonsById);
      dispatch(setSelfLessons({ lessons: dataLessonsById.lessonsById }));
    }
  }, [dataLessonsById, errorLessonsById, loadingLessonsById]);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
      description: Yup.string().min(11, 'Too Short!').max(250, 'Too Long!'),
      author: Yup.string()
    }),

    onSubmit: async (values) => {
      const { title, description, imageUrl } = values;
      try {
        AddCours({
          variables: {
            input: {
              title,
              description,
              image: imageUrl,
              author: _id,
            }
          }
        });
      } catch (error: any) {
        toast.error(`${error} error when update data `);

        throw new Error(error);
      }
    }
  });

  const fileResizeAndUpload = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      try {
        Resizer.imageFileResizer(
          file, //file
          300, //maxWidth
          300, //maxHeight
          'JPEG', //compressFormat
          100, //quality
          0, //rotation
          (url: any) => {
            //responseUriFunc

            formik.values.url = url;
            uploadImage();
          },
          'base64', //outputType
          200, // minWidth
          200 //minHeight
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const uploadImage = async () => {
    setLoadingImage(true);

    fetch(`/api/upload-cours`, {
      method: 'POST',
      body: formik.values.url
    })
      .then(async (res) => {
        //     console.log({ res });
        //setCreateObjectURL(URL.createObjectURL(avatar));
        const data = await res.json();
        formik.values.imageUrl = data;

        setLoadingImage(false);
      })
      .catch((error) => {
        toast.error(`avatar upload failed`);
        setLoadingImage(false);

        console.log({ error });
      });
  };

  return (
    <Card mb={1}>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <Grid container spacing={gridSpacing} mb={1} alignItems={'center'} justifyContent={'space-evenly'}>
            <Grid item xs={4}>
              <TextField
                name="title"
                id="title"
                label="Title"
                variant="outlined"
                onChange={formik.handleChange}
                fullWidth
                value={formik.values.title}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                label="Description"
                id="description"
                multiline={true}
                rows={2}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={2} alignItems={'center'} justifyContent={'center'}>
              <BigAvatar alt={`avatar`} src={formik.values.imageUrl.url ? formik.values.imageUrl.url : ''} style={{ margin: '0 45% 0' }} />
            </Grid>
            <Grid item xs={2}>
              <label htmlFor="raised-button-file">
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  type="file"
                  name="image"
                  onChange={fileResizeAndUpload}
                />
                <Button variant="contained" color="primary" component="span">
                  <CloudUpload mr={1} /> Image
                </Button>
              </label>
            </Grid>
          </Grid>

          {typeof checkedCourses !== 'undefined' && checkedCourses && checkedCourses?.lessons?.length > 0 && (
            <Grid container spacing={gridSpacing} mb={1} justifyContent="space-evenly" alignItems={'center'}>
              {checkedCourses?.lessons.map((lesson: string) => {
                return (
                  <Grid key={lesson['title']} item xs={4}>
                    <Typography>{lesson.title}</Typography>
                  </Grid>
                );
              })}
            </Grid>
          )}

          <Grid container spacing={gridSpacing} mb={1} justifyContent="center" alignItems={'center'}>
            {' '}
            <Grid item xs={4}>
              <Button type="submit" variant="contained" color="secondary" mt={3} disabled={loadingImage || loadingAddCours}>
                Add Cours
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                mt={3}
                disabled={loadingImage || loadingAddLesson}
                onClick={() => addLessonsCours()}
              >
                Add lessons to cours
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </form>
      {selfLessons && setSelfLessons.length > 0 && selfLessons[0]['title'] !== '' && <LessonsAccordion cours={slug(formik.values.title)} />}
    </Card>
  );
};
export default CoursSetting;
function setSelfCourses(arg0: { courses: any }): any {
  throw new Error('Function not implemented.');
}
