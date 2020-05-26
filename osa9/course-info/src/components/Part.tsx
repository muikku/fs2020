import React from 'react';
import { CoursePart, assertNever } from '../types';

const Part: React.FC<{ coursePart: CoursePart }> 
  = ({ coursePart }) => {
    switch(coursePart.name){
      case 'Deeper type usage':
        return (
          <div> 
            {coursePart.name} {coursePart.exerciseCount} {coursePart.description} {coursePart.exerciseSubmissionLink}
          </div>
        )
      case 'Fundamentals':
        return (
          <div> 
            {coursePart.name} {coursePart.exerciseCount} {coursePart.description}
          </div>
        )
      case 'Using props to pass data':
        return (
          <div> 
            {coursePart.name} {coursePart.exerciseCount} {coursePart.groupProjectCount}
          </div>
        )
      
      case 'Typescript':
        return (
            <div> 
            {coursePart.name} {coursePart.exerciseCount} {coursePart.description}
          </div>
        )
        default:
          return assertNever(coursePart);
    }

  }

export default Part;