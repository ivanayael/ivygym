import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { FormGroup, Button, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';




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
  
  const handleInvalidSubmit=e=>{
    const {values}=e.target;
    this.setState({values});
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
       <br/><h1>Registro de Los Tutores de los Alumnos Menores de 18 años</h1><br/>
      <Button onClick={()=>abrirCerrarModalGuardar()} color="success">Agregar Nuevo Tutor</Button>
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
          <Button color="primary"  onClick={()=>seleccionarTutors(Tutors, "Modificar")}>Modificar</Button>{"  "}
           <Button color="danger" onClick={()=>seleccionarTutors(Tutors, "Eliminar")}>Eliminar</Button>
        </td>
      </tr>
     ))}
    </tbody>
    </table>

    <Modal isOpen={modalGuardar}>
    <ModalHeader>Agregar Tutor</ModalHeader>
    <ModalBody>
    <AvForm onInvalidSubmit={handleInvalidSubmit} className="form-group">
      <FormGroup>
        <AvGroup>
        <Label for="nombre">Nombre:</Label>
        <br />
        <AvInput type="text" name="nombre" id="nombre" className="form-control" onChange={handleChange} required />
        <AvFeedback>Se requiere un nombre</AvFeedback>
         </AvGroup>
        <br />
        <AvGroup>
        <Label for="apellido">Apellido:</Label>
        <br />
        <AvInput type="text" name="apellido" id="apellido" className="form-control" onChange={handleChange} required />
        <AvFeedback>Se requiere un apellido</AvFeedback>
        </AvGroup>
        <br />
        <AvGroup>
        <Label for="dni">D.N.I.:</Label>
        <br />
        <AvInput type="number" name="dni" id="dni" className="form-control" onChange={handleChange} required />
        <AvFeedback>Se requiere un DNI</AvFeedback>
        </AvGroup>
        <br />
        <AvGroup>
        <Label for="mail">Mail:</Label>
        <br />
        <AvInput type="email" name="mail" id="mail" className="form-control" onChange={handleChange} required />
        <AvFeedback>Se requiere una email</AvFeedback>
        </AvGroup>
        <br />
		<AvGroup>
        <Label for="telefono">Teléfono:</Label>
        <br />
        <AvInput type="text" name="telefono" id="telefono" className="form-control" onChange={handleChange} required />
        <AvFeedback>Se requiere un numero de telefono</AvFeedback>
        </AvGroup>
        <br />
	    <AvGroup>
        <Label for="idAlumno">ID de Alumno:</Label>
        <br />
        <AvInput type="number" name="idAlumno" id="idAlumno"  className="form-control" onChange={handleChange} required/>
        <AvFeedback>Se requiere ingresar el ID del alumno asociado</AvFeedback>
        </AvGroup>
        <br />
        </FormGroup>
      </AvForm>
	  
    </ModalBody>
    <ModalFooter>
      <FormGroup>
      <Button color="primary" onClick={()=>peticionPost()}>Agregar</Button>{"  "}
      <Button color="danger" onClick={()=>abrirCerrarModalGuardar()}>Cancelar</Button>
      </FormGroup>
    </ModalFooter>
    </Modal>
    
    <Modal isOpen={modalModificar}>
    <ModalHeader>Modificar Tutor</ModalHeader>
    <ModalBody>
      <AvForm onInvalidSubmit={handleInvalidSubmit} className="form-group">
      <FormGroup>
	     <AvGroup>
        <Label for="idTutor">ID de Tutor:</Label>
        <br />
        <AvInput  type="text" name="idTutor" id="idTutor" className="form-control" readOnly value={TutorsSeleccionado && TutorsSeleccionado.idAlumno } />
		</AvGroup>
        <br />
		<AvGroup>
        <Label for="nombre">Nombre:</Label>
        <br />
        <AvInput  type="text" name="nombre" id="nombre" className="form-control" onChange={handleChange} value={TutorsSeleccionado && TutorsSeleccionado.nombre} />
		<AvFeedback>Se requiere ingresar el nombre</AvFeedback>
        </AvGroup>
        <br />
		 <AvGroup>
        <Label for="apellido">Apellido:</Label>
        <br />
        <AvInput type="text" name="apellido" id="apellido" className="form-control" onChange={handleChange} value={TutorsSeleccionado && TutorsSeleccionado.apellido} />
		 <AvFeedback>Se requiere ingresar el apellido</AvFeedback>
        </AvGroup>
        <br />
		 <AvGroup>
        <Label for="dni">D.N.I.:</Label>
        <br />
         <AvInput type="number" name="dni" id="dni" className="form-control" min="8" max="8" onChange={handleChange} value={TutorsSeleccionado && TutorsSeleccionado.dni} />
		 <AvFeedback>Se requiere ingresar el dni</AvFeedback>
        </AvGroup>
        <br />
		 <AvGroup>
        <label for="mail">Mail:</label>
        <br />
         <AvInput  type="email" name="mail" id="mail" className="form-control" onChange={handleChange} value={TutorsSeleccionado && TutorsSeleccionado.mail} />
		<AvFeedback>Se requiere ingresar el email</AvFeedback>
        </AvGroup>
        <br />
		 <AvGroup>
        <Label for="telefono">Teléfono:</Label>
        <br />
         <AvInput type="text" name="telefono" id="telefono" className="form-control" onChange={handleChange} value={TutorsSeleccionado && TutorsSeleccionado.telefono} />
		 <AvFeedback>Se requiere ingresar número de teléfono</AvFeedback>
        </AvGroup>
        <br />
		 <AvGroup>
        <Label for="idAlumno">ID de Alumno:</Label>
        <br />
         <AvInput  type="number" name="idAlumno" id="idAlumno" className="form-control" onChange={handleChange}  value={TutorsSeleccionado && TutorsSeleccionado.idAlumno} />
		 <AvFeedback>Se requiere ingresar la ID de alumno asociado al tutor</AvFeedback>
        </AvGroup>
        <br />
        </FormGroup>
      </AvForm>

    </ModalBody>
    <ModalFooter>
    <FormGroup>
      <Button color="primary" onClick={()=>peticionPut()}>Modificar</Button>{"   "}
      <Button color="danger" onClick={()=>abrirCerrarModalModificar()}>Cancelar</Button>
      </FormGroup>
    </ModalFooter>
    </Modal>

    <Modal isOpen={modalEliminar}>
      <ModalBody>
        ¿Estas seguro que deseas eliminar al Tutor { TutorsSeleccionado && TutorsSeleccionado.nombre}? 
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={()=>peticionDelete()}>
          Sí
        </Button>
        <Button
          color="secondary"
          onClick={()=>abrirCerrarModalEliminar()}
        >
          No
        </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Tutores;
