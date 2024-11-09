"use client";
import { createContext, useContext, useState } from "react";

const NotificationContext = createContext({
  notification: {
    show: false,
    message: "",
    description: "",
    type: "success", // or 'error' for different icons or colors
  },
  showNotification: (message: string, description = "", type = "success") => {},
  hideNotification: () => {},
});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    description: "",
    type: "success", // or 'error' for different icons or colors
  });

  const showNotification = (
    message: string,
    description = "",
    type = "success"
  ) => {
    setNotification({ show: true, message, description, type });
  };

  const hideNotification = () =>
    setNotification((prev) => ({ ...prev, show: false }));

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, hideNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
