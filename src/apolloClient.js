import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "***REMOVED***",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ***REMOVED***`,
  },
});

export default client;