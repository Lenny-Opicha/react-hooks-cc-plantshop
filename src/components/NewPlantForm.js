import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newPlant) => onAddPlant(newPlant));
  }

  return (
    <form className="new-plant-form" onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Plant name"
        onChange={handleChange}
        value={formData.name}
      />
      <input
        name="image"
        placeholder="Image URL"
        onChange={handleChange}
        value={formData.image}
      />
      <input
        type="number"
        name="price"
        step="0.01"
        placeholder="Price"
        onChange={handleChange}
        value={formData.price}
      />
      <button type="submit">Add Plant</button>
    </form>
  );
}

export default NewPlantForm;
