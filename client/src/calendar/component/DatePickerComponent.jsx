import DatePicker from 'react-datepicker';
import { Error } from './';
import 'react-datepicker/dist/react-datepicker.css';

export const DatePickerComponent = ({
  end, error, isDateIncorrect, onDateChange, start,
}) => (
  <>
    <div className="mt-3 mb-1">
      <label htmlFor={'datePicker'} className="block text-gray-700 text-sm font-bold mb-2">
        Start time and date
      </label>
      <DatePicker
        className="shadow appearance-none border rounded w-full py-2
           px-3 text-gray-700 leading-tight focus:outline-none
            focus:shadow-outline mb-2"
        minDate={start}
        showTimeSelect
        dateFormat="Pp"
        selected={start}
        onChange={(event) => onDateChange(event, 'start')}
        placeholderText="start time and date"
      />
    </div>

    <div className="mb-1">
      <label htmlFor={'datePicker'} className="block text-gray-700 text-sm font-bold mb-2">
        End time and date
      </label>
      <DatePicker
        className={`shadow appearance-none border rounded w-full
         py-2 px-3 text-gray-700 leading-tight focus:outline-none
          focus:shadow-outline mb-2 ${
            error
            && isDateIncorrect
            && 'bg-orange-100 border-l-4 border-orange-500 focus:border-orange-500 animate__bounceIn'
          }`}
        minDate={start}
        dateFormat="Pp"
        showTimeSelect
        selected={end}
        onChange={(event) => onDateChange(event, 'end')}
        placeholderText="start time and date"
      />
      {error && isDateIncorrect && <Error message={`please add a valid date after ${start}`} />}
    </div>
  </>
);
