import React from 'react';
import { TimeInterval } from '../TimeInterval/TimeInterval';
import { EventsList } from '../EventsList/EventsList';
import './Main.css';
import { Events } from '../../interfaces';
import { appointmentRange } from '../../type';

interface MainProps {
  onGetEvents(appointmentRange: appointmentRange) : void,
  dayEvents : Events[],
  loadMessage : string
}

export const Main: React.FC<MainProps> = (props) => {
  return (
  <main className="content">
    <TimeInterval onGetEvents={props.onGetEvents}/>
    <EventsList loadMessage={props.loadMessage} dayEvents={props.dayEvents}/>
  </main>
)};
