export * as Serp from "./serp";
import { getJson } from "serpapi";


export async function lens(url: string) {
  
  const response = await getJson({
    engine: "google_lens",
    url: url,
    api_key: process.env.SERP_API_KEY
  });

  return { props: { loaded: true, result: response } };
}