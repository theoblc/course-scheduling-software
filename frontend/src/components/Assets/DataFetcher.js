// Bibliothèques
import { useEffect, useState } from "react";

// Code
function DataFetcher(urlFetch) {
  const [data, setData] = useState([]);

  async function fetchData() {
    const raw_data = await fetch(urlFetch);
    const res = await raw_data.json();
    setData(res);
  }

  useEffect(() => {
    fetchData().catch(console.error);
    // eslint-disable-next-line
  }, []);

  return { data, fetchData };
}

export default DataFetcher;
