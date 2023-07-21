import Nav from "../components/Nav";
import SectionCards from "../components/SectionCards";
import SectionForm from "../components/SectionForm";
import InputComponent from "../components/InputComponent";
import InputSelect from "../components/InputSelect";
import { useState, useEffect } from "react";
import { getSpecialty } from "../api/specialty";
import { createDoctor, getDoctors } from "../api/doctor";

export default function Doctors() {
  const [formValues, setFormValues] = useState({
    name: "",
    lastName: "",
    office: "",
    email: "",
    specialty: {
      id: ""
    },
  });


  const [showError, setShowError] = useState(false);

  const [doctors, setDoctors] = useState([]);
  const [specialty, setSpecialty] = useState([]);
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState("");

  useEffect(() => {
    // Llamada a la API para obtener la lista de usuarios
    const fetchUsers = async () => {
      try {
        const response = await getDoctors(); // Debes implementar la función getUsers para hacer la petición a la API y obtener la lista de usuarios
        setDoctors(response.data); // Asigna la lista de usuarios a la variable de estado users
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Llamada a la API para obtener la lista de especialidades
    const fetchSpecialties = async () => {
      try {
        const response = await getSpecialty(); // Debes implementar la función getSpecialty para hacer la petición a la API y obtener la lista de especialidades
        setSpecialty(response.data._embedded.specialties); // Asigna la lista de especialidades a la variable de estado specialty
      } catch (error) {
        console.log(error);
      }
    };

    fetchSpecialties();
  }, []);


  const handleSubmit = async () => {
    // Realizar la validación para verificar que no hay campos vacíos
    const areAllFieldsFilled = Object.values(formValues).every(
      (value) => value !== ""
    );

    if (areAllFieldsFilled) {
      setShowError(false);

      try {
        const sendDoctor = await createDoctor(formValues);

        if (sendDoctor.status === 200 || sendDoctor.status === 201) {
          console.log("¡Usuario creado exitosamente!");
          // Limpiar los datos de los inputs
          setFormValues({
            name: "",
            lastName: "",
            office: "",
            email: "",
            specialty: {
              id: ""
            },
          });

          const response = await getDoctors();
          setDoctors(response.data);
        } else if (sendDoctor.status === 409) {
          console.log(sendDoctor.data);
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
  
    if (type === "number") {
      // Verificar que el valor ingresado sea un número
      if (!isNaN(value)) {
        setFormValues({ ...formValues, [name]: value });
      }
    } else if (type === "text" || type === "email") {
      // Verificar que el valor ingresado sea una cadena de texto o un email válido
      setFormValues({ ...formValues, [name]: value });
    } else if (type === "date") {
      setFormValues({ ...formValues, [name]: value });
    } else if (type === "select-one") {
      setFormValues({
        ...formValues,
        specialty: {
          id: value,
        },
      });
      setSelectedSpecialtyId(value);
    }
  };
  

  const doctorsData = doctors.map((doctor) => ({
    name: `${doctor.name} ${doctor.lastName}`,
    data: `Consultorio: ${doctor.office}`,
    firts: doctor.specialty.name,
    firtsText: "especialidad",
    second: doctor.email,
    secondText: "correo electronico",
    type: "doctor",
  }));


  return (
    <>
      <header>
        <Nav />
      </header>

      <main>
        <SectionCards
          description="Conoce a nuestros especialistas en salud: aquí encontrarás información detallada 
          sobre nuestros médicos y sus áreas de expertise, para que puedas elegir al 
          profesional que mejor se adapte a tus necesidades médicas."
          users={doctorsData}
        />

        <SectionForm
          description="Únete a nuestro equipo de profesionales de la salud: completa el formulario para 
          registrarte como médico en nuestra plataforma y estar disponible para nuestros 
          pacientes"
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
              textLabel="Consultorio"
              id="office"
              name="office"
              onChange={handleInputChange}
              value={formValues.office}
            />,
            <InputComponent
              type="email"
              textLabel="Correo Electronico"
              id="email"
              name="email"
              onChange={handleInputChange}
              value={formValues.email}
            />,
          ]}
          inputSelectComponent={[
            <InputSelect
              textLabel="especialidades"
              id="especialidades"
              options={specialty}
              onChange={handleInputChange}
              value={selectedSpecialtyId}
              name="specialty"
            />,
          ]}
          buttonText="registrar"
          onSubmit={handleSubmit}
          showError={showError}
        />
      </main>
    </>
  );
}
