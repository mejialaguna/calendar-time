import { useState, useEffect, useCallback } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import es from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from '../../hooks';
import { TitleAndNotes } from './TitleAndNotes';
import { Error } from './Error';

registerLocale('es', es);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    // transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent, startDeletingEvent } = useCalendarStore();
  const [isMessageNew, setIsMessageNew] = useState({
    isValidNewMessage: true,
    message: '',
  });
  const [isValid, setIsValid] = useState({
    isValidTitle: true,
    isValidDates: true,
    message: '',
  });

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
    setIsValid((prev) => ({
      ...prev,
      isValidTitle: true,
      message: '',
    }));

    setIsMessageNew((prev) => ({
      ...prev,
      isValidNewMessage: true,
      message: '',
    }));
  };

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });

    setIsValid((prev) => ({
      ...prev,
      isValidDates: true,
      message: '',
    }));
  };

  const onCloseModal = () => {
    closeDateModal();
  };

  const isEventUnchanged = (formValuesEvent, currentActiveEvent) => {
    const formValuesMap = new Map(Object.entries(formValuesEvent));
    return (
      formValuesMap.get('title') === currentActiveEvent?.title && formValuesMap.get('notes') === currentActiveEvent?.notes
      && formValuesMap.get('end') === currentActiveEvent?.end && formValuesMap.get('start') === currentActiveEvent?.start
    );
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const difference = differenceInSeconds(formValues.end, formValues.start);

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(difference) || difference <= 0) {
      setIsValid((prev) => ({
        ...prev,
        isValidDates: false,
        message: 'Wrong dates, please check the dates picked.',
      }));
      return;
    }

    if (formValues.title.length <= 0) {
      setIsValid((prev) => ({
        ...prev,
        isValidTitle: false,
        message: 'add an Event Title.',
      }));
      return;
    }

    if (isEventUnchanged(formValues, activeEvent)) {
      setIsMessageNew({
        isValidNewMessage: false,
        message: 'theres no changes to be made...',
      });
      return;
    }

    await startSavingEvent(formValues);
    setIsValid(isValid);
    closeDateModal();
  };

  const deleteEvent = async () => {
    await startDeletingEvent();
    closeDateModal();
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <div className="w-full max-w-md mx-auto">
        <h1 className="mb-4"> New Event </h1>
        {/* <hr /> */}
        <form className="bg-white shadow border rounded px-8 pb-8" onSubmit={onSubmit}>
          <div className="mt-3 mb-1">
            <label htmlFor={'datePicker'} className="block text-gray-700 text-sm font-bold mb-2">
              Start time and date
            </label>
            <DatePicker
              selected={formValues.start}
              onChange={(event) => onDateChanged(event, 'start')}
              className="shadow appearance-none border rounded w-full py-2
           px-3 text-gray-700 leading-tight focus:outline-none
            focus:shadow-outline mb-2"
              dateFormat="Pp"
              // minDate={start}
              showTimeSelect
              locale="en"
              placeholderText="start time and date"
              timeCaption="time"
            />
          </div>

          <div className="mb-1">
            <label htmlFor={'datePicker'} className="block text-gray-700 text-sm font-bold mb-2">
              End time and date
            </label>
            <DatePicker
              minDate={formValues.start}
              selected={formValues.end}
              onChange={(event) => onDateChanged(event, 'end')}
              className={`shadow appearance-none border rounded w-full
         py-2 px-3 text-gray-700 leading-tight focus:outline-none
          focus:shadow-outline mb-2`}
              dateFormat="Pp"
              showTimeSelect
              placeholderText="start time and date"
              locale="en"
              timeCaption="time"
            />
          </div>
          {!isValid.isValidDates ? (
            <small id="emailHelp">
              <Error message={isValid.message} />
            </small>
          ) : null}

          <hr />
          {!isMessageNew.isValidNewMessage ? <Error message={isMessageNew.message} /> : null}
          <TitleAndNotes formValues={formValues} onInputChanged={onInputChanged} isValid={isValid} />

          <div className="flex items-center justify-center gap-2">
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold cursor-pointer
               py-2 px-4 rounded  focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {activeEvent?.messageId || activeEvent?.id ? 'Update' : 'Save'}
            </button>

            {(activeEvent?.messageId || activeEvent?.id) && (
              <button
                type="button"
                className="bg-red-900 w-full hover:bg-red-700 text-white font-bold cursor-pointer
                 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={deleteEvent}
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}; //674a272f1737eff82df9c7fc
