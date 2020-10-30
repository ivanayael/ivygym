import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

//const Asistencia = () => {
function Asistencia() {
  const baseUrl="https://localhost:44335/api/Asistencias";
  const [data,setData]=useState([]);
  const [modalModificar, setModalModificar]=useState(false);
  const [modalGuardar, setModalGuardar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  const [AsistenciasSeleccionado, setAsistenciasSeleccionado]=useState({
    idAsistencia: '',
    dni: '',
    asistencia1: false,
    asistencia2: false,
    asistencia3: false,
    asistencia4: false,
    pagoMensual: '',
    pagoFecha: '',
    pagoRealizado: false,
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setAsistenciasSeleccionado({
      ...AsistenciasSeleccionado,
      [name]: value,
    });
    console.log(AsistenciasSeleccionado);
  }

  
  const handleChangeCheckbox=e=>{
    const {name, checked}=e.target;
    setAsistenciasSeleccionado({
      ...AsistenciasSeleccionado,
      [name]: checked,
    });
    console.log(AsistenciasSeleccionado);
  }


  const abrirCerrarModalGuardar=()=>{
    setModalGuardar(!modalGuardar);
  }
  const abrirCerrarModalModificar=()=>{
    setModalModificar(!modalModificar);
  }
  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    delete AsistenciasSeleccionado.idAsistencia;
    AsistenciasSeleccionado.dni=parseInt(AsistenciasSeleccionado.dni);
    AsistenciasSeleccionado.pagoMensual=parseInt(AsistenciasSeleccionado.pagoMensual);
    await axios.post(baseUrl, AsistenciasSeleccionado)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalGuardar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    AsistenciasSeleccionado.dni=parseInt(AsistenciasSeleccionado.dni);
    AsistenciasSeleccionado.pagoMensual=parseInt(AsistenciasSeleccionado.pagoMensual);

    console.log(AsistenciasSeleccionado);
    await axios.put(baseUrl+"/"+AsistenciasSeleccionado.idAsistencia, AsistenciasSeleccionado)
    .then(response=>{
      var respuesta = response.data;
      var dataAuxiliar = data;
      dataAuxiliar.map(Asistencias=>{
        if(Asistencias.idAsistencia===AsistenciasSeleccionado.idAsistencia)
        {
          Asistencias.dni=respuesta.dni;
          Asistencias.asistencia1=respuesta.asistencia1;
          Asistencias.asistencia2=respuesta.asistencia2;
          Asistencias.asistencia3=respuesta.asistencia3;
          Asistencias.asistencia4=respuesta.asistencia4;
          Asistencias.pagoMensual=respuesta.pagoMensual;
          Asistencias.pagoFecha=respuesta.pagoFecha;
          Asistencias.pagoRealizado=respuesta.pagoRealizado;
        }
      });
      abrirCerrarModalModificar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+"/"+AsistenciasSeleccionado.idAsistencia)
    .then(response=>{
      setData(data.filter(Asistencias=>Asistencias.idAsistencia!==response.data));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }
  const seleccionarAsistencias=(Asistencias, caso)=>{
    setAsistenciasSeleccionado(Asistencias);
    (caso==="Modificar")?
    abrirCerrarModalModificar(): abrirCerrarModalEliminar();
  }

  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div className="Asistencia">
      <br/><h1>Control de Asistencia y Pagos</h1><br/>
      <Button onClick={()=>abrirCerrarModalGuardar()} color="success">Agregar Nueva Asistencia</Button>{" "}
      <br/><br/>
      <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID de Asistencia</th>
          <th>D.N.I.</th>
          <th>Asistencia día 1</th>
          <th>Asistencia día 2</th>
          <th>Asistencia día 3</th>
          <th>Asistencia día 4</th>
          <th>Monto Pagado</th>
          <th>Fecha de Pago</th>
          <th>Pago Efectuado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
    {data.map(Asistencias=>(
      <tr key={Asistencias.idAsistencia}>
        <td>{Asistencias.idAsistencia}</td>
        <td>{Asistencias.dni}</td>
        <td>{Asistencias.asistencia1.toString()}</td>
        <td>{Asistencias.asistencia2.toString()}</td>
        <td>{Asistencias.asistencia3.toString()}</td>
        <td>{Asistencias.asistencia4.toString()}</td>
        <td>{Asistencias.pagoMensual}</td>
        <td>{Asistencias.pagoFecha}</td>
        <td>{Asistencias.pagoRealizado.toString()}</td>
        <td>
          <Button color="primary" onClick={()=>seleccionarAsistencias(Asistencias, "Modificar")}>Modificar</Button>{"  "}
          <Button color="danger" onClick={()=>seleccionarAsistencias(Asistencias, "Eliminar")}>Eliminar</Button>
        </td>
      </tr>
     ))}
    </tbody>
    </table>

    <Modal isOpen={modalGuardar}>
    <ModalHeader>Agregar Asistencia</ModalHeader>
    <ModalBody>
      <div className="form-group">
      <label for="dni">D.N.I.:</label>
        <br />
        <input type="number" name="dni" id="dni" className="form-control" onChange={handleChange}></input>
        <br />
        <label for="asistencia1">Dia 1 de Asistencia:</label>
        <br />
        <input type="checkbox" name="asistencia1" id="asistencia1" className="form-control" onChange={handleChangeCheckbox}></input>
        <br />
        <label for="asistencia2">Dia 2 de Asistencia:</label>
        <br />
        <input type="checkbox" name="asistencia2" id="asistencia2" className="form-control" onChange={handleChangeCheckbox}></input>
        <br />
        <label for="asistencia3">Dia 3 de Asistencia:</label>
        <br />
        <input type="checkbox" name="asistencia3" id="asistencia3" className="form-control" onChange={handleChangeCheckbox}></input>
        <br />
        <label for="asistencia4">Dia 4 de Asistencia:</label>
        <br />
        <input type="checkbox" name="asistencia4" id="asistencia4" className="form-control" onChange={handleChangeCheckbox}></input>
        <br />
        <label for="pagoMensual">Pago Mensual:</label>
        <br />
        <input type="text" name="pagoMensual" id="pagoMensual" className="form-control" onChange={handleChange}></input>
        <br />
        <label for="pagoFecha">Fecha de Pago:</label>
        <br />
        <input type="datetime-local" name="pagoFecha" id="pagoFecha" className="form-control" onChange={handleChange}></input>
        <br />
        <label for="pagoRealizado">Pago Efectuado:</label>
        <br />
        <input type="checkbox" name="pagoRealizado" id="pagoRealizado" className="form-control" onChange={handleChangeCheckbox}></input>
        <br />

      </div>

    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={()=>peticionPost()}>Agregar</Button>{"  "}
      <Button color="danger" onClick={()=>abrirCerrarModalGuardar()}>Cancelar</Button>
    </ModalFooter>
    </Modal>
    
    <Modal isOpen={modalModificar}>
    <ModalHeader>Modificar Asistencia</ModalHeader>
    <ModalBody>
      <div className="form-group">
        <label for="idAsistencia">ID de Asistencia:</label>
        <br />
        <input type="text" name="idAsistencia" id="idAsistencia" className="form-control" readOnly value={AsistenciasSeleccionado && AsistenciasSeleccionado.idAsistencia }></input>
        <br />
        <label for="dni">D.N.I.:</label>
        <br />
        <input type="number" name="dni" id="dni" className="form-control" onChange={handleChange} value={AsistenciasSeleccionado && AsistenciasSeleccionado.dni}></input>
        <br />
        <label for="asistencia1">Dia 1 de Asistencia:</label>
        <br />
        <input type="checkbox" name="asistencia1" id="asistencia1" className="form-control" onChange={handleChangeCheckbox} checked={AsistenciasSeleccionado && AsistenciasSeleccionado.asistencia1}></input>
        <br />
        <label for="asistencia2">Dia 2 de Asistencia:</label>
        <br />
        <input type="checkbox" name="asistencia2" id="asistencia2" className="form-control" onChange={handleChangeCheckbox} checked={AsistenciasSeleccionado && AsistenciasSeleccionado.asistencia2}></input>
        <br />
        <label for="asistencia3">Dia 3 de Asistencia:</label>
        <br />
        <input type="checkbox" name="asistencia3" id="asistencia3" className="form-control" onChange={handleChangeCheckbox} checked={AsistenciasSeleccionado && AsistenciasSeleccionado.asistencia3}></input>
        <br />
        <label for="asistencia4">Dia 4 de Asistencia:</label>
        <br />
        <input type="checkbox" name="asistencia4" id="asistencia4" className="form-control" onChange={handleChangeCheckbox} checked={AsistenciasSeleccionado && AsistenciasSeleccionado.asistencia4}></input>
        <br />
        <label for="pagoMensual">Pago Mensual:</label>
        <br />
        <input type="text" name="pagoMensual" id="pagoMensual" className="form-control" onChange={handleChange} value={AsistenciasSeleccionado && AsistenciasSeleccionado.pagoMensual}></input>
        <br />
        <label for="pagoFecha">Fecha de Pago:</label>
        <br />
        <input type="datetime-local" name="pagoFecha" id="pagoFecha" className="form-control" onChange={handleChange} value={AsistenciasSeleccionado && AsistenciasSeleccionado.pagoFecha}></input>
        <br />
        <label for="pagoRealizado">Pago Efectuado:</label>
        <br />
        <input type="checkbox" name="pagoRealizado" id="pagoRealizado" className="form-control" onChange={handleChangeCheckbox} checked={AsistenciasSeleccionado && AsistenciasSeleccionado.pagoRealizado}></input>
        <br />

      </div>

    </ModalBody>
    <ModalFooter>
      <button className="btn btn-primary" onClick={()=>peticionPut()}>Modificar</button>{"   "}
      <button className="btn btn-danger" onClick={()=>abrirCerrarModalModificar()}>Cancelar</button>
    </ModalFooter>
    </Modal>

    <Modal isOpen={modalEliminar}>
      <ModalBody>
        ¿Estas seguro que deseas eliminar la asistencia y pago al alumno con D.N.I. { AsistenciasSeleccionado && AsistenciasSeleccionado.dni}? 
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={()=>peticionDelete()}>
          Sí
        </button>
        <button
          className="btn btn-secondary"
          onClick={()=>abrirCerrarModalEliminar()}
        >
          No
        </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Asistencia;
