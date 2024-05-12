import axios from "axios";
import { DevTool } from "@hookform/devtools";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function SignIn() {
    // See the playlist on react-hook-form (https://www.youtube.com/playlist?list=PLC3y8-rFHvwjmgBr1327BA5bVXoQH-w5s)
    const form = useForm();
    const { register, control, handleSubmit, formState, watch } = form;
    const { errors } = formState;

    // Development
    const onSubmit = async (data) => {
        console.log(data);
        fetch("/api/sign-in", {
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
                <div>
                    <label htmlFor="email" className="block text-sm leading-6 text-gray-100">Email</label>
                    <input autoComplete="email" required id="email" {...register("email", {
                        required: "Email is required",
                        maxLength: {
                            value: 30,
                            message: "Email cannot be longer than twenty (30) characters long!"
                        },
                    })}
                        className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6" />
                </div>
                <span className="text-sm font-bold text-red-400">
                    <p>{errors.email?.message}</p>
                </span>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-100 sm:min-w-80">Password</label>
                    <input type="password" id="password" autoComplete="current-password" required 
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least eight (8) characters long"
                            },
                        })} 
                        className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"/>
                    <span className="text-sm font-bold text-red-400">
                        <p>{errors.password?.message}</p>
                    </span>
                </div>
                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600">Sign Up</button>
                </div>
            </form>
            {/* Development: */}
            <DevTool control={control}/> 
            <p className="mt-10 text-center text-sm text-gray-100"> Not a member? <Link to="/users/sign-up" className="font-semibold leading-6 text-yellow-600 hover:text-yellow-500">Sign Up</Link></p>
        </>
    )
}