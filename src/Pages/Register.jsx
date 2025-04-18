import { Link, useNavigate } from "react-router-dom";
import PulseLoader from 'react-spinners/PulseLoader'
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from "../features/userSlice";

export default function Registration() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { status, error } = useSelector((state) => state.user);

    // Environment variables from your Vite `.env`
    const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
    const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;


    const registrationNow = async (e) => {
        e.preventDefault()

        // Get the image file from the form
        const imageFile = e.target.image.files[0];

        const data = {
            name: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            status: e.target.status.value,
            image: ''
        }


        // Step 1: Upload the image to Cloudinary if an image is selected
        if (imageFile) {
            const formData = new FormData();
            formData.append('file', imageFile);
            formData.append('upload_preset', UPLOAD_PRESET); // Use the upload preset from env

            try {
                const response = await fetch(CLOUDINARY_UPLOAD_URL, {
                    method: 'POST',
                    body: formData,
                });

                const imageData = await response.json();
                // console.log(imageData, "here i the cloudnary image data");
                if (imageData.secure_url) {
                    // Update the data object with the Cloudinary image URL
                    data.image = imageData.secure_url;
                }
            } catch (error) {
                console.error('Image upload failed:', error);
                return; // Optionally handle the error gracefully here
            }
        }
        // Step 2: Dispatch the registerUser action with the updated data object
        const res = await dispatch(registerUser({ ...data }));

        if (res?.payload?.user) {
            navigate('/');
        }
    }


    // for upload image if registration is successfull
    /*
    // Step 1: Dispatch the registerUser action with user data
        const res = await dispatch(registerUser({ ...data }));

        // Step 2: If registration fails, don't upload the image
        if (!res?.payload?.user) {
            console.error('User registration failed');
            return; // Stop execution if user registration fails
        }

        // Step 3: Upload the image to Cloudinary if registration succeeded
        if (imageFile) {
            const formData = new FormData();
            formData.append('file', imageFile);
            formData.append('upload_preset', UPLOAD_PRESET); // Use the upload preset from env

            try {
                const response = await fetch(CLOUDINARY_UPLOAD_URL, {
                    method: 'POST',
                    body: formData,
                });

                const imageData = await response.json();
                if (imageData.secure_url) {
                    // Update the data object with the Cloudinary image URL
                    data.image = imageData.secure_url;

                    // Step 4: Update user with the image URL in the database (optional)
                    // You might want to update the user in your store with the image URL here
                    // For example, you could dispatch an update action to save the image URL to the user state
                    await dispatch(registerUser({ ...data }));
                }
            } catch (error) {
                console.error('Image upload failed:', error);
            }
        }

        // Step 5: Navigate to home page if registration is successful
        navigate('/');
    */

    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-[#111B21]">
            <div className="group mx-auto flex w-full max-w-3xl border border-blue-400 bg-white text-blue-400 shadow-lg dark:bg-zinc-900">
                <div className="relative hidden min-h-[110%] w-1/3 overflow-hidden bg-blue-400 sm:block">
                    <h1 className="absolute bottom-3 right-3 text-right text-2xl font-semibold text-white">
                        Hey! <br /> Welcome to
                        <br /> Bok Bok
                    </h1>
                    <span className="absolute -left-8 -top-8 z-20 h-32 w-32 rounded-full bg-blue-800/20 duration-500 group-hover:h-56 group-hover:w-56"></span>
                    <span className="absolute -left-5 -top-5 z-10 h-36 w-36 rounded-full bg-blue-800/50"></span>
                </div>
                <div className="w-full max-w-lg rounded bg-white p-5 sm:p-8 drop-shadow-lg dark:bg-zinc-900">
                    <form className="space-y-3" onSubmit={registrationNow}>
                        <h1 className="text-3xl font-semibold tracking-tight">Sign In</h1>
                        <div className="space-y-2">
                            <label htmlFor="nui_email" className="block">
                                Username
                            </label>
                            <div className="relative">
                                <input
                                    id="nui_email"
                                    type="test"
                                    name="username"
                                    required
                                    placeholder="Username"
                                    className="h-10 w-full rounded bg-transparent pl-10 outline-none ring-1 ring-zinc-400 dark:ring-gray-500"
                                />
                                <span className="absolute left-2 top-2">
                                    <svg viewBox="0 0 24 24" fill="none" className="inline-block w-6" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            className="fill-zinc-700 dark:fill-zinc-300"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V10ZM7.73867 16.4465C8.96118 15.5085 10.4591 15 12 15C13.5409 15 15.0388 15.5085 16.2613 16.4465C17.4838 17.3846 18.3627 18.6998 18.7615 20.1883C18.9044 20.7217 18.5878 21.2701 18.0544 21.413C17.5209 21.556 16.9726 21.2394 16.8296 20.7059C16.5448 19.6427 15.917 18.7033 15.0438 18.0332C14.1706 17.3632 13.1007 17 12 17C10.8993 17 9.82942 17.3632 8.95619 18.0332C8.08297 18.7033 7.45525 19.6427 7.17037 20.7059C7.02743 21.2394 6.47909 21.556 5.94563 21.413C5.41216 21.2701 5.09558 20.7217 5.23852 20.1883C5.63734 18.6998 6.51616 17.3846 7.73867 16.4465ZM10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9ZM12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5Z"
                                        ></path>
                                        <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" stroke="#000000"></rect>
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="nui_email" className="block">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    id="nui_email"
                                    type="email"
                                    required
                                    name="email"
                                    placeholder="Email"
                                    className="h-10 w-full rounded bg-transparent pl-10 outline-none ring-1 ring-zinc-400 dark:ring-gray-500"
                                />
                                <span className="absolute left-2 top-2">
                                    <svg viewBox="0 0 24 24" fill="none" className="inline-block w-6" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            className="fill-zinc-700 dark:fill-zinc-300"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V10ZM7.73867 16.4465C8.96118 15.5085 10.4591 15 12 15C13.5409 15 15.0388 15.5085 16.2613 16.4465C17.4838 17.3846 18.3627 18.6998 18.7615 20.1883C18.9044 20.7217 18.5878 21.2701 18.0544 21.413C17.5209 21.556 16.9726 21.2394 16.8296 20.7059C16.5448 19.6427 15.917 18.7033 15.0438 18.0332C14.1706 17.3632 13.1007 17 12 17C10.8993 17 9.82942 17.3632 8.95619 18.0332C8.08297 18.7033 7.45525 19.6427 7.17037 20.7059C7.02743 21.2394 6.47909 21.556 5.94563 21.413C5.41216 21.2701 5.09558 20.7217 5.23852 20.1883C5.63734 18.6998 6.51616 17.3846 7.73867 16.4465ZM10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9ZM12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5Z"
                                        ></path>
                                        <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" stroke="#000000"></rect>
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className="flex  justify-between items-center gap-4">
                            <div className="space-y-2">
                                <label htmlFor="pass" className="block">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="pass"
                                        className="h-10 w-full rounded bg-transparent pl-10 outline-none ring-1 ring-zinc-400 dark:ring-gray-500"
                                        placeholder="*************"
                                        name="password"
                                        type="password"
                                        required
                                    />
                                    <span className="absolute left-2 top-2">
                                        <svg viewBox="0 0 24 24" fill="none" className="inline-block w-6" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                className="fill-zinc-700 dark:fill-zinc-300"
                                                d="M20.9098 11.1203V6.73031C20.9098 5.91031 20.2898 4.98031 19.5198 4.67031L13.9498 2.39031C12.6998 1.88031 11.2898 1.88031 10.0398 2.39031L4.46984 4.67031C3.70984 4.98031 3.08984 5.91031 3.08984 6.73031V11.1203C3.08984 16.0103 6.63984 20.5903 11.4898 21.9303C11.8198 22.0203 12.1798 22.0203 12.5098 21.9303C17.3598 20.5903 20.9098 16.0103 20.9098 11.1203ZM12.7498 12.8703V15.5003C12.7498 15.9103 12.4098 16.2503 11.9998 16.2503C11.5898 16.2503 11.2498 15.9103 11.2498 15.5003V12.8703C10.2398 12.5503 9.49984 11.6103 9.49984 10.5003C9.49984 9.12031 10.6198 8.00031 11.9998 8.00031C13.3798 8.00031 14.4998 9.12031 14.4998 10.5003C14.4998 11.6203 13.7598 12.5503 12.7498 12.8703Z"
                                            ></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="pass" className="block">
                                    Staus
                                </label>
                                <div className="relative">
                                    <input
                                        id="pass"
                                        className="h-10 w-full rounded bg-transparent pl-10 outline-none ring-1 ring-zinc-400 dark:ring-gray-500"
                                        placeholder="happy or sad or bussy"
                                        name="status"
                                        type="text"
                                    />
                                    <span className="absolute left-2 top-2">
                                        <svg viewBox="0 0 24 24" fill="none" className="inline-block w-6" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                className="fill-zinc-700 dark:fill-zinc-300"
                                                d="M20.9098 11.1203V6.73031C20.9098 5.91031 20.2898 4.98031 19.5198 4.67031L13.9498 2.39031C12.6998 1.88031 11.2898 1.88031 10.0398 2.39031L4.46984 4.67031C3.70984 4.98031 3.08984 5.91031 3.08984 6.73031V11.1203C3.08984 16.0103 6.63984 20.5903 11.4898 21.9303C11.8198 22.0203 12.1798 22.0203 12.5098 21.9303C17.3598 20.5903 20.9098 16.0103 20.9098 11.1203ZM12.7498 12.8703V15.5003C12.7498 15.9103 12.4098 16.2503 11.9998 16.2503C11.5898 16.2503 11.2498 15.9103 11.2498 15.5003V12.8703C10.2398 12.5503 9.49984 11.6103 9.49984 10.5003C9.49984 9.12031 10.6198 8.00031 11.9998 8.00031C13.3798 8.00031 14.4998 9.12031 14.4998 10.5003C14.4998 11.6203 13.7598 12.5503 12.7498 12.8703Z"
                                            ></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="pass" className="block">
                                Profile Image
                            </label>
                            <div className="relative w-full h-10 flex justify-start items-center">
                                <input
                                    id="pass"
                                    className="w-full rounded bg-transparent  outline-none ring-1 ring-zinc-400 dark:ring-gray-500 border-none"
                                    // placeholder="Select profile image"
                                    name="image"
                                    type="file"
                                />
                                {/* <span className="absolute left-2 top-2">
                                    <svg viewBox="0 0 24 24" fill="none" className="inline-block w-6" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            className="fill-zinc-700 dark:fill-zinc-300"
                                            d="M20.9098 11.1203V6.73031C20.9098 5.91031 20.2898 4.98031 19.5198 4.67031L13.9498 2.39031C12.6998 1.88031 11.2898 1.88031 10.0398 2.39031L4.46984 4.67031C3.70984 4.98031 3.08984 5.91031 3.08984 6.73031V11.1203C3.08984 16.0103 6.63984 20.5903 11.4898 21.9303C11.8198 22.0203 12.1798 22.0203 12.5098 21.9303C17.3598 20.5903 20.9098 16.0103 20.9098 11.1203ZM12.7498 12.8703V15.5003C12.7498 15.9103 12.4098 16.2503 11.9998 16.2503C11.5898 16.2503 11.2498 15.9103 11.2498 15.5003V12.8703C10.2398 12.5503 9.49984 11.6103 9.49984 10.5003C9.49984 9.12031 10.6198 8.00031 11.9998 8.00031C13.3798 8.00031 14.4998 9.12031 14.4998 10.5003C14.4998 11.6203 13.7598 12.5503 12.7498 12.8703Z"
                                        ></path>
                                    </svg>
                                </span> */}
                            </div>
                            <h1 className="text-sm">Already have an account? <Link to="/login" className="underline">Login Now</Link></h1>
                        </div>
                        {/* if we have an error */}
                        {
                            error ? (
                                <div>
                                    <p className="text-red-400">{error}</p>
                                </div>
                            ) : null
                        }
                        <button type="submit" className="rounded px-5 py-2 ring-1 ring-zinc-400 hover:bg-zinc-400/20 dark:ring-zinc-500">
                            {status == "loading" ? <PulseLoader color="#fff" size={10} /> : "Sign Up"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
