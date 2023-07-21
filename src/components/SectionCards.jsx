import Card from "../components/Card";
import "../css/SectionCard.css";

export default function SectionCards(props) {
  const { description, users } = props;
  return (
    <section className="section__cards-container">
      <div className="section__cards-color">
        <p> {description}</p>
      </div>

      <div className="section__cards">
        <div className="cards__container">
          
          {users.map((user, index)=>(
            <Card 
              key={index}
              data={user}
            />
          ))}
          
        </div>
      </div>
    </section>
  );
}
