import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { motion } from 'framer-motion';
import store from './redux/store';
import Login from './components/Login';
import VideoUpload from './components/VideoUpload';
import VideoList from './components/VideoList';
import Profile from './components/Profile';
import Group from './components/Group';
import LiveStream from './components/LiveStream';
import Notification from './components/Notification';
import Search from './components/Search';
import Chat from './components/Chat';
import Analytics from './components/Analytics';
import './index.css';

const queryClient = new QueryClient();

function App() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState('light');

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <motion.div
            className={`min-h-screen bg-cover bg-fixed bg-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
            style={{ backgroundImage: theme === 'light' ? "url('path-to-image.jpg')" : 'none' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <nav className="p-4 bg-gray-800 text-white flex justify-between">
              <div>
                <button onClick={() => i18n.changeLanguage('en')} className="mr-4">{t('english')}</button>
                <button onClick={() => i18n.changeLanguage('bn')}>{t('bangla')}</button>
              </div>
              <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                {theme === 'light' ? t('dark_mode') : t('light_mode')}
              </button>
            </nav>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/upload" component={VideoUpload} />
              <Route path="/profile" component={Profile} />
              <Route path="/groups" component={Group} />
              <Route path="/live" component={LiveStream} />
              <Route path="/notifications" component={Notification} />
              <Route path="/search" component={Search} />
              <Route path="/chat" component={Chat} />
              <Route path="/analytics" component={Analytics} />
              <Route path="/" component={VideoList} />
            </Switch>
          </motion.div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
