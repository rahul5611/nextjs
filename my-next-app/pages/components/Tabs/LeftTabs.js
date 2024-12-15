import React, { useEffect, useState } from 'react';
import './LeftTabs.css';

import QuizComponent from '@/pages/quiz';
import UserPage from '@/pages/user';
import InventoryManagement from '@/pages/inventory';
import GuestUserComponent from '@/pages/guest';
import Product from '@/pages/Product';
import Roles from '@/pages/roles';

const LeftTabs = (props) => {
  const { tabs } = props;
  const [activeTab, setActiveTab] = useState();

  useEffect(() => {
    if (tabs.length > 0) {
      setActiveTab(tabs[0].id);
    }

  }, [tabs]);

  const renderPage = (page) => {
    switch (page) {
      case "Reports":
        return <>Reports will come here.</>
      case "Guest":
        return <GuestUserComponent/>
      case "Quiz":
        return <QuizComponent />;
      case "Inventory":
        return <InventoryManagement />
      case "Users":
        return <UserPage />;
      case "Product":
        return <Product />;
      case "Roles":
        return <Roles />;
    }
  }

  return (
    <div className="left-tabs-container">
      <div className="tabs-sidebar">
        {tabs && tabs.length > 0 && tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}

      </div>
      <div className="tab-content">
        {tabs && tabs.length > 0 && tabs.map(
          (tab) => activeTab === tab.id && (
            <div key={tab.id} className="tab-panel">
              <br/>
              {renderPage(tab.page)}
            </div>
          )
        )}
      </div>

    </div>
  );
};

export default LeftTabs;
