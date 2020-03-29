import React from 'react';

const Contacts = ({data}) => {
    return(
        <li>
            {data.map(n => <ul key={n.name}>{n.name} {n.number}</ul>)}
        </li>
    )
}


export default Contacts;