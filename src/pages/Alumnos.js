import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { useAlert } from 'react-alert';


//const Alumnos = () => {
function Alumnos() {
  const alert = useAlert();
  const baseUrl="https://localhost:44335/api/Alumnoes";
  const [data,setData]=useState([]);
  const [modalModificar, setModalModificar]=useState(false);
  const [modalGuardar, setModalGuardar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  const [AlumnoesSeleccionado, setAlumnoesSeleccionado]=useState({
    idAlumno: '',
    nombre: '',
    apellido: '',
    dni: '',
    fechaNacimiento: '',
    mail: '',
    obrasocial: '',
    certificadomedico: '',
    numerosocio: '',
    nivel: '',
    categoria: '',
    edad: '',
    diasPractica: '',
    valor: '',
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setAlumnoesSeleccionado({
      ...AlumnoesSeleccionado,
      [name]: value
    });
    console.log(AlumnoesSeleccionado);
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
    delete AlumnoesSeleccionado.idAlumno;
    AlumnoesSeleccionado.dni=parseInt(AlumnoesSeleccionado.dni);
    AlumnoesSeleccionado.edad=parseInt(AlumnoesSeleccionado.edad);
    AlumnoesSeleccionado.valor=parseInt(AlumnoesSeleccionado.valor);
    if (AlumnoesSeleccionado.edad < 18) {
      alert.show('El alumno ingresado es menor de edad, se debe ingresar un tutor legal. Dirijase a la seccion correspondiente');
      alert('El alumno ingresado es menor de edad, se debe ingresar un tutor legal. Dirijase a la seccion correspondiente');
    }
    await axios.post(baseUrl, AlumnoesSeleccionado)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalGuardar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    AlumnoesSeleccionado.dni=parseInt(AlumnoesSeleccionado.dni);
    AlumnoesSeleccionado.edad=parseInt(AlumnoesSeleccionado.edad);
    AlumnoesSeleccionado.valor=parseInt(AlumnoesSeleccionado.valor);
    await axios.put(baseUrl+"/"+AlumnoesSeleccionado.idAlumno, AlumnoesSeleccionado)
    .then(response=>{
      var respuesta = response.data;
      var dataAuxiliar = data;
      dataAuxiliar.map(Alumnoes=>{
        if(Alumnoes.idAlumno===AlumnoesSeleccionado.idAlumno)
        {
          Alumnoes.nombre=respuesta.nombre;
          Alumnoes.apellido=respuesta.apellido;
          Alumnoes.dni=respuesta.dni;
          Alumnoes.fechaNacimiento=respuesta.fechaNacimiento;
          Alumnoes.mail=respuesta.mail;
          Alumnoes.obrasocial=respuesta.obrasocial;
          Alumnoes.certificadomedico=respuesta.certificadomedico;
          Alumnoes.numerosocio=respuesta.numerosocio;
          Alumnoes.nivel=respuesta.nivel;
          Alumnoes.categoria=respuesta.categoria;
          Alumnoes.edad=respuesta.edad;
          Alumnoes.diasPractica=respuesta.diasPractica;
          Alumnoes.valor=respuesta.valor;
        }
      });
      abrirCerrarModalModificar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+"/"+AlumnoesSeleccionado.idAlumno)
    .then(response=>{
      setData(data.filter(Alumnoes=>Alumnoes.idAlumno!==response.data));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }
  const seleccionarAlumnoes=(Alumnoes, caso)=>{
    setAlumnoesSeleccionado(Alumnoes);
    (caso==="Modificar")?
    abrirCerrarModalModificar(): abrirCerrarModalEliminar();
  }

  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div className="Alumnos">
      <br/><br/>
      <button onClick={()=>abrirCerrarModalGuardar()} className="btn btn-success">Agregar Nuevo Alumno</button>
      <br/><br/>
      <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID Alumno</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>D.N.I.</th>
          <th>Fecha de Nacimiento</th>
          <th>Mail</th>
          <th>Obra Social</th>
          <th>Certificado Médico</th>
          <th>Nómero de Socio</th>
          <th>Nivel</th>
          <th>Categoria</th>
          <th>Edad</th>
          <th>Días de Práctica</th>
          <th>Valor</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
    {data.map(Alumnoes=>(
      <tr key={Alumnoes.idAlumno}>
        <td>{Alumnoes.idAlumno}</td>
        <td>{Alumnoes.nombre}</td>
        <td>{Alumnoes.apellido}</td>
        <td>{Alumnoes.dni}</td>
        <td>{Alumnoes.fechaNacimiento}</td>
        <td>{Alumnoes.mail}</td>
        <td>{Alumnoes.obrasocial}</td>
        <td>{Alumnoes.certificadomedico}</td>
        <td>{Alumnoes.numerosocio}</td>
        <td>{Alumnoes.nivel}</td>
        <td>{Alumnoes.categoria}</td>
        <td>{Alumnoes.edad}</td>
        <td>{Alumnoes.diasPractica}</td>
        <td>{Alumnoes.valor}</td>
        <td>
          <button className="btn btn-primary" onClick={()=>seleccionarAlumnoes(Alumnoes, "Modificar")}>Modificar</button> {"  "}
          <button className="btn btn-danger" onClick={()=>seleccionarAlumnoes(Alumnoes, "Eliminar")}>Eliminar</button>
        </td>
      </tr>
     ))}
    </tbody>
    </table>

    <Modal isOpen={modalGuardar}>
    <ModalHeader>Agregar Alumno</ModalHeader>
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
        <label for="fechaNacimiento">Fecha de Nacimiento:</label>
        <br />
        <input type="datetime-local" name="fechaNacimiento" id="fechaNacimiento" className="form-control" onChange={handleChange}></input>
        <br />
        <label for="edad">Edad:</label>
        <br />
        <input type="text" name="edad" id="edad" className="form-control" onChange={handleChange}></input>
        <br />
        <label for="mail">Mail:</label>
        <br />
        <input type="email" name="mail" id="mail" className="form-control" onChange={handleChange}></input>
        <br />
        <label for="obrasocial">Obra Social:</label>
        <br />
        <input type="text" name="obrasocial" id="obrasocial" className="form-control" onChange={handleChange}></input>
        <br />
        <label for="certificadomedico">Certificado Médico:</label>
        <br />
        <input type="file" accept="image/x-png,image/gif,image/jpeg" name="certificadomedico" id="certificadomedico" className="form-control" onChange={handleChange}></input>
        <br />
        <label for="numerosocio">Número de Socio:</label>
        <br />
        <input type="text" name="numerosocio" id="numerosocio" className="form-control" onChange={handleChange}></input>
        <br />
        <label for="nivel">Nivel:</label>
        <br />
        <input type="text" name="nivel" id="nivel" className="form-control" onChange={handleChange}></input>
        <br />
        <label for="categoria">Categoria:</label>
        <br />
        <input type="text" name="categoria" id="categoria" className="form-control" onChange={handleChange}></input>
        <br />
        <label for="diasPractica">Dias de Práctica:</label>
        <br />
        <input type="text" name="diasPractica" id="diasPractica" className="form-control" onChange={handleChange}></input>
        <br />
        <label for="valor">Valor:</label>
        <br />
        <input type="text" name="valor" id="valor" className="form-control" onChange={handleChange}></input>
        <br />
      </div>

    </ModalBody>
    <ModalFooter>
      <button type="button" className="btn btn-primary" onClick={()=>peticionPost()}>Agregar</button>{"  "}
      <button type="button" className="btn btn-danger" onClick={()=>abrirCerrarModalGuardar()}>Cancelar</button>
    </ModalFooter>
    </Modal>
    
    <Modal isOpen={modalModificar}>
    <ModalHeader>Modificar Alumno</ModalHeader>
    <ModalBody>
      <div className="form-group">
        <label for="idAlumno">ID de Alumno:</label>
        <br />
        <input type="text" name="idAlumno" id="idAlumno" className="form-control" readOnly value={AlumnoesSeleccionado && AlumnoesSeleccionado.idAlumno }></input>
        <br />
        <label for="nombre">Nombre:</label>
        <br />
        <input type="text" name="nombre" id="nombre" className="form-control" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.nombre}></input>
        <br />
        <label for="apellido">Apellido:</label>
        <br />
        <input type="text" name="apellido" id="apellido" className="form-control" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.apellido}></input>
        <br />
        <label for="dni">D.N.I.:</label>
        <br />
        <input type="number" name="dni" id="dni" className="form-control" min="8" max="8" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.dni}></input>
        <br />
        <label for="fechaNacimiento">Fecha de Nacimiento:</label>
        <br />
        <input type="datetime-local" name="fechaNacimiento" id="fechaNacimiento" className="form-control" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.fechaNacimiento}></input>
        <br />
        <label for="edad">Edad:</label>
        <br />
        <input type="number" name="edad" id="edad" className="form-control" min="1" max="2" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.edad}></input>
        <br />
        <label for="mail">Mail:</label>
        <br />
        <input type="email" name="mail" id="mail" className="form-control" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.mail}></input>
        <br />
        <label for="obrasocial">Obra Social:</label>
        <br />
        <input type="text" name="obrasocial" id="obrasocial" className="form-control" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.obrasocial}></input>
        <br />
        <label for="certificadomedico">Certificado Médico:</label>
        <br />
        <input type="image" alt="certificado medico" name="certificadomedico" id="certificadomedico"  className="form-control" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.certificadomedico}></input>
        <br />
        <label for="numerosocio">Número de Socio:</label>
        <br />
        <input type="text" name="numerosocio" id="numerosocio" className="form-control" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.numerosocio}></input>
        <br />
        <label for="nivel">Nivel:</label>
        <br />
        <input type="text" name="nivel" id="nivel" className="form-control" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.nivel}></input>
        <br />
        <label for="categoria">Categoria:</label>
        <br />
        <input type="text" name="categoria" id="categoria" className="form-control" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.categoria}></input>
        <br />
        <label for="diasPractica">Dias de Práctica:</label>
        <br />
        <input type="text" name="diasPractica" id="diasPractica" className="form-control" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.diasPractica}></input>
        <br />
        <label for="valor">Valor:</label>
        <br />
        <input type="text" name="valor" id="valor" className="form-control" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.valor}></input>
      </div>

    </ModalBody>
    <ModalFooter>
      <button className="btn btn-primary" onClick={()=>peticionPut()}>Modificar</button>{"   "}
      <button className="btn btn-danger" onClick={()=>abrirCerrarModalModificar()}>Cancelar</button>
    </ModalFooter>
    </Modal>

    <Modal isOpen={modalEliminar}>
      <ModalBody>
        ¿Estas seguro que deseas eliminar al alumno { AlumnoesSeleccionado && AlumnoesSeleccionado.nombre}? 
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

export default Alumnos;
