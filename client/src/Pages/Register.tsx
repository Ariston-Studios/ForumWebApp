import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted", data);
  };

  return (
    <div className="register-container">
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input type="email" {...register("email")} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input type="password" {...register("password")} />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <div>
          <label>Confirm Password:</label>
          <input type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
