import { useEffect, useState } from "react";
import FireTracking from "./FireTracking";
import { FireLoader } from "./FireLoader";
const FireApp = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await fetch("https://eonet.gsfc.nasa.gov/api/v2.1/events");
      const { events } = await res.json();

      setEventData(events);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {!loading ? <FireTracking eventData={eventData} /> : <FireLoader />}
    </div>
  );
};

export default FireApp;
