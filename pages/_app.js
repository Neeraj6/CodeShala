/*
 * @author Gaurav Kumar
 */

import '../styles.css';
import React from "react";
import {AuthProvider} from "../context/auth";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {createUploadLink} from 'apollo-upload-client'
import fetch from "isomorphic-unfetch";
import Success from "../components/Success";
import Error from "../components/Error";

const client = new ApolloClient({
    link: createUploadLink({
        uri: '/api/graphql/', // Server URL (must be absolute)
        fetch,
        fetchOptions: {credentials: 'include'},
        credentials: "include"
        // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache(),
});
// This default export is required in a new `pages/_app.js` file.
const MyApp = ({Component, pageProps}) => {
    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <Error/>
                <Success/>
                <Component {...pageProps} />
            </AuthProvider>
        </ApolloProvider>
    )
}

export default MyApp;
