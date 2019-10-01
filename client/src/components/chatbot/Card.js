import React from 'react';

const MyCard = props => (
  <div style={{ float: 'left', paddingRight: 30, width: 340 }}>
    <div className='card blue-grey darken-1'>
      <div className='card-image' style={{ width: 310 }}>
        <img src={props.payload.fields.image.stringValue} alt={props.payload.fields.header.stringValue} />
      </div>
      <div className='card-content white-text'>
        <span className='card-title'>{props.payload.fields.header.stringValue}</span>
        <p>{props.payload.fields.description.stringValue}</p>
        <p></p>
      </div>
      <div className='card-action'>
        <a href={props.payload.fields.link.stringValue} target='_blank' rel='noopener noreferrer'>
          Link
        </a>
      </div>
    </div>
  </div>
);

export default MyCard;
