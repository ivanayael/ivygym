import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

//const Tutores = () => {
function ReportePagoNivel() {

  const baseUrl="https://localhost:44335/api/SpReportePagoNivels";
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
    <div className="ReportePagoNivel">
      <br/><br/>
      <table className="table table-bordered">
      <thead>
        <tr>
          <th>Nivel</th>
          <th>ID de Alumno</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>D.N.I.</th>
          <th>Valor a pagar por Mes en Pesos Arg.</th>
          <th>Fecha de Pago</th>
          <th>Pago Realizado de:</th>
          <th>Pago Efectivo</th>
        </tr>
      </thead>
      <tbody>
    {data.map(SpReportePagoNivels=>(
      <tr key={SpReportePagoNivels.idAlumno}>
        <td>{SpReportePagoNivels.nivel}</td>
        <td>{SpReportePagoNivels.idAlumno}</td>
        <td>{SpReportePagoNivels.nombre}</td>
        <td>{SpReportePagoNivels.apellido}</td>
        <td>{SpReportePagoNivels.dni}</td>
        <td>{SpReportePagoNivels.valor}</td>
        <td>{SpReportePagoNivels.pagoFecha}</td>
        <td>{SpReportePagoNivels.pagoMensual}</td>
        <td>{SpReportePagoNivels.pagoRealizado}</td>
      </tr>
     ))}
    </tbody>
    </table>
   </div>
  );
}


export default ReportePagoNivel;
