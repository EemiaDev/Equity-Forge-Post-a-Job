
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './screens/Dashboard';
import { JobsList } from './screens/JobsList';
import { PostJobFlow } from './screens/PostJobFlow';
import { Screen } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard currentScreen={currentScreen} setScreen={setCurrentScreen} />;
      case 'jobs':
        return <JobsList currentScreen={currentScreen} setScreen={setCurrentScreen} />;
      case 'post-job':
        return <PostJobFlow setScreen={setCurrentScreen} onComplete={() => setCurrentScreen('jobs')} />;
      default:
        return <Dashboard currentScreen={currentScreen} setScreen={setCurrentScreen} />;
    }
  };

  return (
    <Layout>
      {renderScreen()}
    </Layout>
  );
}
