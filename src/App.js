import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Alumnos from './pages/Alumnos';
import Tutores from './pages/Tutores';
import Asistencia from './pages/Asistencia';
import ReporteAsistenciaNivel from './pages/ReporteAsistenciaNivel';
import ReportePagoNivel from './pages/ReportePagoNivel';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Inicio} />
          <Route path='/Alumnos' exact component={Alumnos} />
          <Route path='/Tutores' component={Tutores} />
          <Route path='/Asistencia' component={Asistencia} />
          <Route path='/ReporteAsistenciaNivel' component={ReporteAsistenciaNivel} />
          <Route path='/ReportePagoNivel' component={ReportePagoNivel} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
