import cancel from "../../images/7.png";
import greenmark from "../../images/8.png";

const ServicesItem = (props) => {
  return (
    <>
      <p className="escort-serviceitem">
        {props.status ? (
          <img src={greenmark} className="small-img" />
        ) : (
          <img src={cancel} className="small-img" />
        )}
        {props.title}
      </p>
    </>
  );
};

export default ServicesItem;
