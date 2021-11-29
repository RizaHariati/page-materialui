import { FormControl, MenuItem, Select, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Map from "./components/Map";
import RightBar from "./components/RightBar";
import Stats from "./components/Stats";

import useFetchData from "./fetch/useFetchData";
import "./styles/App.css";

const App = () => {
  const { countries, loading, mostDeaths, liveCases } = useFetchData();
  const [selected, setSelected] = useState(`ID`);
  const handleChange = (event) => {
    event.preventDefault();
    setSelected(event.target.value);
  };
  if (loading) return <div>loading</div>;
  else {
    return (
      <div className="app">
        <div className="app__left">
          <div className="app__header">
            <Typography variant="h4" color="primary">
              COVID19 Tracker
            </Typography>
            <FormControl className="app__dropdown">
              <Select
                variant="outlined"
                value={selected}
                onChange={handleChange}
              >
                <MenuItem value={selected}>ID</MenuItem>
                {countries.map((item, index) => {
                  const { name, value } = item;
                  return (
                    <MenuItem value={value} key={index}>
                      {name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <Stats selected={selected} setSelected={setSelected} />
          <Map />
        </div>
        <RightBar mostDeaths={mostDeaths} liveCases={liveCases} />
      </div>
    );
  }
};

export default App;
