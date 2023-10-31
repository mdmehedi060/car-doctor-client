import { Link } from "react-router-dom";


const ServiceCard = ({service}) => {
    const {service_id,title,img,price}=service;
    return (
        <div className="card w-96 bg-base-100 mb-6 shadow-xl">
  <figure className="px-10 pt-10">
    <img src={img} alt="Shoes" className="rounded-xl" />
  </figure>
  <div className="card-body ">
    <h2 className="card-title">{title}</h2>
    <p className="text-xl text-orange-600">Price: ${price}</p>
    <div className="card-actions">
     <Link to={`/checkout/${service_id}`}>
     <button className="btn btn-primary">Book Now</button>
     </Link>
    </div>
  </div>
</div>
    );
};

export default ServiceCard;