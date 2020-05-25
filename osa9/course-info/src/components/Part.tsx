import React from 'react';
import { CoursePart } from '../types';

const Part: React.FC<{ coursePart: CoursePart }> 
  = ({ coursePart }) => 
<p> 
  {coursePart.name} {coursePart.exerciseCount}
</p>

export default Part;