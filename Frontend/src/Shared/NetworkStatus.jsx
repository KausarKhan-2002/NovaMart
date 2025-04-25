import { useEffect, useState } from "react";

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine); // check initial status
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowBanner(true);

      setTimeout(() => {
        setShowBanner(false);
      }, 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true);
    };

    // Set up listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Show offline banner if user starts offline
    if (!navigator.onLine) {
      setShowBanner(true);
    }

    // Cleanup
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!showBanner) return null;

  return (
    <div
      className={`fixed bottom-0 w-full text-center py-2 text-sm font-medium text-white transition-all duration-500 ${
        isOnline ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {isOnline
        ? "You are back online"
        : "You are offline. Please check your internet connection."}
    </div>
  );
};

export default NetworkStatus;
