import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Validation Schema
const schema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted", data);
  };

  return (
    <div className="register-container">
      <h2>Create Your <span style={{ color: "#e94560" }}>Account</span></h2>
      <p>to get 1% smarter every single day</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input type="email" {...register("email")} placeholder="Email Id" />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input type="password" {...register("password")} placeholder="Password" />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <div>
          <label>Confirm Password:</label>
          <input type="password" {...register("confirmPassword")} placeholder="Confirm Password" />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit">Register</button>
      </form>

      <div className="divider"></div>

      <div className="social-login">
        <div className="social-button">
          <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="Google" />
          Sign in with Google
        </div>
        <div className="social-button">
          <img src="https://cdn-icons-png.flaticon.com/512/831/831276.png" alt="Apple" />
          Sign in with Apple
        </div>
        <div className="social-button">
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111589.png" alt="Reddit" />
          Sign in with Reddit
        </div>
      </div>

      <div className="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Already have an account?</a>
        <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
};

export default Register;
