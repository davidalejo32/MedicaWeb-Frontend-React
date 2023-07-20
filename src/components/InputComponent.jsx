import "../css/InputComponent.css";

export default function InputComponent(props) {
  const { type, textLabel, id, name, onChange, value } = props;

  return (
    <>
      <label htmlFor={id}>{textLabel}</label>
      <input type={type} id={id} name={name} onChange={onChange} value={value} />
    </>
  );
}
