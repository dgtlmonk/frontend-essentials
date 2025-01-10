import { use } from "react";

const api =
  "https://openlibrary.org/api/books?bibkeys=ISBN:0201558025,LCCN:93005405&format=json";

const fetchData = fetch(api).then((res) => res.json());

const WithUse = () => {
  const data = use(fetchData);
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default function WithUseHook() {
  return <WithUse />;
}
