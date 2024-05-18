import axios from 'axios';
import { GET_DOMAINS_FRONT } from '@/graphql/profile/queries';
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GRAPH,
  timeout: 3000,
  headers: { 'X-API-KEY': 'ID-API-KEY' },
});
async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch(process.env.NEXT_PUBLIC_GRAPH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await res.json();

  /*
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
 */
  console.log({ data: json.data });
  console.log({ error: json.error });
  console.log({ loading: json.loading });
  return { data: json.data, error: json.errors, loading: json.loading };
  /* const { data, error, loading } = await axiosInstance.post(JSON.stringify(query));
  console.log(data); */
}

export async function getDomains() {
  const { data, loading, error } = await fetchAPI(GET_DOMAINS_FRONT);
  const { profiles } = data;
  console.log({ datasprofiles: data });
  return { profiles, error, loading };
}
