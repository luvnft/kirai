
/////////////////////////// Email Verification...........///////////////////////////////
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import { useState } from "react";
import axios from "axios";
import Toast from "@/components/Toast";

const checkEmailExistence = async (email) => {
    const apiUrl = `https://api.zerobounce.net/v2/validate?api_key=0aced1a69c004370a71500f384d5d73b&email=${email}&ip_address=`;

    try {
        const response = await axios.get(apiUrl);
        //   console.log(response)

        // console.log(response.data.status)
        // Check if email exists based on ZeroBounce API response
        return response.data.status === "valid";
    } catch (error) {
        // console.log("Error checking email existence:", error);
        return false;
    }
};
const SignUp = () => {

    const [showPass, setshowPass] = useState(false);
    const [showPassword, setshowPassword] = useState("password");
    const [isChecked2, setIsChecked2] = useState(false);

    const [registerEmail, setregisterEmail] = useState("");
    const [registerName, setregisterName] = useState("");
    const [registerPassword, setregisterPassword] = useState("");
    const [registercnfrmPassword, setregistercnfrmPassword] = useState("");



    // Register User with Email And Password.............

    const auth = getAuth();

    const Register = async () => {
        const emailExists = await checkEmailExistence(registerEmail);
        // console.log(emailExists)

        if (
            registerEmail === "" ||
            registerPassword === "" ||
            registercnfrmPassword === "" ||
            registerName === ""
        ) {
            toast.error('Please Fill the Form Properly!! ', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        } else if (!emailExists) {
            toast.error("Email doesn't exist!!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        else if (registerPassword !== registercnfrmPassword) {
            {
                toast.error("Password didn't matched!! ", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } else if (isChecked2 === false) {
            {
                toast.error('Please accept terms and conditons!! ', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } else {
            try {
                const user = await createUserWithEmailAndPassword(
                    auth,
                    registerEmail,
                    registerPassword
                );
                {
                    toast.success('Registered Successfully and Email verification Sent!! ', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
                sendEmailVerification(auth.currentUser).then(() => {
                    // console.log("Email Sent");
                });
                updateProfile(auth.currentUser, {
                    displayName: registerName,
                })
                    .then(() => {
                        console.log("Profile Updated");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                // console.log(user);
            } catch (e) {
                // console.log(e);
                alert(e);
            }
        }
    };

    const handleCheckboxChange2 = () => {
        setIsChecked2(!isChecked2);
    };


    const handleShowPassword = () => {
        setshowPass(!showPass);
        showPassword === "password"
            ? setshowPassword("text")
            : setshowPassword("password");
    };

    const handlecnfrmPassword = (e) => {
        setregistercnfrmPassword(e.target.value);
    };


    return (
        <>
            <Toast/>

                <div className="flex flex-wrap w-full px-[10%] gap-[2vh] justify-center">
                    <input
                        type="text"
                        className="bg-black/20 text-gray-200 border-0 p-2  focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
                        placeholder="Full Name" onChange={(e) => {
                            setregisterName(e.target.value);
                        }} />
                    <input
                        type="email"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2  focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
                        placeholder="Email" onChange={(e) => {
                            setregisterEmail(e.target.value);
                        }} />
                    <input
                        type="password"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2  focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
                        placeholder="Password" onChange={(e) => {
                            setregisterPassword(e.target.value);
                        }} />
                    <input
                        type="password"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2  focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
                        placeholder="Confirm Password" onChange={(e) => {
                            handlecnfrmPassword(e);
                        }} />

                    <input
                        type="number"
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2  focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
                        placeholder="Enter Mobile" />

                    <button type="submit"
                        class="w-full mx-[15vw] bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150" onClick={Register}>Register</button>
                    {/* <button type="submit"
                class="w-full mx-[20vw] bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150" onClick={signInwithgoogle}>SignInWithGoogle</button> */}
                </div>
        </>
    )
}

export default SignUp