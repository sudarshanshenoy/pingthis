
import React, { useState } from 'react';
import './App.css';

function CustomImage({ url, desc }) {

  const [loaded, setLoaded] = useState(false)

  return (
    <React.Fragment>
      <img onLoad={() => setLoaded(true)} className={`gallery-image ${loaded ? 'visible' : 'hide'}`} alt={desc} src={url}></img>
      <div className={`skeleton ${loaded ? 'd-none' : ''}`}></div>
    </React.Fragment>
  )
}

export default CustomImage;
