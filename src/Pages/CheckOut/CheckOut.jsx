import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import swal from 'sweetalert';

const CheckOut = () => {
  const service = useLoaderData();
  //   console.log(service);
  const { _id, title, price,img } = service;
  const { user } = useContext(AuthContext);

  const handleBookService = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = user?.email;
    const booking = {
      customerName: name,
      email,
      date,
      img,
      service: title,
      service_id: _id,
      price: price,
    };
    console.log(booking);

fetch('https://car-doctor-server-puce-psi.vercel.app/bookings',{
  method:'POST',
  headers:{
    'content-type': 'application/json'
  },
  body:JSON.stringify(booking)
})
.then(res=>res.json())
.then(data=>{
  console.log(data);
  if(data.insertedId){
    swal({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success",
      button: "Aww yiss!",
    });
  }
})
  };
  return (
    <div>
      <h2>Book Service: {title}</h2>

      <form onSubmit={handleBookService} className="card-body">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
                name="name"
                type="text"
                placeholder="Name"
                defaultValue={user?.displayName}
                className="input input-bordered"
                required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input
               name="date"
               type="date"
               className="input input-bordered"
               required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
               name="email"
               type="email"
               placeholder="Email"
               defaultValue={user?.email}
               className="input input-bordered"
               required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Due Amount</span>
            </label>
            <input
                type="text"
                defaultValue={`$` + price}
                className="input input-bordered"
                required
            />
          </div>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Order Confirm</button>
        </div>
      </form>
    </div>
  );
};

export default CheckOut;
