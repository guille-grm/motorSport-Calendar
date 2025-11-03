import {useState, useMemo} from 'react'
import {Calendar, Views} from 'react-big-calendar' 
import "react-big-calendar/lib/css/react-big-calendar.css"
import './App.css'
import {F1, F2, F3, WEC} from "./eventsData/data.js"
import {Sidebar} from "./components/sidebar.jsx"
import {Header} from "./components/header.jsx"
import {localizer} from './utils/localizer'; 

function App() {
  
  const [view, setView] = useState(Views.MONTH); 
  const [date, setDate] = useState(new Date());  

  const flattenEvents = (eventsObj) => {
    return Object.values(eventsObj).flat();
  };

  const allEvents = [
    ...flattenEvents(F1),
    ...flattenEvents(F2),
    ...flattenEvents(F3),
    ...flattenEvents(WEC)
  ];
  
  const [selectedCategories, setSelectedCategories] = useState(["F1", "F2", "F3", "WEC"]);

  const filteredEvents = allEvents.filter(event =>
    event.category.some(cat => selectedCategories.includes(cat))
  );

  const handleNavigate = (newDate) => {
    setDate(newDate); 
  };

  const handleView = (newView) => {
    setView(newView); 
  };

  return (
    <div>
      {/*<Header/>*/}
      <div className='app'>
        <Sidebar
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
        
        <Calendar 
          className='calendar'
          messages={{    //<-- con esto puedo cambiar el nombre de los botones
            next: "Siguiente",
            previous: "Anterior",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día", 
          }}
          localizer={localizer}
          events={filteredEvents}
          view={view}              
          onView={handleView}      
          date={date}                
          onNavigate={handleNavigate} 
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          components={{
            event: ({event}) => (
              <span>
                {event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {event.title}
              </span>
            ),
          }}
          
          eventPropGetter={(event) => {
            let backgroundColor = "";
            if (event.category.includes("F1")) backgroundColor = "red";
            if (event.category.includes("F2")) backgroundColor = "lightblue";
            if (event.category.includes("F3")) backgroundColor = "lightgreen";
            if (event.category.includes("WEC")) backgroundColor = "purple";
            return { style: { backgroundColor } };
          }}
        />
      </div>
    </div>
  )
};

export default App