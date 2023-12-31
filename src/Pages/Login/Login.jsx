import { useContext } from "react";
import img from "../../assets/images/login/login.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import axios from "axios";
// import { WithCredentials } from "firebase/auth";

const Login = () => {
  const {signIn}=useContext(AuthContext)
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email =form.email.value;
    const password = form.password.value;
    console.log(email,password);

    signIn(email,password)
    .then(result=>{
      const loggedInUser = result.user;
      console.log(loggedInUser);
      const user ={email};
     
      // get access token
axios.post('https://car-doctor-server-puce-psi.vercel.app/jwt',user, {withCredentials: true})
.then(res=>{
  console.log(res.data);
  if (res.data) {
    navigate(location?.state ? location?.state : '/')
}
})
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
          <h1 className="text-5xl font-bold text-center">Login</h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
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
                placeholder="password"
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
              <input className="btn btn-primary" type="submit" value="Login" />
            </div>
          </form>
          <p className="text-center  mb-6">
            New to Car Doctors?{" "}
            <Link className="text-orange-600 font-bold" to="/signup">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
