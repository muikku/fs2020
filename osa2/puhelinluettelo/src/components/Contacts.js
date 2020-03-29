import React from 'react';

const Contacts = ({data, filter}) => {
    
    return(
        <li>
            {data
            .filter(e => e.name.toLowerCase().includes(filter.toLowerCase()))
            .map(n => <ul key={n.name}>{n.name} {n.number}</ul>)}
        </li>
    )
    
}


export default Contacts;