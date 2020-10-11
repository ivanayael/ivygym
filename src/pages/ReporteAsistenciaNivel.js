import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

//const Tutores = () => {
function ReporteAsistenciaNivel() {

  const baseUrl="https://localhost:44335/api/SpReporteAsistenciaNivels";
  const [data,setData]=useState([]);

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }


  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div className="ReporteAsistenciaNivel">
      <br/><br/>
      <table className="table table-bordered">
      <thead>
        <tr>
          <th>Nivel</th>
          <th>ID de Alumno</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>D.N.I.</th>
          <th>Días de Practica</th>
          <th>Asistencia Nro 1</th>
          <th>Asistencia Nro 2</th>
          <th>Asistencia Nro 3</th>
          <th>Asistencia Nro 4</th>
        </tr>
      </thead>
      <tbody>
    {data.map(SpReporteAsistenciaNivels=>(
      <tr key={SpReporteAsistenciaNivels.idAlumno}>
        <td>{SpReporteAsistenciaNivels.nivel}</td>
        <td>{SpReporteAsistenciaNivels.idAlumno}</td>
        <td>{SpReporteAsistenciaNivels.nombre}</td>
        <td>{SpReporteAsistenciaNivels.apellido}</td>
        <td>{SpReporteAsistenciaNivels.dni}</td>
        <td>{SpReporteAsistenciaNivels.diasPractica}</td>
        <td>{SpReporteAsistenciaNivels.asistencia1}</td>
        <td>{SpReporteAsistenciaNivels.asistencia2}</td>
        <td>{SpReporteAsistenciaNivels.asistencia3}</td>
        <td>{SpReporteAsistenciaNivels.asistencia4}</td>
      </tr>
     ))}
    </tbody>
    </table>
   </div>
  );
}


export default ReporteAsistenciaNivel;
