import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "http://localhost:3000/graphql",
    }),
    cache: new InMemoryCache(),
  });
};
export default createApolloClient;