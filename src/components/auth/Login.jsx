// const Login = () => {
//   return <div>this is login page</div>;
// };

// export default Login;

import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useContext, useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvaider";

const Login = () => {
  const { handleLogin, handleLoginGoogle, setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberEmail, setRememberEmail] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const handleLoginForm = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    handleLogin(email, password)
      .then(() => {
        // toast.success("Login successful!", {
        //   position: "top-center",
        //   autoClose: 2500,
        // });
        navigate(redirectTo);
      })
      .catch(() => {
        // toast.error("Something went wrong! Try again.", {
        //   position: "top-center",
        //   autoClose: 2500,
        // });
      });
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await handleLoginGoogle();
      setUser(result.user);

      navigate(redirectTo);
    } catch {
      //   toast.error("Something went wrong! Try again", {
      //     position: "top-center",
      //     autoClose: 2500,
      //   });
    }
  };

  return (
    <>
      <div className="py-10 min-h-screen flex items-center justify-center">
        <Card className="p-6 md:w-1/2 w-full shadow-lg">
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-6 text-center"
          >
            Login
          </Typography>
          <form onSubmit={handleLoginForm}>
            <div className="mb-4">
              <Typography variant="small" className="mb-2">
                Email
              </Typography>
              <Input
                type="email"
                value={rememberEmail}
                onChange={(e) => setRememberEmail(e.target.value)}
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4 relative">
              <Typography variant="small" className="mb-2">
                Password
              </Typography>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-xl"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <Link
                to="/reset/password"
                state={rememberEmail}
                className="text-sm  hover:underline"
              >
                Forgot password?
              </Link>
              <Typography variant="small">
                Don’t Have An Account?{" "}
                <Link to="/register" className=" text-red-500 hover:underline">
                  Register Now
                </Link>
              </Typography>
            </div>

            <Button type="submit" className="w-full mb-4">
              Login
            </Button>
          </form>

          <Button
            variant="outlined"
            color="black"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-2xl" /> Login with Google
          </Button>
        </Card>
      </div>
    </>
  );
};

export default Login;
