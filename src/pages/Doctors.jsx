import Nav from "../components/Nav";
import SectionCards from "../components/SectionCards";
import SectionForm from "../components/SectionForm";
import InputComponent from "../components/InputComponent";
import { useState, useEffect } from "react";
import { createUser, getUser } from "../api/user";

export default function Doctors() {
  const [formValues, setFormValues] = useState({
    name: "",
    lastName: "",
    idNumber: "",
    birthDate: "",
    phoneNumber: "",
  });

  const [showError, setShowError] = useState(false);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener la lista de usuarios
    const fetchUsers = async () => {
      try {
        const response = await getUser(); // Debes implementar la función getUsers para hacer la petición a la API y obtener la lista de usuarios
        setUsers(response.data._embedded.users); // Asigna la lista de usuarios a la variable de estado users
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    // Realizar la validación para verificar que no hay campos vacíos
    const areAllFieldsFilled = Object.values(formValues).every(
      (value) => value !== ""
    );

    if (areAllFieldsFilled) {
      setShowError(false);

      try {
        const sendUser = await createUser(formValues);

        if (sendUser.status === 200 || sendUser.status === 201) {
          console.log("¡Usuario creado exitosamente!");
          // Limpiar los datos de los inputs
          setFormValues({
            name: "",
            lastName: "",
            idNumber: "",
            birthDate: "",
            phoneNumber: "",
          });

          const response = await getUser();
          setUsers(response.data._embedded.users);
          
        } else if (sendUser.status === 409) {
          console.log(sendUser.data);
        } else {
          console.log("Hubo un error en el servidor.");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setShowError(true);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    // Validar tipos de datos
    if (type === "number") {
      // Verificar que el valor ingresado sea un número
      if (!isNaN(value)) {
        setFormValues({ ...formValues, [name]: value });
      }
    } else if (type === "text") {
      // Verificar que el valor ingresado sea una cadena de texto
      setFormValues({ ...formValues, [name]: value });
    } else if (type === "date") {
      // No es necesario validar el tipo de dato para 'date', ya que el input de tipo 'date' solo permite fechas válidas.
      setFormValues({ ...formValues, [name]: value });
    }
  };

  return (
    <>
      <header>
        <Nav />
      </header>

      <main>
        <SectionCards
          description="¡Bienvenido a MedicaWeb! La plataforma en línea que te conecta con los mejores 
          médicos y especialistas. A continuación, te presentamos el listado de pacientes 
          registrados en nuestra plataforma"
          users={users}
        />

        <SectionForm
          description="En MedicaWeb, nos enfocamos en simplificar la gestión los pacientes.
          Regístralos fácilmente y accede a su información cuando lo necesites.
          ¡Comienza hoy mismo y lleva un control eficiente!"
          inputComponents={[
            <InputComponent
              type="text"
              textLabel="nombre"
              id="name"
              name="name"
              onChange={handleInputChange}
              value={formValues.name}
            />,
            <InputComponent
              type="text"
              textLabel="apellido"
              id="lastName"
              name="lastName"
              onChange={handleInputChange}
              value={formValues.lastName}
            />,
            <InputComponent
              type="number"
              textLabel="numero de cedula"
              id="idNumber"
              name="idNumber"
              onChange={handleInputChange}
              value={formValues.idNumber}
            />,
            <InputComponent
              type="date"
              textLabel="fecha de nacimiento"
              id="birthDate"
              name="birthDate"
              onChange={handleInputChange}
              value={formValues.birthDate}
            />,
            <InputComponent
              type="number"
              textLabel="numero de contacto"
              id="phoneNumber"
              name="phoneNumber"
              onChange={handleInputChange}
              value={formValues.phoneNumber}
            />,
          ]}
          onSubmit={handleSubmit}
          showError={showError}
        />
      </main>
    </>
  );
}
