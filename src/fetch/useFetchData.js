import { useState, useEffect } from "react";
import axios from "axios";
const URL = "https://disease.sh/v3/covid-19/countries";

const useFetchData = () => {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false);
  const [mostDeaths, setMostDeaths] = useState([]);
  const [liveCases, setLiveCases] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line
    let cancel;
    setLoading(true);
    setError(false);

    axios({
      method: "GET",
      url: URL,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        const data = res.data;
        const cases = [
          ...new Set(
            data.map((item) => [item.todayCases, item.country, item.active])
          ),
        ];
        const casesSort = cases.sort((a, b) => {
          return b[0] - a[0];
        });
        const bigSix = casesSort.slice(0, 6);
        setLiveCases(data);
        setMostDeaths(bigSix);
        const countries = res.data.map((item) => {
          const { country, countryInfo } = item;
          return { name: country, value: countryInfo.iso2 };
        });

        setCountries(countries);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isAxiosError) {
          console.log(err);
          setError(true);
          setLoading(false);
        }
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);
  return { countries, loading, error, mostDeaths, liveCases };
};

export default useFetchData;
