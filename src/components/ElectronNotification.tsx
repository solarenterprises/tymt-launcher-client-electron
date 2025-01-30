import { useCallback } from "react";

const ElectronNotification = () => {
  const showNotification = useCallback((title: string, body: string) => {
    new window.Notification(title, { body });
  }, []);

  return { showNotification };
};

export default ElectronNotification;
