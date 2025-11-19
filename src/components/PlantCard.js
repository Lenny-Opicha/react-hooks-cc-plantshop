import React, { useState } from "react";

function PlantCard({ plant }) {
  const [isSoldOut, setIsSoldOut] = useState(false);

  return (
    <div className="plant-card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>

      {/* TEST expects "Price: 15.99" (NO dollar sign) */}
      <p>Price: {plant.price}</p>

      <button onClick={() => setIsSoldOut(!isSoldOut)}>
        {isSoldOut ? "Sold Out" : "In Stock"}
      </button>

      <button className="delete-btn">🗑️ Delete</button>
    </div>
  );
}

export default PlantCard;
