// sanity.js
import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "8pv6xe9y",
  dataset: "production",
  useCdn: true, // `false` if you want to ensure fresh data
});
