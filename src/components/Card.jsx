import "../css/Card.css";
export default function Card(props) {

  const { data } = props
  return (
    <>
      <div className="card">
        <div className="card__header">
          <img className="card__img" />
          <div className="card__name-container">
            <p className="card__name">{data.name}</p>
            <p className="card__data">{data.data}</p>
          </div>
        </div>
        <div className="card__body">
          <div className="card__first-container">
            <p className="card__first">{data.firts}</p>
            <p className="card__first-text">{data.firtsText}</p>
          </div>
          <div className="card__second-container">
            <div className="card__second-left">
              <p className="card__second">{data.second}</p>
              <p className="card__second-text">{data.secondText}</p>
            </div>
            <div className="card__tipe-container">
              <p className="card__tipe-text">{data.type}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



// props.name
// props.data
// props.firts
// props.firtsText
// props.second
// props.secondText
// props.type