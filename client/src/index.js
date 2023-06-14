import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { PostContextProvider } from './context/PostContext';
import { UserContextProvider } from './context/UserContext';
import { ProfileContextProvider } from './context/ProfileContext';
import { FollowerContextProvider } from './context/FollowerContext';
import { FollowingContextProvider } from './context/FollowingContext';
import { SearchContextProvider } from './context/SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostContextProvider>
      <UserContextProvider>
        <SearchContextProvider>
        <ProfileContextProvider>
          <FollowerContextProvider>
            <FollowingContextProvider>

            <App />

            </FollowingContextProvider>
          </FollowerContextProvider>
        </ProfileContextProvider>
        </SearchContextProvider>
      </UserContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

