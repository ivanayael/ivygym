import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { FormGroup, Button, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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


  const handleValidSubmit=e=>{
    const {values}=e.target;
    this.setState({values});
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
    delete AlumnoesSeleccionado.idAlumno;
    AlumnoesSeleccionado.dni=parseInt(AlumnoesSeleccionado.dni);
    AlumnoesSeleccionado.edad=parseInt(AlumnoesSeleccionado.edad);
    AlumnoesSeleccionado.valor=parseInt(AlumnoesSeleccionado.valor);
    if (AlumnoesSeleccionado.edad < 18) {
      alert.show('El alumno ingresado es menor de edad, se debe ingresar un tutor legal. Dirijase a la seccion correspondiente');
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
      <Button onClick={()=>abrirCerrarModalGuardar()} color="success">Agregar Nuevo Alumno</Button>{" "}
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
          <Button color="primary" onClick={()=>seleccionarAlumnoes(Alumnoes, "Modificar")}>Modificar</Button>{"  "}
          <Button color="danger" onClick={()=>seleccionarAlumnoes(Alumnoes, "Eliminar")}>Eliminar</Button>{"  "}
        </td>
      </tr>
     ))}
    </tbody>
    </table>

    <Modal isOpen={modalGuardar}>
    <ModalHeader>Agregar Alumno</ModalHeader>
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
        <Label for="fechaNacimiento">Fecha de Nacimiento:</Label>
        <br />
        <AvInput type="date" name="fechaNacimiento" id="fechaNacimiento" className="form-control" onChange={handleChange} required />
        <AvFeedback>Se requiere una fecha de nacimiento</AvFeedback>
        </AvGroup>
        <br />
        <AvGroup>
        <Label for="edad">Edad:</Label>
        <br />
        <AvInput type="number" name="edad" id="edad" className="form-control" onChange={handleChange} />
        <AvFeedback>Se requiere una edad</AvFeedback>
        </AvGroup>
        <br />
        <AvGroup>
        <Label for="mail">Mail:</Label>
        <br />
        <AvInput type="email" name="mail" id="mail" className="form-control" onChange={handleChange} required></AvInput>
        </AvGroup>
        <br />
        <AvGroup>
        <Label for="obrasocial">Obra Social:</Label>
        <br />
        <AvInput type="text" name="obrasocial" id="obrasocial" className="form-control" onChange={handleChange} required></AvInput>
        </AvGroup>
        <br />
        <AvGroup>
        <Label for="certificadomedico">Certificado Médico:</Label>
        <br />
        <AvInput type="file" accept="image/x-png,image/gif,image/jpeg" name="certificadomedico" id="certificadomedico" className="form-control" onChange={handleChange}></AvInput>
        </AvGroup>
        <br />
        <AvGroup>
        <Label for="numerosocio">Número de Socio:</Label>
        <br />
        <AvInput type="text" name="numerosocio" id="numerosocio" className="form-control" onChange={handleChange} required></AvInput>
        </AvGroup>
        <br />
        <AvGroup>
        <Label for="nivel">Nivel:</Label>
        <br />
        <AvInput type="text" name="nivel" id="nivel" className="form-control" onChange={handleChange}></AvInput>
        </AvGroup>
        <br />
        <AvGroup>
        <Label for="categoria">Categoria:</Label>
        <br />
        <AvInput type="text" name="categoria" id="categoria" className="form-control" onChange={handleChange}></AvInput>
        </AvGroup>
        <br />
        <AvGroup>
        <Label for="diasPractica">Dias de Práctica:</Label>
        <br />
        <AvInput type="text" name="diasPractica" id="diasPractica" className="form-control" onChange={handleChange}></AvInput>
        </AvGroup>
        <br />
        <AvGroup>
        <Label for="valor">Valor:</Label>
        <br />
        <AvInput type="number" name="valor" id="valor" className="form-control" onChange={handleChange}></AvInput>
        </AvGroup>
        <br />
        </FormGroup>
      </AvForm>

    </ModalBody>
    <ModalFooter>
    <FormGroup>
      <Button color="primary" onClick={()=>peticionPost()}>Agregar</Button>{"  "}
      <Button color="danger" onClick={()=>abrirCerrarModalGuardar()}>Cancelar</Button>{"  "}
    </FormGroup>
    </ModalFooter>
    </Modal>
    
    <Modal isOpen={modalModificar}>
    <ModalHeader>Modificar Alumno</ModalHeader>
    <ModalBody>
    <AvForm onInvalidSubmit={handleInvalidSubmit} className="form-group">
      <FormGroup>
        <Label for="idAlumno">ID de Alumno:</Label>
        <br />
        <AvInput type="text" name="idAlumno" id="idAlumno" className="form-control" readOnly value={AlumnoesSeleccionado && AlumnoesSeleccionado.idAlumno }></AvInput>
        <br />
        <Label for="nombre">Nombre:</Label>
        <br />
        <AvInput type="text" name="nombre" id="nombre" className="form-control" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.nombre}></AvInput>
        <br />
        <Label for="apellido">Apellido:</Label>
        <br />
        <AvInput type="text" name="apellido" id="apellido" className="form-control" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.apellido}></AvInput>
        <br />
        <Label for="dni">D.N.I.:</Label>
        <br />
        <AvInput type="number" name="dni" id="dni" className="form-control" min="8" max="8" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.dni}></AvInput>
        <br />
        <Label for="fechaNacimiento">Fecha de Nacimiento:</Label>
        <br />
        <AvInput type="datetime-local" name="fechaNacimiento" id="fechaNacimiento" className="form-control" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.fechaNacimiento}></AvInput>
        <br />
        <Label for="edad">Edad:</Label>
        <br />
        <AvInput type="number" name="edad" id="edad" className="form-control" min="1" max="2" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.edad}></AvInput>
        <br />
        <Label for="mail">Mail:</Label>
        <br />
        <AvInput type="email" name="mail" id="mail" className="form-control" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.mail}></AvInput>
        <br />
        <Label for="obrasocial">Obra Social:</Label>
        <br />
        <AvInput type="text" name="obrasocial" id="obrasocial" className="form-control" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.obrasocial}></AvInput>
        <br />
        <Label for="certificadomedico">Certificado Médico:</Label>
        <br />
        <AvInput type="image" alt="certificado medico" name="certificadomedico" id="certificadomedico"  className="form-control" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.certificadomedico}></AvInput>
        <br />
        <Label for="numerosocio">Número de Socio:</Label>
        <br />
        <AvInput type="text" name="numerosocio" id="numerosocio" className="form-control" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.numerosocio}></AvInput>
        <br />
        <Label for="nivel">Nivel:</Label>
        <br />
        <AvInput type="text" name="nivel" id="nivel" className="form-control" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.nivel}></AvInput>
        <br />
        <Label for="categoria">Categoria:</Label>
        <br />
        <AvInput type="text" name="categoria" id="categoria" className="form-control" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.categoria}></AvInput>
        <br />
        <Label for="diasPractica">Dias de Práctica:</Label>
        <br />
        <AvInput type="text" name="diasPractica" id="diasPractica" className="form-control" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.diasPractica}></AvInput>
        <br />
        <Label for="valor">Valor:</Label>
        <br />
        <AvInput type="number" name="valor" id="valor" className="form-control" onChange={handleChange} value={AlumnoesSeleccionado && AlumnoesSeleccionado.valor}></AvInput>
        </FormGroup>
      </AvForm>

    </ModalBody>
    <ModalFooter>
    <FormGroup>
      <Button className="btn btn-primary" onClick={()=>peticionPut()}>Modificar</Button>{"   "}
      <Button className="btn btn-danger" onClick={()=>abrirCerrarModalModificar()}>Cancelar</Button>
      </FormGroup>
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
