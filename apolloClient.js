/*
 * @author Gaurav Kumar
 */
import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client';
import fetch from 'isomorphic-unfetch';

export default function createApolloClient(initialState, ctx) {
    // The `ctx` (NextPageContext) will only be present on the server.
    // use it to extract auth headers (ctx.req) or similar.
    return new ApolloClient({
        ssrMode: Boolean(ctx),
        link: new HttpLink({
                uri: 'http://localhost:3001/api/graphql', // Server URL (must be absolute)
                credentials: 'include', // Additional fetch() options like `credentials` or `headers`
            fetch,
        }),
        cache: new InMemoryCache().restore(initialState),
    });
}
