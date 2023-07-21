import Nav from "../components/Nav";
import SectionForm from "../components/SectionForm";
import InputComponent from "../components/InputComponent";
import { useState, useEffect } from "react";
import { createSpecialty, getSpecialty } from "../api/specialty";

export default function Specialties() {
  const [formValues, setFormValues] = useState({
    name: "",
  });

  const [showError, setShowError] = useState(false);

  const [specialty, setSpecialty] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener la lista de usuarios
    const fetchUsers = async () => {
      try {
        const response = await getSpecialty(); // Debes implementar la función getUsers para hacer la petición a la API y obtener la lista de usuarios
        setSpecialty(response.data._embedded.specialties); // Asigna la lista de usuarios a la variable de estado users
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
        const sendSpecialty = await createSpecialty(formValues);

        if (sendSpecialty.status === 200 || sendSpecialty.status === 201) {
          console.log("¡Especialidad creada exitosamente!");
          // Limpiar los datos de los inputs
          setFormValues({
            name: "",
          });

          const response = await getSpecialty();
          setSpecialty(response.data._embedded.users);
          console.log(specialty);

        } else if (sendSpecialty.status === 409) {
          console.log(sendSpecialty.data);
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
        <SectionForm
          description="¿Eres experto en tu campo? Registra tu especialidad y comparte tus conocimientos con nuestra comunidad. ¡Únete a nosotros y forma parte de nuestro equipo de especialistas!"
          inputComponents={[
            <InputComponent
              type="text"
              textLabel="nombre de la especialidad"
              id="name"
              name="name"
              onChange={handleInputChange}
              value={formValues.name}
            />
          ]}
          buttonText="crear especialidad"
          onSubmit={handleSubmit}
          showError={showError}
        />
      </main>
    </>
  );
}
