import React from 'react';

const ViewSelector = props => {

    const smallUrl = `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;
    const bigUrl = `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;

    return (
        <div style={{display:'flex', justifyContent:'center', paddingTop:'100px'}}>
            <button
                className="btn btn-success"
                onClick={() => props.onViewSelect(smallUrl)}
            >
                32 Элемента
            </button>
            <button
                className="btn btn-warning"
                onClick={() => props.onViewSelect(bigUrl)}
            >
                1000 Элементов
            </button>
        </div>
    );
}
 
export default ViewSelector;