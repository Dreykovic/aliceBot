import { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); // Met à jour chaque seconde

    // Nettoyage de l'intervalle lorsqu'on démonte le composant
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h2>{time.toLocaleTimeString()}</h2>
    </div>
  );
};

export default Clock;
