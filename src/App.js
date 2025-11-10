import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import PlantList from "./components/PlantList";
import NewPlantForm from "./components/NewPlantForm";
import Search from "./components/Search";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch plants from backend
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data))
      .catch((err) => console.error("Error fetching plants:", err));
  }, []);

  // Add a new plant
  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  // Toggle sold-out state (local only for core deliverables)
  function handleToggleSoldOut(id) {
    const updatedPlants = plants.map((plant) =>
      plant.id === id ? { ...plant, soldOut: !plant.soldOut } : plant
    );
    setPlants(updatedPlants);
  }

  // Filter plants by search term
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <NewPlantForm onAddPlant={handleAddPlant} />
      <PlantList plants={filteredPlants} onToggleSoldOut={handleToggleSoldOut} />
    </div>
  );
}

export default App;
