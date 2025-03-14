import React from 'react';
import Icons from "../assets/Icons";
import '../styles/TopNav.css';

const mockNotifications = [
  { id: 1, message: "User 1 updated Project A", time: "2 min ago" },
  { id: 2, message: "User 2 commented on a task", time: "5 min ago" },
  { id: 3, message: "New project invitation received", time: "1 hour ago" },
];

const TopNav = ({ pageTitle, isNotificationsOpen, setIsNotificationsOpen }) => {
  return (
    <div className="top-nav">
      <h2>{pageTitle}</h2>
      <div className="notifications">
        <button
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          className="notification-button"
        >
          <Icons.Bell />
          <span className="notification-badge">3</span>
        </button>

        {/* Notifications Dropdown */}
        {isNotificationsOpen && (
          <div className="notifications-dropdown">
            <div className="notifications-content">
              <h3>Notifications</h3>
              {mockNotifications.map((notification) => (
                <div key={notification.id} className="notification-item">
                  <p>{notification.message}</p>
                  <span className="notification-time">
                    {notification.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;