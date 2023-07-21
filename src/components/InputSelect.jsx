export default function InputSelect(props) {
  const { id, textLabel, options, onChange, value } = props;

  return (
    <>
      <label htmlFor={id}>{textLabel}</label>
      <select name="" id={id} onChange={onChange} value={value}>
        <option value="">Selecciona una especialidad</option>
        {options.map((specialty) => {
          const id = specialty._links.self.href.split("/").pop();
          return (
            <option key={id} value={id}>
              {specialty.name}
            </option>
          );
        })}
      </select>
    </>
  );
}
