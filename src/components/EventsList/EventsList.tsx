import React from 'react';
import './EventsList.css';
import { Events } from '../../interfaces';

type EventsProps = {
  dayEvents : Events[],
  loadMessage: string
}

export const EventsList: React.FC<EventsProps> = (props) => {

  return (
    props.dayEvents.length === 0 ?
    <p className="eventslist">{props.loadMessage}</p> :
    <ul className="eventslist">
      {props.dayEvents.map((event, index) => {
      return (
      <li key={index}>
        <h3>{(event.Date).toString().slice(0,10)}</h3>
        {event.Appointments.map((appointment) => {
          return (
          <p key={appointment.Id}>{`${appointment.BeginDateTime.toString().slice(0,19).replace('T', ' ')} 
          - ${appointment.EndDateTime.toString().slice(0,19).replace('T', ' ')} | ${appointment.Title}`}</p>)})
          }
      </li>)})}
    </ul>
  );
};