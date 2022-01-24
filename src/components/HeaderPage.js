import React from 'react';
import './HeaderPage.css'
// zmienić inputSearch "literówka"
// w App zmienic nazwe zmiennej isValid => isApiResponseSuccess
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
 