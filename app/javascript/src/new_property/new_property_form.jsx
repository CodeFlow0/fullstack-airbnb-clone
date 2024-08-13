import React, { useState } from 'react';

console.log('new_property_form.jsx is loaded');

const NewPropertyForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [images, setImages] = useState([]);

  const getCsrfToken = () => {
    const metaTag = document.querySelector('meta[name="csrf-token"]');
    return metaTag ? metaTag.getAttribute('content') : '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('property[title]', title);
    formData.append('property[description]', description);
    formData.append('property[city]', city);
    formData.append('property[country]', country);
    formData.append('property[property_type]', propertyType);
    formData.append('property[price_per_night]', pricePerNight);
    formData.append('property[max_guests]', maxGuests);
    formData.append('property[bedrooms]', bedrooms);
    formData.append('property[beds]', beds);
    formData.append('property[baths]', baths);
    for (let i = 0; i < images.length; i++) {
      formData.append('property[images][]', images[i]);
    }

    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'X-CSRF-Token': getCsrfToken(), // Include the CSRF token in the headers
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Property created:', data);
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>City</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </div>
      <div>
        <label>Country</label>
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
      </div>
      <div>
        <label>Property Type</label>
        <input type="text" value={propertyType} onChange={(e) => setPropertyType(e.target.value)} />
      </div>
      <div>
        <label>Price Per Night</label>
        <input type="number" value={pricePerNight} onChange={(e) => setPricePerNight(e.target.value)} />
      </div>
      <div>
        <label>Max Guests</label>
        <input type="number" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} />
      </div>
      <div>
        <label>Bedrooms</label>
        <input type="number" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
      </div>
      <div>
        <label>Beds</label>
        <input type="number" value={beds} onChange={(e) => setBeds(e.target.value)} />
      </div>
      <div>
        <label>Baths</label>
        <input type="number" value={baths} onChange={(e) => setBaths(e.target.value)} />
      </div>
      <div>
        <label>Images</label>
        <input type="file" multiple onChange={(e) => setImages(e.target.files)} />
      </div>
      <button type="submit">Add Property</button>
    </form>
  );
};

export default NewPropertyForm;
