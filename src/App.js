import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';


function App() {

  // Citas en local storage
  var citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if(!citasIniciales){
    citasIniciales = [];
  }

  // Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
      let citasIniciales = JSON.parse(localStorage.getItem("citas"));
      if(citasIniciales){
        localStorage.setItem("citas", JSON.stringify(citas));
      }else{
        localStorage.setItem("citas", JSON.stringify([]));
      }
  }, [citas] );

  //Funcion q tome las citas actuales y agregue las nuevas
  const crearCita = cita =>{
    guardarCitas([...citas,cita]);
  }

  // Funcion q elimina una cita x su id
  const eliminarCita = id => {
    guardarCitas(citas.filter(cita => cita.id !== id));
  }

  //Mensaje condicional


  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>

      <div className='container'>
        <div className='row'>
          <div className='one-half column'>
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className='one-half column'>
            {citas.length === 0? <h2>No hay Citas</h2> : <h2>Administra tus Citas</h2>}
            
            {citas.map(cita => (
              <Cita
                key={cita.id} 
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
