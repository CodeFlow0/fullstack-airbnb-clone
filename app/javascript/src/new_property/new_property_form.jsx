import React, { useState } from 'react';
// import axios from 'axios';

console.log('new_property_form.jsx is loaded');

const NewPropertyForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('property[name]', name);
    formData.append('property[description]', description);
    formData.append('property[price]', price);
    for (let i = 0; i < images.length; i++) {
      formData.append('property[images][]', images[i]);
    }

    try {
      // const response = await axios.post('/properties', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      // console.log(response.data);

      // Suggestion to use fetch instead of axios
      const response = await fetch('/properties', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
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
