import { useLazyQuery, useMutation } from '@apollo/client';
import { PictureAsPdf as MuiPictureAsPdf, VideoFile as MuiVideoFile } from '@mui/icons-material';
import {
  Avatar,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Button as MuiButton,
  Card as MuiCard,
  TextField as MuiTextField,
  Select,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import { NextPage } from 'next';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
//import { FormData, File } from "formdata-node"
import { gridSpacing } from '@/store/constants/constants';
import { spacing, SpacingProps, styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { ADD_LESSON } from '@/graphql/lesson/mutations';

//import {uploadFile} from '@/utils/db/firebase-function'
import { CoursTypeData } from '@/api/cours/cours.types';
import { PROFILE_STATUS } from '@/api/viewer/viewer.types';
import { COURSES_BY_ID } from '@/graphql/cours/queries';
import { coursActions } from '@/store/reducers/slices/coursSlice';
import { lessonActions } from '@/store/reducers/slices/lessonSlice';
import { RootStateType } from '@/store/store';
import slug from 'slug';
const Card = styled(MuiCard)(spacing);

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);
const BigAvatar = styled(Avatar)`
  width: 50px;
  height: 50px;
  margin: 0 auto ${(props) => props.theme.spacing(2)}px;
`;

const PdfIcon = styled(MuiPictureAsPdf)(spacing);
const VideoIcon = styled(MuiVideoFile)(spacing);

interface ButtonPropstype extends SpacingProps {
  component?: string;
}
const Button = styled(MuiButton)<ButtonPropstype>(spacing);

// component

const LessonSetting: NextPage = () => {
  const dispatch = useDispatch();
  const {
    profileAuth: { email, _id }, profileViewer:{status}
  } = useSelector((state: RootStateType) => state.profile);
  const { selfLessons, checkedLesson, coursSelected } = useSelector((state: RootStateType) => state.lesson);
  const { selfCourses } = useSelector((state: RootStateType) => state.cours);

  const { addSelfLesson, setCheckedLesson, setCoursSelected } = lessonActions;
  const { setSelfCourses } = coursActions;
  const [loading, setLoading] = useState(false);
  const [AddLesson, { data, error }] = useMutation(ADD_LESSON);
  const [GetCoursesById, { data: dataCourses, error: errorCourses, loading: loadingCourses }] = useLazyQuery(COURSES_BY_ID);
  useEffect(() => {
    if (selfCourses && selfCourses.length === 1 && selfCourses[0]['title'] === '') {
      GetCoursesById({
        variables: {
          id: _id
        }
      });
    }
  }, []);

  useEffect(() => {
    console.log({ selfLessons });
  }, [selfLessons]);
  useEffect(() => {
    console.log({ courses: dataCourses?.coursesById });
    if (dataCourses && dataCourses.coursesById && dataCourses.coursesById?.success > 0) {
      dispatch(setSelfCourses({ courses: JSON.parse(dataCourses.coursesById.message) }));
    }
  }, [dataCourses, loadingCourses]);

  useEffect(() => {
    if (data && data.addLesson && !error) {
      dispatch(addSelfLesson({ lesson: data.addLesson }));
      toast.info('your new lesson is registered');
    }
  }, [data, error]);

  useEffect(() => {
    console.log([checkedLesson]);
    formik.setFieldValue('title', checkedLesson.title);
    formik.setFieldValue('pdf', checkedLesson.pdf);
    formik.setFieldValue('videoLink', checkedLesson.videoLink);
    //   formik.setFieldValue('video', checkedLesson.video);
  }, [checkedLesson]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('title is required'),
    description: Yup.string().required('description required'),
    video: Yup.string(),
    videoLink: Yup.string(),
    pdf: Yup.string(),

  });

  const formik = useFormik({
    initialValues: {
      title: checkedLesson['title'] ? checkedLesson['title'] : '',
      description: '',
      //   video: checkedLesson['video'] ? checkedLesson['video'] : '',
      videoLink: checkedLesson['videoLink'] ? checkedLesson['videoLink'] : '',
      pdf: checkedLesson['pdf'] ? checkedLesson['pdf'] : '',
      cours: checkedLesson['cours'] ? checkedLesson['cours'] : coursSelected ? coursSelected : ''
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      const { title, description, videoLink, pdf, cours } = values;

      console.log({

        title,
        description,
        //         video,
        cours: coursSelected,
        videoLink,
        pdf,
        author: _id
      });
        try {
         AddLesson({
           variables: {
             input: {
               title,
               description,
               cours: coursSelected,
               videoLink,
               pdf,
               author: _id
             }
           }
         })
           .then(({ data }) => {
             console.log({ dataSel: data?.addLesson, data });
             toast.success(`selection ${data?.addLesson?.title} is registred`);
             dispatch(addSelfLesson({ lesson: data?.addLesson }));
             formik.setValues(formik.initialValues);
           })
           .catch((error: any) => {
             toast.error(`${error}`);
             //.graphQLErrors.message
           });
       } catch (error: any) {
         toast.error(`${error} error when update data `);
         throw new Error(error);
       } 
    }
  });
  // check values din the       field to enable send button
  const isDisabled = useMemo(() => {
    return !!Object.entries(formik.values).some((input) => {
      if (input[0] === 'title') {
        return !input[1];
      }
      if (input[0] === 'description') {
        return !input[1];
      }
    });
    return false;
  }, [formik.values.title, formik.values.description]);

  /*   const [videoFileName, setVideoFileName] = useState('');
    const handleUploadVideo = async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.item(0);
      if (file) {
        try {
          setVideoFileName(file?.name);
          const extention = file.name.split('.').pop();
  
          //const videoData = new FormData()
          const reader = new FileReader();
          //reader.readAsDataURL(file)
          const formData = new FormData();
          reader.onload = async () => {
            const arrayBuffer = await reader.readAsArrayBuffer(file);
            formData.append('file', file);
  
            if (reader.result && typeof reader.result === 'string') {
              console.log({ res: reader.result });
              const response = await fetch('http://localhost:3011', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: formData,
                mode: 'cors'
              });
              if (response) {
                formik.values.video = data['name'];
                setLoading(false);
                toast.info(`video upload succed`);
                toast.info(`${response} returned`);
              } else {
                toast.error(`video upload failed }`);
                setLoading(false);
              }
            }
          };
        } catch (error: any) {
          toast.error(`video upload failed ${error.message}`);
          console.log({ error });
          setLoading(false);
        }
      }
    }; */
  const [pdfFileName, setPdfFileName] = useState('Upload pdf');
  const [pdfLink, setPdfLink] = useState('');
  const handleUploadPdf = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    console.log({ file });

    const _file = new File([file], slug(pdfFileName), { type: 'application/pdf' })
    const formData = new FormData();
    formData.append('file', file)
    formData.append('name', file.name)
    formData.append('type', file.type)
    if (file) {
      try {
        setPdfFileName(file?.name);
        console.log({ formdata: formData });

        setLoading(true);
        const response: any = await fetch('/api/upload-lesson', {
          method: 'POST',
          body: formData

        });
        if (response.ok) {
          const data = await response.json();
          formik.values.pdf = data['name'];
          setPdfLink(data.secure_url)
          toast.info(`pdf upload succed`);
          // toast.info(`${data} returned`);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(`cant upload file`);
        }
      } catch (error: any) {
        setLoading(false);
        toast.error(`pdf upload failed ${error?.message}`);
        console.log({ error });
      }
    }
  };
  useEffect(() => {
    console.log({ coursSelected });

  }, [coursSelected]);

  const emptyPayloads = () => {
    formik.setFieldValue('pdf', '');
    formik.setFieldValue('videoLink', '');
    // formik.setFieldValue('video', '');
    //setVideoFileName('');
    dispatch(
      setCheckedLesson({
        lesson: {
          title: '',
          description: '',

          videoLink: '',
          pdf: '',
          author: '',
          createdAt: ''
        }
      })
    );
    console.log({ pdf: formik.values.pdf });
    console.log({ link: formik.values.videoLink });

  };
  const updateLesson = () => { };
  const cancelUploadedHandler = () => {
    formik.setFieldValue('pdf', '');
    formik.setFieldValue('video', '');
  };
  if (status === PROFILE_STATUS.LIIS || status === PROFILE_STATUS.ORGA || status === PROFILE_STATUS.ADMIN) {
    return (
      <Card mb={1}>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <Grid container spacing={gridSpacing} mb={1} alignItems="center" justifyContent={'space-between'}>
              <Grid item md={6} xs={12}>
                <Grid
                  container
                  spacing={gridSpacing}
                  mb={1}
                  alignItems="flex-start"
                  xs={12}
                  justifyContent={'center'}
                  flexDirection={'column'}
                  width={'100%'}
                >
                  <Grid item sx={{ width: '100%' }}>
                    <TextField
                      id="title"
                      name="title"
                      label="Title"
                      variant="outlined"
                      fullWidth
                      onChange={formik.handleChange}
                      value={formik.values.title}
                    />
                  </Grid>

                  <Grid item sx={{ width: '100%' }}>
                    <FormControl sx={{ width: '100%' }}>
                      <InputLabel shrink id="cours">
                        cours
                      </InputLabel>
                      <Select
                        labelId="select cours label"
                        id="cours"
                        name="cours"
                        defaultValue=''
                        value={coursSelected !== '' ? coursSelected : ''}

                        error={formik.touched.cours && Boolean(formik.errors.cours)}

                        fullWidth
                        style={{ marginTop: '5px', padding: '5px auto' }}
                      >
                        {selfCourses &&
                          selfCourses?.map((cours: CoursTypeData) => (
                            <MenuItem onClick={(e) => {
                              console.log({ selectedCours: cours.titleSlug });

                              // formik.setFieldValue('cours', e.target.value as string);
                              dispatch(setCoursSelected({ cours: slug(cours.title) }));
                            }} key={`${cours}-${cours.title}`} value={slug(cours.title)}>
                              {`${cours?.title}`}{' '}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  multiline={true}
                  fullWidth
                  rows={4}
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} mb={1} alignItems="center" justifyContent={'space-between'}>
              <Grid item xs={6} >
                <TextField
                  id="videoLink"
                  name="videoLink"
                  label="Video link"
                  variant="outlined"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.videoLink !== '' ? formik.values.videoLink : checkedLesson.videoLink ? checkedLesson.videoLink : ''}
                />
              </Grid>
              {/* <Grid item xs={3}>
                <label htmlFor="video">
                  <input accept="video/*" style={{ display: 'none' }} id="video" type="file" name="video" onChange={handleUploadVideo} />
                  <Button variant="contained" color="primary" component="span">
                    <VideoIcon mr={1} /> {videoFileName ? videoFileName : checkedLesson.video ? checkedLesson.video : ' Upload video'}
                  </Button>
                </label>
              </Grid> */}
              <Grid item xs={6}>
                <label htmlFor="pdf">
                  <input accept=".doc,.docx,application/mswordpdf/*,.pdf" style={{ display: 'none' }} id="pdf" type="file" name="pdf" onChange={handleUploadPdf} />
                  <Button variant="contained" color="primary" component="span">
                    <PdfIcon mr={gridSpacing} /> {pdfFileName ? pdfFileName : checkedLesson.pdf ? checkedLesson.pdf : ' Upload pdf'}
                  </Button>
                </label>
              </Grid>
            </Grid>
            <Grid container spacing={gridSpacing} mb={1} alignItems="center" justifyContent={'space-evenly'} direction={'row'}>
              <Grid item xs={3} justifySelf={'center'} alignSelf={'center'}>
                <Button variant="contained" color="secondary" onClick={emptyPayloads}>
                  Empty fields
                </Button>
              </Grid>

              <Grid item xs={3}>
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                  Add lesson
                </Button>
              </Grid>

              <Grid item xs={3}>
                <Button variant="contained" color="primary" disabled={loading} onClick={cancelUploadedHandler}>
                  Cancel uploaded
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained" color="primary" disabled={loading} onClick={updateLesson}>
                  Update lesson
                </Button>
              </Grid>
            </Grid>
            {/*   {formik.values.video !== '' && (
              <Grid container spacing={gridSpacing} mb={1} alignItems="center" justifyContent={'space-between'}>
                <Grid
                  item
                  xs={3}
                  style={{
                    width: '100%',
                    height: '300px',
                    backgroundImage: `url(${URL.createObjectURL(formik.values.video)})`,
                    backgroundSize: 'cover'
                  }}
                ></Grid>
              </Grid>
            )}
 */}          </CardContent>
        </form>
      </Card>
    );
  } else {
    return <Typography>You cant add Lesson</Typography>;
  }
};
export default LessonSetting;
