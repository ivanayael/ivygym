import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';



//const Tutores = () => {
function Tutores() {

  const baseUrl="https://localhost:44335/api/Tutors";
  const [data,setData]=useState([]);
  const [modalModificar, setModalModificar]=useState(false);
  const [modalGuardar, setModalGuardar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  const [TutorsSeleccionado, setTutorsSeleccionado]=useState({
    idTutor: '',
    nombre: '',
    apellido: '',
    dni: '',
    mail: '',
    telefono: '',
    idAlumno: '',
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setTutorsSeleccionado({
      ...TutorsSeleccionado,
      [name]: value
    });
    console.log(TutorsSeleccionado);
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
    delete TutorsSeleccionado.idTutor;
    TutorsSeleccionado.dni=parseInt(TutorsSeleccionado.dni);
    TutorsSeleccionado.idAlumno=parseInt(TutorsSeleccionado.idAlumno);
    await axios.post(baseUrl, TutorsSeleccionado)
    .then(response=>{
      setData(data.concat(response.data));
      console.log(data.concat(response.data));
      abrirCerrarModalGuardar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    TutorsSeleccionado.dni=parseInt(TutorsSeleccionado.dni);
    TutorsSeleccionado.idAlumno=parseInt(TutorsSeleccionado.idAlumno);
    await axios.put(baseUrl+"/"+TutorsSeleccionado.idTutor, TutorsSeleccionado)
    .then(response=>{
      var respuesta = response.data;
      var dataAuxiliar = data;
      dataAuxiliar.map(Tutors=>{
        if(Tutors.idTutor===TutorsSeleccionado.idTutor)
        {
          Tutors.nombre=respuesta.nombre;
          Tutors.apellido=respuesta.apellido;
          Tutors.dni=respuesta.dni;
          Tutors.mail=respuesta.mail;
          Tutors.telefono=respuesta.telefono;
          Tutors.idAlumno=respuesta.idAlumno;
        }
      });
      abrirCerrarModalModificar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+"/"+TutorsSeleccionado.idTutor)
    .then(response=>{
      setData(data.filter(Tutors=>Tutors.idTutor!==response.data));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }
  const seleccionarTutors=(Tutors, caso)=>{
    setTutorsSeleccionado(Tutors);
    (caso==="Modificar")?
    abrirCerrarModalModificar(): abrirCerrarModalEliminar();
  }

  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div className="Tutores">
      <br/><br/>
      <button onClick={()=>abrirCerrarModalGuardar()} className="btn btn-success">Agregar Nuevo Alumno</button>
      <br/><br/>
      <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID Tutor</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>D.N.I.</th>
          <th>Mail</th>
          <th>Telefono</th>
          <th>ID de Alumno</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
    {data.map(Tutors=>(
      <tr key={Tutors.idTutor}>
        <td>{Tutors.idTutor}</td>
        <td>{Tutors.nombre}</td>
        <td>{Tutors.apellido}</td>
        <td>{Tutors.dni}</td>
        <td>{Tutors.mail}</td>
        <td>{Tutors.telefono}</td>
        <td>{Tutors.idAlumno}</td>
        <td>
          <button className="btn btn-primary" onClick={()=>seleccionarTutors(Tutors, "Modificar")}>Modificar</button> {"  "}
          <button className="btn btn-danger" onClick={()=>seleccionarTutors(Tutors, "Eliminar")}>Eliminar</button>
        </td>
      </tr>
     ))}
    </tbody>
    </table>

    <Modal isOpen={modalGuardar}>
    <ModalHeader>Agregar Tutor</ModalHeader>
    <ModalBody>
      <div className="form-group">
        <label for="nombre">Nombre:</label>
        <br />
        <input type="text" name="nombre" id="nombre" className="form-control" onChange={handleChange}></input>
        <br />
        <label for="apellido">Apellido:</label>
        <br />
        <input type="text" name="apellido" id="apellido" className="form-control" onChange={handleChange}></input>
        <br />
        <label for="dni">D.N.I.:</label>
        <br />
        <input type="number" name="dni" id="dni" className="form-control" min="8" max="8" onChange={handleChange}></input>
        <br />
        <label for="mail">Mail:</label>
        <br />
        <input type="email" name="mail" id="mail" className="form-control" onChange={handleChange}></input>
        <br />
        <label for="telefono">Teléfono:</label>
        <br />
        <input type="text" name="telefono" id="telefono" className="form-control" onChange={handleChange}></input>
        <br />
        <label for="idAlumno">ID de Alumno:</label>
        <br />
        <input type="text" name="idAlumno" id="idAlumno" className="form-control" onChange={handleChange}></input>
        <br />
      </div>

    </ModalBody>
    <ModalFooter>
      <button className="btn btn-primary" onClick={()=>peticionPost()}>Agregar</button>{"  "}
      <button className="btn btn-danger" onClick={()=>abrirCerrarModalGuardar()}>Cancelar</button>
    </ModalFooter>
    </Modal>
    
    <Modal isOpen={modalModificar}>
    <ModalHeader>Modificar Tutor</ModalHeader>
    <ModalBody>
      <div className="form-group">
        <label for="idTutor">ID de Tutor:</label>
        <br />
        <input type="text" name="idTutor" id="idTutor" className="form-control" readOnly value={TutorsSeleccionado && TutorsSeleccionado.idAlumno }></input>
        <br />
        <label for="nombre">Nombre:</label>
        <br />
        <input type="text" name="nombre" id="nombre" className="form-control" onChange={handleChange} value={TutorsSeleccionado && TutorsSeleccionado.nombre}></input>
        <br />
        <label for="apellido">Apellido:</label>
        <br />
        <input type="text" name="apellido" id="apellido" className="form-control" onChange={handleChange} value={TutorsSeleccionado && TutorsSeleccionado.apellido}></input>
        <br />
        <label for="dni">D.N.I.:</label>
        <br />
        <input type="number" name="dni" id="dni" className="form-control" min="8" max="8" onChange={handleChange} value={TutorsSeleccionado && TutorsSeleccionado.dni}></input>
        <br />
        <label for="mail">Mail:</label>
        <br />
        <input type="email" name="mail" id="mail" className="form-control" onChange={handleChange} value={TutorsSeleccionado && TutorsSeleccionado.mail}></input>
        <br />
        <label for="telefono">Teléfono:</label>
        <br />
        <input type="text" name="telefono" id="telefono" className="form-control" onChange={handleChange} value={TutorsSeleccionado && TutorsSeleccionado.telefono}></input>
        <br />
        <label for="idAlumno">ID de Alumno:</label>
        <br />
        <input type="text" name="idAlumno" id="idAlumno" className="form-control" onChange={handleChange}  value={TutorsSeleccionado && TutorsSeleccionado.idAlumno} ></input>
        <br />
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
        ¿Estas seguro que deseas eliminar al Tutor { TutorsSeleccionado && TutorsSeleccionado.nombre}? 
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

export default Tutores;
