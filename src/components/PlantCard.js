import React, { useState } from "react";

function PlantCard({ plant, onDeletePlant, onUpdatePrice }) {
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(plant.price);

  function toggleSoldOut() {
    setIsSoldOut(!isSoldOut);
  }

  function handleDelete() {
    fetch(`http://localhost:6001/plants/${plant.id}`, { method: "DELETE" })
      .then(() => onDeletePlant(plant.id))
      .catch((error) => console.error("Delete failed:", error));
  }

  function handlePriceUpdate(e) {
    e.preventDefault();
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: parseFloat(newPrice) }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        onUpdatePrice(plant.id, updatedPlant.price);
        setIsEditing(false);
      })
      .catch((error) => console.error("Update failed:", error));
  }

  return (
    <div className="plant-card">
      <img src={plant.image} alt={plant.name} />
      <h3>{plant.name}</h3>

      {isEditing ? (
        <form onSubmit={handlePriceUpdate} className="price-edit-form">
          <input
            type="number"
            step="0.01"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <button type="submit">💾 Save</button>
        </form>
      ) : (
        <p>Price: ${plant.price.toFixed(2)}</p>
      )}

      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancel" : "Edit Price"}
      </button>

      <button onClick={toggleSoldOut}>
        {isSoldOut ? "Sold Out" : "In Stock"}
      </button>

      <button onClick={handleDelete} className="delete-btn">
        🗑️ Delete
      </button>
    </div>
  );
}

export default PlantCard;
