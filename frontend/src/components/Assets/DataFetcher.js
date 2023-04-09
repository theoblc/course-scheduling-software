import { useEffect, useState } from "react";

function DataFetcher(urlFetch) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const raw_data = await fetch(urlFetch);
    const res = await raw_data.json();
    setData(res);
  };

  useEffect(() => {
    fetchData().catch(console.error);
    // eslint-disable-next-line
  }, []);

  return { data, fetchData };
}

export default DataFetcher;
