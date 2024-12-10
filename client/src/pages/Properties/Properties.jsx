import React, { useState } from "react";
import { Collapse, Button, TextInput, NumberInput, Paper, Group } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { PuffLoader } from "react-spinners";
import useProperties from "../../hooks/useProperties";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

const Properties = () => {
  const { data = [], isError, isLoading } = useProperties();

  const [filter, setFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [rooms, setRooms] = useState(""); // Start with an empty string for flexible input
  const [bathrooms, setBathrooms] = useState(""); // Start with an empty string
  const [parking, setParking] = useState(""); // Start with an empty string
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(true);

  const toggleFilters = () => {
    setIsFiltersCollapsed((prevState) => !prevState);
  };

  const handleFilterChange = (value, filterType) => {
    switch (filterType) {
      case "priceMin":
        setPriceRange([+value || 0, priceRange[1]]);
        break;
      case "priceMax":
        setPriceRange([priceRange[0], +value || Infinity]);
        break;
      case "rooms":
        setRooms(value);  // Dynamically set rooms filter
        break;
      case "bathrooms":
        setBathrooms(value);  // Dynamically set bathrooms filter
        break;
      case "parking":
        setParking(value);  // Dynamically set parking filter
        break;
      case "city":
        setCity(value.toLowerCase());
        break;
      case "country":
        setCountry(value.toLowerCase());
        break;
      default:
        break;
    }
  };

  // Apply dynamic filtering based on user input
  const filteredData = data.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(filter.toLowerCase()) ||
      property.city.toLowerCase().includes(filter.toLowerCase()) ||
      property.country.toLowerCase().includes(filter.toLowerCase());
    const matchesPrice =
      property.price >= priceRange[0] && property.price <= priceRange[1];

    // Apply room, bathroom, and parking filters
    const matchesRooms =
      rooms === "" || property.rooms >= parseInt(rooms, 10); // Compare with >= value entered
    const matchesBathrooms =
      bathrooms === "" || property.bathrooms >= parseInt(bathrooms, 10); // Compare with >= value entered
    const matchesParking =
      parking === "" || property.parking >= parseInt(parking, 10); // Compare with >= value entered

    const matchesCity = city === "" || property.city.toLowerCase() === city;
    const matchesCountry =
      country === "" || property.country.toLowerCase() === country;

    return (
      matchesSearch &&
      matchesPrice &&
      matchesRooms &&
      matchesBathrooms &&
      matchesParking &&
      matchesCity &&
      matchesCountry
    );
  });

  if (isError) {
    return (
      <div className="wrapper flex justify-center items-center h-screen">
        <span className="text-red-500 text-lg font-semibold">
          Error while fetching data
        </span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flex justify-center items-center h-screen">
        <PuffLoader size={60} color="#4066ff" aria-label="loading" />
      </div>
    );
  }

  return (
    <div className="wrapper p-4 space-y-6">
      {/* Search Bar */}
      <div className="max-w-3xl mx-auto">
        <TextInput
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search by title, city, or country"
          className="w-full"
          radius="md"
          size="lg"
        />
      </div>

      {/* Filters Section */}
      <div className="max-w-5xl mx-auto">
        <Paper shadow="md" radius="md" className="p-4">
          <Group position="apart" onClick={toggleFilters} className="cursor-pointer">
            <h2 className="text-lg font-semibold">Filters</h2>
            {isFiltersCollapsed ? (
              <IconChevronDown size={24} />
            ) : (
              <IconChevronUp size={24} />
            )}
          </Group>

          <Collapse in={!isFiltersCollapsed}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <NumberInput
                label="Min Price"
                placeholder="Min Price"
                onChange={(value) => handleFilterChange(value, "priceMin")}
                className="col-span-1"
              />
              <NumberInput
                label="Max Price"
                placeholder="Max Price"
                onChange={(value) => handleFilterChange(value, "priceMax")}
                className="col-span-1"
              />
              <TextInput
                label="City"
                placeholder="City"
                onChange={(e) => handleFilterChange(e.target.value, "city")}
                className="col-span-1"
                value={city}
              />
              <TextInput
                label="Country"
                placeholder="Country"
                onChange={(e) => handleFilterChange(e.target.value, "country")}
                className="col-span-1"
                value={country}
              />
            </div>
          </Collapse>
        </Paper>
      </div>

      {/* Properties Listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredData.map((card, i) => (
          <PropertyCard card={card} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Properties;











// import React, { useState } from "react";
// import SearchBar from "../../components/SearchBar/SearchBar";
// import "./Properties.css";
// import useProperties from "../../hooks/useProperties";
// import { PuffLoader } from "react-spinners";
// import PropertyCard from "../../components/PropertyCard/PropertyCard";
// const Properties = () => {
//   const { data, isError, isLoading } = useProperties();
//   const [filter, setFilter] = useState("");
//   if (isError) {
//     return (
//       <div className="wrapper">
//         <span>Error while fetching data</span>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="wrapper flexCenter" style={{ height: "60vh" }}>
//         <PuffLoader
//           height="80"
//           width="80"
//           radius={1}
//           color="#4066ff"
//           aria-label="puff-loading"
//         />
//       </div>
//     );
//   }
//   return (
//     <div className="wrapper">
//       <div className="flexColCenter paddings innerWidth properties-container">
//         <SearchBar filter={filter} setFilter={setFilter} />

//         <div className="paddings flexCenter properties">
//           {
//             // data.map((card, i)=> (<PropertyCard card={card} key={i}/>))

//             data
//               .filter(
//                 (property) =>
//                   property.title.toLowerCase().includes(filter.toLowerCase()) ||
//                   property.city.toLowerCase().includes(filter.toLowerCase()) ||
//                   property.country.toLowerCase().includes(filter.toLowerCase())
//               )
//               .map((card, i) => (
//                 <PropertyCard card={card} key={i} />
//               ))
//           }
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Properties;
