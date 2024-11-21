import { useEffect, useRef, useState, ReactElement } from 'react';

// material-ui
import { Button, Dialog, Theme, useMediaQuery } from '@mui/material';

// third-party
import FullCalendar, { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';

import Layout from 'layout';
import Page from '@/components/shared/Page';
import MainCard from '@/components/shared/cards/MainCard';
import SubCard from '@/components/shared/cards/SubCard';
import CalendarStyled from '@/components/_application/calendar/CalendarStyled';
import Toolbar from '@/components/_application/calendar/Toolbar';
import AddEventForm from '@/components/_application/calendar/AddEventForm';
import { DateRange } from '@/api/viewer/viewer.types';

// assets
import AddAlarmTwoToneIcon from '@mui/icons-material/AddAlarmTwoTone';
import { FormikValues } from 'formik';

// ==============================|| APPLICATION CALENDAR ||============================== //

const Calendar = () => {
  const {
    state: { events },
    setEvents
  } = useViewer();
  const calendarRef = useRef<FullCalendar>(null);
  const matchSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(matchSm ? 'listWeek' : 'dayGridMonth');

  // calendar toolbar events
  const handleDateToday = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleViewChange = (newView: string) => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  // set calendar view
  useEffect(() => {
    handleViewChange(matchSm ? 'listWeek' : 'dayGridMonth');
  }, [matchSm]);

  const handleDatePrev = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleDateNext = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<DateRange | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<FormikValues | null>(null);

  // calendar event select/add/edit/delete
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setSelectedRange(null);
  };

  const handleRangeSelect = (arg: DateSelectArg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }

    setSelectedRange({
      start: arg.start,
      end: arg.end
    });
    setIsModalOpen(true);
  };

  const handleEventSelect = (arg: EventClickArg) => {
    if (arg.event.id) {
      const selectEvent = events.find((_event: FormikValues) => _event.id === arg.event.id);
      setSelectedEvent(selectEvent as FormikValues[]);
    } else {
      setSelectedEvent(null);
    }
    setIsModalOpen(true);
  };

  const handleEventUpdate = async ({ event }: EventResizeDoneArg | EventDropArg) => {
    try {
      /* dispatch(
        updateEvent({
          eventId: event.id,
          update: {
            allDay: event.allDay,
            start: event.start,
            end: event.end
          }
        })
      ); */
    } catch (err) {
      console.error(err);
    }
  };

  const handleEventCreate = async (data: FormikValues) => {
    /* dispatch(addEvent(data)); */
    handleModalClose();
  };

  const handleUpdateEvent = async (eventId: string, update: FormikValues) => {
    /* dispatch(updateEvent({ eventId, update })); */
    handleModalClose();
  };

  const handleEventDelete = async (id: string) => {
    try {
      /*  dispatch(removeEvent(id)); */
      handleModalClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  return (
    <Page title="Calendar">
      <MainCard
        title="Event Calendar"
        secondary={
          <Button color="secondary" variant="contained" onClick={handleAddClick}>
            <AddAlarmTwoToneIcon fontSize="small" sx={{ mr: 0.75 }} />
            Add New Event
          </Button>
        }
      >
        <CalendarStyled>
          <Toolbar
            date={date}
            view={view}
            onClickNext={handleDateNext}
            onClickPrev={handleDatePrev}
            onClickToday={handleDateToday}
            onChangeView={handleViewChange}
          />
          <SubCard>
            <FullCalendar
              weekends
              editable
              droppable
              selectable
              events={events}
              ref={calendarRef}
              rerenderDelay={10}
              initialDate={date}
              initialView={view}
              dayMaxEventRows={3}
              eventDisplay="block"
              headerToolbar={false}
              allDayMaintainDuration
              eventResizableFromStart
              select={handleRangeSelect}
              eventDrop={handleEventUpdate}
              eventClick={handleEventSelect}
              eventResize={handleEventUpdate}
              height={matchSm ? 'auto' : 720}
              plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
            />
          </SubCard>
        </CalendarStyled>

        {/* Dialog renders its body even if not open */}
        <Dialog maxWidth="sm" fullWidth onClose={handleModalClose} open={isModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
          {isModalOpen && (
            <AddEventForm
              event={selectedEvent}
              range={selectedRange}
              onCancel={handleModalClose}
              handleDelete={handleEventDelete}
              handleCreate={handleEventCreate}
              handleUpdate={handleUpdateEvent}
            />
          )}
        </Dialog>
      </MainCard>
    </Page>
  );
};

Calendar.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Calendar;
