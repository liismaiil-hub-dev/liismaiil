import React, { useEffect, useState, useLayoutEffect, useRef, ReactElement } from 'react';

// material-ui
import { useTheme, styled, Theme } from '@mui/material/styles';
import {
  Box,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import Layout from 'layout';
import Page from '@/components/shared/Page';
import UserDetails from '@/components/dashboard/chat/UserDetails';
import ChatDrawer from '@/components/dashboard/chat/ChatDrawer';
import ChartHistory from '@/components/dashboard/chat/ChartHistory';
import AvatarStatus from '@/components/dashboard/chat/AvatarStatus';

import MainCard from '@/components/shared/cards/MainCard';
import Avatar from '@/components/shared/extended/Avatar';
import { appDrawerWidth as drawerWidth, gridSpacing } from '@/store/constants/constants';

// assets
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import VideoCallTwoToneIcon from '@mui/icons-material/VideoCallTwoTone';
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';

import { History as HistoryProps } from 'types/chat';
//import EmojiPicker from '@/components/shared/third-party/EmojiPicker';
import useMessage from '@/store/hooks/useMessage';
import useConfig from '@/store/hooks/useConfig';
import { useSelector } from 'react-redux';
import { RootStateType } from '@/store/store';
import { viewerActions } from '@/store/reducers/slices/viewerSlice';

const avatarImage = '/assets/images/users';

// drawer content element
const Main = styled('main', { shouldForwardProp: (prop: string) => prop !== 'open' })(
  ({ theme, open }: { theme: Theme; open: boolean }) => ({
    flexGrow: 1,
    paddingLeft: open ? theme.spacing(3) : 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter
    }),
    marginLeft: `-${drawerWidth}px`,
    [theme.breakpoints.down('lg')]: {
      paddingLeft: 0,
      marginLeft: 0
    },
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shorter
      }),
      marginLeft: 0
    })
  })
);

// ==============================|| APPLICATION CHAT ||============================== //

