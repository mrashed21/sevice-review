// const Login = () => {
//   return <div>this is login page</div>;
// };

// export default Login;

// import { Button, Card, Input, Typography } from "@material-tailwind/react";
// import { useContext, useState } from "react";

// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthProvaider";

// const Login = () => {
//   const { handleLogin, handleLoginGoogle, setUser } = useContext(AuthContext);
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberEmail, setRememberEmail] = useState();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const redirectTo = location.state?.from || "/";

//   const handleLoginForm = (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     handleLogin(email, password)
//       .then(() => {
//         // toast.success("Login successful!", {
//         //   position: "top-center",
//         //   autoClose: 2500,
//         // });
//         navigate(redirectTo);
//       })
//       .catch(() => {
//         // toast.error("Something went wrong! Try again.", {
//         //   position: "top-center",
//         //   autoClose: 2500,
//         // });
//       });
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await handleLoginGoogle();
//       setUser(result.user);

//       navigate(redirectTo);
//     } catch {
//       //   toast.error("Something went wrong! Try again", {
//       //     position: "top-center",
//       //     autoClose: 2500,
//       //   });
//     }
//   };

//   return (
//     <>
//       <div className="py-10 min-h-screen flex items-center justify-center">
//         <Card className="p-6 md:w-1/2 w-full shadow-lg">
//           <Typography
//             variant="h4"
//             color="blue-gray"
//             className="mb-6 text-center"
//           >
//             Login
//           </Typography>
//           <form onSubmit={handleLoginForm}>
//             <div className="mb-4">
//               <Typography variant="small" className="mb-2">
//                 Email
//               </Typography>
//               <Input
//                 type="email"
//                 value={rememberEmail}
//                 onChange={(e) => setRememberEmail(e.target.value)}
//                 name="email"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>

//             <div className="mb-4 relative">
//               <Typography variant="small" className="mb-2">
//                 Password
//               </Typography>
//               <Input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Enter your password"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-9 text-xl"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>

//             <div className="flex flex-col md:flex-row justify-between items-center mb-4">
//               <Link
//                 to="/reset/password"
//                 state={rememberEmail}
//                 className="text-sm  hover:underline"
//               >
//                 Forgot password?
//               </Link>
//               <Typography variant="small">
//                 Don’t Have An Account?{" "}
//                 <Link to="/register" className=" text-red-500 hover:underline">
//                   Register Now
//                 </Link>
//               </Typography>
//             </div>

//             <Button type="submit" className="w-full mb-4">
//               Login
//             </Button>
//           </form>

//           <Button
//             variant="outlined"
//             color="black"
//             onClick={handleGoogleLogin}
//             className="w-full flex items-center justify-center gap-2"
//           >
//             <FcGoogle className="text-2xl" /> Login with Google
//           </Button>
//         </Card>
//       </div>
//     </>
//   );
// };

// export default Login;
import {
  Button,
  Card,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvaider";

const Login = () => {
  const { handleLogin, handleLoginGoogle, handleReseTPassword, setUser } =
    useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";
  // Handle Login
  const handleLoginForm = (e) => {
    e.preventDefault();
    const password = e.target.password.value;

    handleLogin(email, password)
      .then(() => {
        toast.success("Login successful!");
        navigate(redirectTo);
      })
      .catch(() => {
        toast.error("Something went wrong! Try again.");
      });
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await handleLoginGoogle();
      setUser(result.user);
      toast.success("Google login successful!");
      navigate(redirectTo);
    } catch {
      toast.error("Something went wrong! Try again.");
    }
  };

  // Handle Password Reset
  const handlePasswordReset = async () => {
    try {
      await handleReseTPassword(resetEmail);
      toast.success("Reset email sent successfully!");
      setIsModalOpen(false); // Close modal
    } catch {
      toast.error("Failed to send reset email!");
    }
  };

  // Open Modal and pre-fill email
  const openResetPasswordModal = () => {
    setResetEmail(email);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Login Form */}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <button
                type="button"
                onClick={openResetPasswordModal}
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot password?
              </button>
              <Typography variant="small">
                Don’t Have An Account?{" "}
                <a href="/register" className="text-red-500 hover:underline">
                  Register Now
                </a>
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

      {/* Reset Password Modal */}
      <Dialog
        open={isModalOpen}
        handler={() => setIsModalOpen(!isModalOpen)}
        size="sm"
        className="p-6"
      >
        <Typography variant="h5" color="blue-gray" className="text-center mb-4">
          Reset Password
        </Typography>
        <div className="space-y-4">
          <Input
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
          <div className="flex justify-between mt-4">
            <Button
              color="blue"
              onClick={handlePasswordReset}
              className="w-full mr-2"
            >
              Send Reset Link
            </Button>
            <Button
              color="red"
              variant="outlined"
              onClick={() => setIsModalOpen(false)}
              className="w-full ml-2"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Login;
