import React, { useState } from 'react';

const Airtable = require('airtable');

const base = new Airtable({ apiKey: 'keyGj20G6MYOtAfqI' }).base('appp0PyZuRgpzJBn5');

const initialFormData = Object.freeze({
  name: '',
  post: '',
});

const Form = function Form() {
  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    base('Posts').create([
      {
        fields: {
          Body: formData.post,
          Author: formData.name,
        },
      },
    ]);
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Name:</p>
            <input name="name" onChange={handleChange} />
          </label>
          <label>
            <p>Post:</p>
            <input name="post" onChange={handleChange} />
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
