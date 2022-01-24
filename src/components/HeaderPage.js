import React from 'react';
import './HeaderPage.css'

const HeaderPage = (props) => (
   
    <header className='headerPage'>
        <input className={props.isValid ? 'iputSearch' : 'iputSearchError' }
        onChange = {props.change}
         type="text"  
         placeholder='search city'/>
        <button onClick={props.click}>send</button>
        
    </header>
);
export default HeaderPage; 
 