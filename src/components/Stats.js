import { Card, CardContent, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";

const Stats = ({ selected }) => {
  const [cases, setCases] = useState({ cases: 0, total: 0 });
  const [recovered, setRecovered] = useState({ cases: 0, total: 0 });
  const [deaths, setDeaths] = useState({ cases: 0, total: 0 });

  const fetchData = async (id) => {
    try {
      const res = await fetch(`https://disease.sh/v3/covid-19/countries/${id}`);
      const data = await res.json();

      const {
        todayCases,
        todayDeaths,
        todayRecovered,
        cases,
        deaths,
        recovered,
      } = data;
      setCases({ cases: todayCases, total: cases });
      setRecovered({ cases: todayRecovered, total: recovered });
      setDeaths({ cases: todayDeaths, total: deaths });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(selected);
  }, [selected]);
  return (
    <div className="app__stats">
      <InfoBox
        title={"Corona virus cases"}
        cases={cases.cases || 0}
        total={cases.total}
      />
      <InfoBox
        title={"Deaths"}
        cases={deaths.cases || 0}
        total={deaths.total}
      />
      <InfoBox
        title={"Recovered"}
        cases={recovered.cases || 0}
        total={recovered.total}
      />
    </div>
  );
};

export default Stats;

const InfoBox = ({ title, cases, total }) => {
  return (
    <Card className="info-box" variant="outlined">
      <CardContent className="app_card">
        <Typography variant="subtitle1" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="h5" color="textPrimary">
          {cases.toLocaleString()}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {total.toLocaleString()} total
        </Typography>
      </CardContent>
    </Card>
  );
};
