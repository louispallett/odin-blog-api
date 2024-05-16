import axios from "axios";
import { DevTool } from "@hookform/devtools";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function SignUp() {
    // FIXME: Client side validation error: confpassword to checking status on keyup means message can appear even when passwords match
    // FIXME: Data doesn't submit properly - it doesn't submit proper JSON so the backend doesn't recognise it.
    // TODO: Redirect the user to the login page. We can possibly do this using useNavigate() - see https://www.makeuseof.com/redirect-user-after-login-react/

    // See the playlist on react-hook-form (https://www.youtube.com/playlist?list=PLC3y8-rFHvwjmgBr1327BA5bVXoQH-w5s)
    const form = useForm();
    const { register, control, handleSubmit, formState, watch } = form;
    const { errors } = formState;

    // Development
    const onSubmit = async (data) => {
        /* FIXME: The error that's occuring here seems to be something to do with how we are submitting our data. If we run:
            console.log(data)
        The following is returned:
            {
                "username": "test2",
                "email": "test2@test2.com",
                "password": "Hello123!",
                "confPassword": "Hello123!"
            }
        As far as I am aware, this is valid JSON, so why is an error still being thrown? Unless our backend isn't picking it up 
        correctly.*/
        fetch("/api/sign-up", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: data
        }).then(() => {
            console.log("Successfully Submitted")
        }). catch((err) => console.log(err));
        try {
            await axios.post("/users/sign-up", data, { "cors": true })
                .then(() => console.log("Successfully submitted"))

        } catch(err) {
            console.log(err);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="flex items-center justify-between gap-5">
                    <div>
                        <label htmlFor="username" className="block text-sm leading-6 text-gray-100">Username</label>
                        <input autoComplete="username" required id="username" {...register("username", {
                            required: "Username is required",
                            maxLength: {
                                value: 20,
                                message: "Username cannot be longer than twenty (20) characters long!"
                            },
                        })}
                            className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm leading-6 text-gray-100">Email</label>
                        <input autoComplete="email" required id="email" {...register("email", {
                            required: "Email is required",
                            maxLength: {
                                value: 50,
                                message: "Email cannot be longer than twenty (50) characters long!"
                            },
                        })}
                            className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <span className="block flex justify-between text-red-400 !mt-0">
                    <span className="text-sm font-bold">
                            <p>{errors.username?.message}</p>
                    </span>
                    <span className="text-sm font-bold">
                            <p>{errors.email?.message}</p>
                    </span>
                </span>
                <div>
                    <div className="flex items-center justify-between gap-5">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-100">Password</label>
                            <input type="password" id="password" autoComplete="current-password" required 
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least eight (8) characters long"
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: "Must contain: uppercase, lowercase, number, and special character"
                                },
                                validate: {
                                    passwordMatch: (fieldValue) => {
                                        return (
                                            fieldValue == watch("confPassword") || "Passwords do not match"
                                        )
                                    }
                                }
                            })} 
                                className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"/>
                        </div>
                        <div>
                            <label htmlFor="confPassword" className="block text-sm font-medium leading-6 text-gray-100">Confirm Password</label>
                            <input type="password" id="confPassword" required {...register("confPassword", {
                                required: "Please confirm your password"
                            })}
                                className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <span className="text-sm font-bold text-red-400">
                        <p>{errors.password?.message}</p>
                        <p>{errors.confPassword?.message}</p>
                    </span>
                </div>
                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600">Sign Up</button>
                </div>
            </form>
            {/* Development: */}
            <DevTool control={control}/> 
            <p className="mt-10 text-center text-sm text-gray-100"> Already a member? <Link to="/users/sign-in" className="font-semibold leading-6 text-yellow-600 hover:text-yellow-500">Login</Link></p>
        </>
    )
}