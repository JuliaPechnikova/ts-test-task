import React from 'react';
import './TimeInterval.css';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CalendarPickerView } from '@mui/x-date-pickers/internals/models/views';
import IconButton from '@mui/material/IconButton';
import { appointmentRange } from '../../type';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

interface TimeIntervalProps {
  onGetEvents(appointmentRange: appointmentRange) : void
}

export const TimeInterval: React.FC<TimeIntervalProps> = (props) => {

  const [value, setValue] = React.useState<Date>(new Date());
  const [period, setPeriod] = React.useState<CalendarPickerView>('day');

  React.useEffect(() => {
    getEvents();
  }, [period])

  const handleChange = (event: SelectChangeEvent) => {
    setPeriod(event.target.value as CalendarPickerView);
  };

  function formatDT(sourceDate: Date) {
    const optionsDay: Intl.DateTimeFormatOptions = { day: 'numeric', month: "long",  year: 'numeric'};
    const optionsMonth: Intl.DateTimeFormatOptions = { month: "long",  year: 'numeric'};
    const optionsYear: Intl.DateTimeFormatOptions = { year: 'numeric'};

    if (period === 'year') {
      return new Intl.DateTimeFormat("ru-RU", optionsYear).format(new Date(sourceDate));
    } else if (period === 'month') {
      return (new Intl.DateTimeFormat("ru-RU", optionsMonth).format(new Date(sourceDate))).slice(0, -3);
    } else {
      return (new Intl.DateTimeFormat("ru-RU", optionsDay).format(new Date(sourceDate))).slice(0, -3);
    }
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    getEvents();
  }

  function getEvents() {
    props.onGetEvents({
      from: value === null ? "" : 
        period === 'year' ? new Date(value.getFullYear(),0,1,3,0,0,0).toISOString() :
        period === 'month' ? new Date(value.getFullYear(),value.getMonth(),1,3,0,0,0).toISOString() :
        new Date(value.getFullYear(),value.getMonth(),value.getDate(),3,0,0,0).toISOString(),
      to: value === null ? "" : 
        period === 'year' ? new Date(value.getFullYear() + 1,0,0,26,59,59,999).toISOString() :
        period === 'month' ? new Date(value.getFullYear(),value.getMonth() + 1,0,26,59,59,999).toISOString() :
        new Date(value.getFullYear(),value.getMonth(),value.getDate(),26,59,59,999).toISOString()
    })
  }

  function handleDecreaseValue() {
    if (period === 'year') {
      setValue(new Date(value.getFullYear() - 1,value.getMonth(),value.getDate()))
    } else if (period === 'month') {
      setValue(new Date(value.getFullYear(),value.getMonth() - 1,value.getDate()))
    } else {
      setValue(new Date(value.getFullYear(),value.getMonth(),value.getDate() - 1))}
  }

  function handleIncreaseValue() {
    if (period === 'year') {
      setValue(new Date(value.getFullYear() + 1,value.getMonth(),value.getDate()))
    } else if (period === 'month') {
      setValue(new Date(value.getFullYear(),value.getMonth() + 1,value.getDate()))
    } else {
      setValue(new Date(value.getFullYear(),value.getMonth(),value.getDate() + 1))}
  }


  return (
    <div className="timeinterval">
      <Box onSubmit={handleSubmit} component="form" className="timeinterval__form" noValidate >
        <IconButton sx={{p: 0}} onClick={handleDecreaseValue} type="submit">
          <ArrowForwardIosRoundedIcon sx={{ maxWidth: 17}} className="timeinterval__arrow-button_toward"/>
        </IconButton>
        <IconButton sx={{p: 0}} onClick={handleIncreaseValue} type="submit">
          <ArrowForwardIosRoundedIcon sx={{ maxWidth: 17}}/>
        </IconButton>
        <time className="timeinterval__date">{formatDT(value)}</time>
        <FormControl size="small" sx={{ fontSize: 10, fontFamily: 'sans-serif' }}>
          <Select 
            labelId="select-label"
            id="select"
            value={period}
            onChange={handleChange}
          >
            <MenuItem value={'day'}>День</MenuItem>
            <MenuItem value={'month'}>Месяц</MenuItem>
            <MenuItem value={'year'}>Год</MenuItem>
          </Select>
        </FormControl>
        {/* <IconButton sx={{ml: 1}}>
          <ArrowForwardIcon />
        </IconButton> */}
      </Box>
     </div>
  );
}