const ChatMainPage = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('lg'));
  const {
    lami1aViewer: { email },
    messages
  } = useSelector((state: RootStateType) => state.viewer);

  const { setConversation } = viewerActions;
  const scrollRef = useRef();

  useLayoutEffect(() => {
    if (scrollRef?.current) {
      // @ts-ignore
      scrollRef.current.scrollIntoView();
    }
  });

  // handle right sidebar dropdown menu
  const [anchorEl, setAnchorEl] = React.useState<Element | ((element: Element) => Element) | null | undefined>(null);
  const handleClickSort = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleCloseSort = () => {
    setAnchorEl(null);
  };

  // set chat details page open when user is selected from sidebar
  const [emailDetails, setEmailDetails] = React.useState(false);
  const handleUserChange = (event: React.SyntheticEvent) => {
    setEmailDetails((prev) => !prev);
  };

  // toggle sidebar
  const [openChatDrawer, setOpenChatDrawer] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpenChatDrawer((prevState) => !prevState);
  };

  // close sidebar when widow size below 'md' breakpoint
  useEffect(() => {
    setOpenChatDrawer(!matchDownSM);
  }, [matchDownSM]);

  const { onChangeDrawer } = useConfig();
  const [data, setData] = React.useState<HistoryProps[]>([]);
  const { messages: messagesContext } = useMessage();
  /* 
    useEffect(() => {
      setUser(chatState.user);
    }, [chatState.user]);
  
    useEffect(() => {
      setData(chatState.chats);
    }, [chatState.chats]);
   */
  useEffect(() => {
    // hide left drawer when email app opens
    onChangeDrawer({ drawerOpen: false, drawerType: 'default' });
    /*  dispatch(getUser(1)); */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* useEffect(() => {
    dispatch(getUserChats(user.name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
 */
  // handle new message form
  const [message, setMessage] = useState('');
  const handleOnSend = () => {
    const d = new Date();
    setMessage('');
    const newMessage = {
      from: 'User1',
      to: user.name,
      text: message,
      time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    /*  setData((prevState) => [...prevState, newMessage]);
     dispatch(insertChat(newMessage)); */
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLDivElement> | undefined) => {
    if (event?.key !== 'Enter') {
      return;
    }
    handleOnSend();
  };

  const [user, setUser] = useState('');

  if (!email) return <Typography>Loading...</Typography>;

  return (
    <Page title="Chat">
      <Box sx={{ display: 'flex' }}>
        <ChatDrawer openChatDrawer={openChatDrawer} handleDrawerOpen={handleDrawerOpen} setUser={setUser} />
        <Main theme={theme} open={openChatDrawer}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs zeroMinWidth sx={{ display: emailDetails ? { xs: 'none', sm: 'flex' } : 'flex' }}>
              <MainCard
                sx={{
                  bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'grey.50'
                }}
              >
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={0.5}>
                      <Grid item>
                        <IconButton onClick={handleDrawerOpen} size="large">
                          <MenuRoundedIcon />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <Grid container spacing={2} alignItems="center" sx={{ flexWrap: 'nowrap' }}>
                          <Grid item>{/*   <Avatar alt={user.name} src={user.avatar && `${avatarImage}/${user.avatar}`} /> */}</Grid>
                          <Grid item sm zeroMinWidth>
                            <Grid container spacing={0} alignItems="center">
                              <Grid item xs={12}>
                                <Typography variant="h4" component="div">
                                  {user} {/* {user.online_status && <AvatarStatus status={user.online_status} /> } */}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="subtitle2">Last seen user-lastMessage</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item sm zeroMinWidth />
                      <Grid item>
                        <IconButton size="large">
                          <CallTwoToneIcon />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton size="large">
                          <VideoCallTwoToneIcon />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton onClick={handleUserChange} size="large">
                          <ErrorTwoToneIcon />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton onClick={handleClickSort} size="large">
                          <MoreHorizTwoToneIcon />
                        </IconButton>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleCloseSort}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                          }}
                        >
                          <MenuItem onClick={handleCloseSort}>Name</MenuItem>
                          <MenuItem onClick={handleCloseSort}>Date</MenuItem>
                          <MenuItem onClick={handleCloseSort}>Ratting</MenuItem>
                          <MenuItem onClick={handleCloseSort}>Unread</MenuItem>
                        </Menu>
                      </Grid>
                    </Grid>
                    <Divider sx={{ mt: theme.spacing(2) }} />
                  </Grid>
                  <PerfectScrollbar style={{ width: '100%', height: 'calc(100vh - 440px)', overflowX: 'hidden', minHeight: 525 }}>
                    <CardContent>
                      <ChartHistory theme={theme} user={user} data={data} />
                      {/* @ts-ignore */}
                      <span ref={scrollRef} />
                    </CardContent>
                  </PerfectScrollbar>
                  <Grid item xs={12}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs zeroMinWidth>
                        <OutlinedInput
                          fullWidth
                          value={message}
                          onKeyPress={handleEnter}
                          onChange={(event) => setMessage(event.target.value)}
                          placeholder="Type a message"
                          /* startAdornment={
                            <InputAdornment position="start">
                              <EmojiPicker value={message} setValue={setMessage} />
                            </InputAdornment> 
                          }*/
                          endAdornment={
                            <Stack direction="row" spacing={1} alignItems="center">
                              <IconButton>
                                <AttachmentTwoToneIcon style={{ fontSize: '1.25rem' }} />
                              </IconButton>
                              <IconButton color="primary" onClick={handleOnSend}>
                                <SendTwoToneIcon style={{ fontSize: '1.25rem' }} />
                              </IconButton>
                            </Stack>
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
            {emailDetails && (
              <Grid item sx={{ margin: { xs: '0 auto', md: 'initial' } }}>
                <Box sx={{ display: { xs: 'block', sm: 'none', textAlign: 'right' } }}>
                  <IconButton onClick={handleUserChange} sx={{ mb: -5 }} size="large">
                    <HighlightOffTwoToneIcon />
                  </IconButton>
                </Box>
                <UserDetails user={user} />
              </Grid>
            )}
          </Grid>
        </Main>
      </Box>
    </Page>
  );
};

ChatMainPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ChatMainPage;
