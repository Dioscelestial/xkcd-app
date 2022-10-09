import algoliasearch from "algoliasearch/lite";

const APP_ID = process.env.APP_ID;
const API_KEY = process.env.API_KEY;

const client = algoliasearch(APP_ID, API_KEY);
const index = client.initIndex("proc_comics");

const CACHE = {};

export const search = async ({ query }) => {
  if (CACHE[query]) {
    console.log("from cache", query);
  }
  const { hits } = await index.search(query, {
    attributesToRetrieve: ["id", "title", "alt", "img"],
    hitsPerPage: 20,
  });

  CACHE[query] = hits;

  return { results: hits };
};
