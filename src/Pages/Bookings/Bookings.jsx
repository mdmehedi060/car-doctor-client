import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { useEffect } from "react";
import BookingRow from "./BookingRow";
import axios from "axios";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";



const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const axiosSecure= UseAxiosSecure()
  // const url = `http://localhost:5000/bookings?email=${user?.email}`;
  const url = `/bookings?email=${user?.email}`;

  useEffect(() => {
    
    
    
    // axios.get(url, {withCredentials: true})
    // .then(res => {
    //     setBookings(res.data);
    // })
axiosSecure.get(url)
.then(res=>setBookings(res.data))

    // fetch(url,{withCredentials: true})
    //   .then((res) => res.json())
    //   .then((data) => setBookings(data));
  }, [url,axiosSecure]);

  const handleDelate=id=>{
    const procced = confirm('Are you sure you want to delate');
    if(procced){
fetch(`https://car-doctor-server-puce-psi.vercel.app/bookings/${id}`,{
    method: 'DELETE'
})
.then(res=>res.json())
.then(data=>{
    console.log(data);
    if(data.deletedCount > 0){
        alert('You delete this booking!')
          const remaining = bookings.filter(booking=>booking._id !== id);
          setBookings(remaining);
    }
})
    }
}

const handleBookingConfirm = id => {
  fetch(`https://car-doctor-server-puce-psi.vercel.app/bookings/${id}`, {
      method: 'PATCH',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({ status: 'confirm' })
  })
      .then(res => res.json())
      .then(data => {
          console.log(data);
          if (data.modifiedCount > 0) {
              // update state
              const remaining = bookings.filter(booking => booking._id !== id);
              const updated = bookings.find(booking => booking._id === id);
              updated.status = 'confirm'
              const newBookings = [updated, ...remaining];
              setBookings(newBookings);
          }
      })
}



  return (
    <div>
      <h2 className="text-5xl">Your Bookings:{bookings.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-xl text-black font-bold">
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Image</th>
              <th>Service</th>
              <th>Date</th>
              <th>Price</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <BookingRow 
              key={booking._id} 
              booking={booking}
              handleDelate={ handleDelate}
              handleBookingConfirm={ handleBookingConfirm}
              ></BookingRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
