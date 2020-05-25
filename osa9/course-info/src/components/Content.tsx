import React from 'react';
import { CoursePart } from '../types';
import Part from './Part'

const Content: React.FC<{ courseParts: Array<CoursePart> }> 
  = ({ courseParts }) => 
<div>
{courseParts.map(p => 
        <Part key={p.name} coursePart={p}/>
      )}
</div>

export default Content;