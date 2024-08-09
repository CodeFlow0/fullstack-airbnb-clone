import React from 'react';
import ReactDOM from 'react-dom';
import NewPropertyForm from './new_property_form';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded'); // Debugging line
  const newPropertyFormDiv = document.getElementById('new-property-form');
  console.log('newPropertyFormDiv:', newPropertyFormDiv); // Debugging line
  if (newPropertyFormDiv) {
    ReactDOM.render(<NewPropertyForm />, newPropertyFormDiv);
    console.log('Component rendered'); // Debugging line
  } else {
    console.log('Element not found'); // Debugging line
  }
});

