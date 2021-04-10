import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

const Stepper = () => (
  <div className="stepper-container">
    <Timeline align="left">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="default" color="primary" className="stepper-dots" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Datos Generales</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="default" color="primary" className="stepper-dots" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Configuración</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="default" color="primary" className="stepper-dots" />
        </TimelineSeparator>
        <TimelineContent>Resumen</TimelineContent>
      </TimelineItem>
    </Timeline>
  </div>
);
export default Stepper;
