import React from 'react';

const Filter = ({onSearchFieldChange, search}) => {
    return (
        <div>
            filter shown with
            <input onChange={onSearchFieldChange} value={search} />
        </div>
    )
}

export default Filter;