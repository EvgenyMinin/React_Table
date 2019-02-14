import React from 'react';
import './Loader.css';

const Loader = () => {
    return (
        <div style={{display:'flex', justifyContent:'center', paddingTop:'200px'}}>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
}
 
export default Loader;