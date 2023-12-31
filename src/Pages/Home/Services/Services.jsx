import { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';


const Services = () => {
    const [services,setServices]=useState([]);

useEffect(()=>{
  fetch('https://car-doctor-server-puce-psi.vercel.app/services')
  .then(res => res.json())
  .then(data => setServices(data));
},[])



    return (
  <div className="mt-4">
          <div className="text-center">
            <h3 className="text-orange-600 text-2xl font-bold">Services</h3>
            <h1 className="text-4xl font-bold">Our Service Area</h1>
            <p>The majority have suffered alteration in some form, by injected humour, or randomised <br /> words which do not look even slightly believable. </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 mb-6'>
         {
          services.map(service=><ServiceCard key={service._id} service={service}></ServiceCard>)
         }
        </div>
  </div>
    );
};

export default Services;
