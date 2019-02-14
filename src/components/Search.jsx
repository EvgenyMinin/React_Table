import React, { useState } from 'react';

const Search = props => {

    const [value, setValue] = useState('');
    const handleChangeValue = event => {
        setValue(event.target.value)
    }

    return (
        <div className="form-inline my-3" style={{display:'flex', justifyContent:'flex-end'}}>
            <input 
                className="form-control mr-sm-2"
                type="text" placeholder="Поиск..."
                value={value}
                onChange={handleChangeValue}

            />
            <button
                className="btn btn-outline-success my-2 my-sm-0"
                onClick={() => props.onSearch(value)}
            >
                Найти
            </button>
        </div>
    );
}
 
export default Search;