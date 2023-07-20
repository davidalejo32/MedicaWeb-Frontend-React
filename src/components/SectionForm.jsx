import InputComponent from "./InputComponent";
import "../css/SectionForm.css";
import Button from "./Button";

export default function SectionForm(props) {
  const { description, inputComponents, onSubmit, showError } = props;

  return (
    <section className="section__form-container">
      <p className="section__form-text">{description}</p>

      <form id="form" className="form">
        {inputComponents.map((inputComponent, index) => (
          <InputComponent key={index} {...inputComponent.props} />
        ))}
        {showError && (
          <p className="error">
            ¡Hay campos vacíos! Por favor, completa todos los campos antes de
            enviar.
          </p>
        )}
        <Button text="registrar" onClick={onSubmit} />
      </form>
    </section>
  );
}
