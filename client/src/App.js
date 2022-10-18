import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
  } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import NavTabs from './components/Navbar';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import Donate from './components/pages/Donate';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import LineChart from './charts/LineChart'

const httpLink = createHttpLink({
    uri: '/graphql',
  });


const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  


function App() {
    return (
        <ApolloProvider client={client}>
            <Router >
                <div>
                  <NavTabs/>
                    <Routes>
                        <Route path="*" element={<Navigate to="/home" />}/> 
                        <Route path="/home" element={<Home />}/>
                        <Route path="/dashboard" element={<Dashboard />}/>
                        <Route path="/donate" element={<Donate />}/>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/signup" element={<Signup />}/>
                        <Route path="/chart" element={<LineChart />}/>
                    </Routes>
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;

