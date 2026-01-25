import {useState, useMemo} from 'react'
import {Calendar, Views} from 'react-big-calendar' 
import "react-big-calendar/lib/css/react-big-calendar.css"
import './App.css'
import {F1, F2, F3, FE, WEC} from "./eventsData/data.js"
import {Sidebar} from "./components/sidebar.jsx"
import {Header} from "./components/header.jsx"
import {localizer} from './utils/localizer'; 

function App() {
  
  const [view, setView] = useState(Views.MONTH); 
  const [date, setDate] = useState(new Date());  

  //convertimos objeto en array
  const flattenEvents = (eventsObj) => {
    return Object.values(eventsObj).flat();
  };

  //vamos guardando cada categoria en este array
  const allEvents = [
    ...flattenEvents(F1),
    ...flattenEvents(F2),
    ...flattenEvents(F3),
    ...flattenEvents(FE),
    ...flattenEvents(WEC)
  ];
  
  const [selectedCategories, setSelectedCategories] = useState(["F1", "F2", "F3","FE", "WEC"]);
  
  //mostrar eventos marcados en checkbox
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
          onView={handleView}//modificar vista del calendario, mes, semana, dia      
          date={date}                
          onNavigate={handleNavigate}//Botones "siguiente" y "anterior"
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          components={{//modificar como se muestran los eventos.
            event: ({event}) => (
              <span>
                {event.category[0]} • {event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {event.event}
              </span>
            ),
          }}
          
          eventPropGetter={(event) => {
            let background = "";
            if (event.category.includes("F1")) background = "#e50000";
            if (event.category.includes("F2")) background = "#0080ff";
            if (event.category.includes("F3")) background = "#31961d";
            if (event.category.includes("FE")) background = "linear-gradient(135deg, #d72525 0%, #cc7700 100%)";
            if (event.category.includes("WEC")) background = "#9333ea";
            return { style: { background } };
          }}
        />
      </div>
    </div>
  )
};

export default App