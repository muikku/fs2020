import React from 'react';

const Persons = ({data, filter}) => {
    
    return(
        <div>
            {data
            .filter(e => e.name.toLowerCase().includes(filter.toLowerCase()))
            .map(n => <div key={n.name}>{n.name} {n.number}</div>)}
        </div>
    )
    
}


export default Persons;