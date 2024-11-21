import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';

import { DialogProps } from '@mui/material/Dialog';
import { REMOVE_LESSON } from '@/graphql/lesson/mutations';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { LESSONS_BY_EMAIL } from '@/graphql/lesson/queries';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '@/store/store';
import { lessonActions } from '@/store/reducers/slices/lessonSlice';
// ===============================|| SELECTION ROW ||=============================== //

interface ConfirmationDialogRawProps extends DialogProps {
  lesson: { title: string; video: string; pdf: string };
  open: boolean;
}

export default function ConfirmationDeleteSelectionDialog({ lesson, open }: ConfirmationDialogRawProps) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { setOpenDeleteConfirmDialog } = lessonActions;
  const {
    lami1aViewer: { email }
  } = useSelector((state: RootStateType) => state.viewer);
  const [RemoveLesson, { data: dataRemoveLesson, error: errorRemoveLesson, loading: loadingRemoveLesson }] = useMutation(REMOVE_LESSON, {
    refetchQueries: [
      {
        query: LESSONS_BY_EMAIL,
        variables: {
          email
        }
      }
    ]
  });

  const handleCancel = () => {
    dispatch(setOpenDeleteConfirmDialog({ open: false }));
  };

  const handleDelete = () => {
    try {
      RemoveLesson({
        variables: { input: lesson }
      });
      //             refetch()
    } catch (error) {
      throw error;
    }
  };
  React.useEffect(() => {
    if (dataRemoveLesson && dataRemoveLesson.success && !errorRemoveLesson && !loadingRemoveLesson) {
      toast.info('the lesson is removed');
      dispatch(setOpenDeleteConfirmDialog({ open: false }));
    }
  }, [dataRemoveLesson, errorRemoveLesson, loadingRemoveLesson]);

  return (
    <Dialog aria-labelledby="confirmation-dialog-title" open={open}>
      {open && (
        <>
          <DialogTitle id="confirmation-dialog-title">Phone Ringtone</DialogTitle>
          <DialogContent dividers>
            <Typography>`confirm to delete lesson {lesson['title']}` </Typography>
          </DialogContent>
          <DialogActions sx={{ pr: 2.5, pt: 2.5 }}>
            <Button sx={{ color: theme.palette.error.dark }} autoFocus color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" size="small" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
