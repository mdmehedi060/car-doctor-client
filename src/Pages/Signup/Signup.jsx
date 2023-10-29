import { useContext } from "react";
import img from "../../assets/images/login/login.svg";
import { Link } from "react-router-dom";
import { AuthContext } from './../../Providers/AuthProviders';

const Signup = () => {

  const {createUser} = useContext(AuthContext);

    const handleSignup = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email =form.email.value;
        const password = form.password.value;
        console.log(name,email,password);

createUser(email,password)
.then(result=>{
  const user = result.user;
  console.log(user);
})
.catch(error=>console.log(error))


      };

    return (
        <div className="hero min-h-screen bg-base-200 mb-6 mt-6">
      <div className="hero-content flex-col lg:flex-row">
        <div className="mr-12 w-1/2">
          <img src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-5xl font-bold text-center">Signup</h1>
          <form onSubmit={handleSignup} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Name"
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
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Signup" />
            </div>
          </form>
          <p className="text-center  mb-6">
            Allready have an account?{" "}
            <Link className="text-orange-600 font-bold" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
    );
};

export default Signup;