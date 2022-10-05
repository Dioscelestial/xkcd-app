import algoliasearch from "algoliasearch/lite";

const client = algoliasearch("A8W39G0COR", "517b9c3e53c4c27cb9f1d7dac0cc61c4");
const index = client.initIndex("proc_comics");

export const search = async ({ query }) => {
  const { hits } = await index.search(query, {
    attributesToRetrieve: ["id", "title", "alt", "img"],
    hitsPerPage: 10,
  });
  return { result: hits };
};
