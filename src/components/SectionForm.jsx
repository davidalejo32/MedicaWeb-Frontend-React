import InputComponent from "./InputComponent";
import "../css/SectionForm.css";
import Button from "./Button";
import InputSelect from "./InputSelect";

export default function SectionForm(props) {
  const { description, inputComponents, inputSelectComponent, onSubmit, showError, buttonText } = props;

  return (
    <section className="section__form-container">
      <p className="section__form-text">{description}</p>

      <form id="form" className="form">
        {inputComponents.map((inputComponent, index) => (
          <InputComponent key={index} {...inputComponent.props} />
        ))}

        {inputSelectComponent && inputSelectComponent.map((inputSelect, index)=>(
            <InputSelect key={index} {...inputSelect.props}/>
        ))}

        {showError && (
          <p className="error">
            ¡Hay campos vacíos! Por favor, completa todos los campos antes de
            enviar.
          </p>
        )}
        <Button text={buttonText} onClick={onSubmit} />
      </form>
    </section>
  );
}
