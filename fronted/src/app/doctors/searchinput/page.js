"use client";
import { useState } from "react";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([
    { id: 1, title: "First Box", text: "This is the first box" },
    { id: 2, title: "Second Box", text: "This is the second box" },
    { id: 3, title: "Third Box", text: "This is the third box" },
    { id: 4, title: "Fourth Box", text: "This is the fourth box" },
    { id: 5, title: "Fifth Box", text: "This is the fifth box" },
  ]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredData = data.filter(
    (box) =>
      box.title.toLowerCase().includes(searchTerm) ||
      box.text.toLowerCase().includes(searchTerm) ||
      box.title.toLowerCase().includes(searchTerm) ||
      box.description.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="flex flex-col items-center p-4">
      <input
        type="text"
        placeholder="Search..."
        className="mb-4 p-2 border rounded w-full max-w-md"
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="w-full max-w-md">
        {filteredData.map((box) => (
          <div key={box.id} className="bg-white shadow p-4 rounded mb-4 border">
            <h2 className="text-xl font-bold mb-2">{box.title}</h2>
            <p>{box.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
