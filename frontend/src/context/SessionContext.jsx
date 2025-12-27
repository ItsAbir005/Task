import { createContext, useState, useContext, useEffect } from 'react';

const SessionContext = createContext(null);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession must be used within SessionProvider');
  return context;
};

export const SessionProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    let storedSessionId = localStorage.getItem('sessionId');
    let storedName = localStorage.getItem('customerName');

    if (!storedSessionId) {
      storedSessionId = `SESSION-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('sessionId', storedSessionId);
    }

    setSessionId(storedSessionId);
    setCustomerName(storedName || '');
  }, []);

  const updateCustomerName = (name) => {
    setCustomerName(name);
    localStorage.setItem('customerName', name);
  };

  return (
    <SessionContext.Provider value={{ sessionId, customerName, updateCustomerName }}>
      {children}
    </SessionContext.Provider>
  );
};