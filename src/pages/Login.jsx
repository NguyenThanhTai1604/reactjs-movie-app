import { auth, googleProvider, facebookProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const navigate = useNavigate();
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const loginWithGoogle = async () => {
        if (isLoggingIn) return;
        try {
            setIsLoggingIn(true);
            await signInWithPopup(auth, googleProvider);
            navigate('/');
        } catch (error) {
            console.error("Google login error:", error.code, error.message);
        } finally {
            setIsLoggingIn(false);
        }
    };

    const loginWithFacebook = async () => {
        if (isLoggingIn) return;
        try {
            setIsLoggingIn(true);
            await signInWithPopup(auth, facebookProvider);
            navigate('/');
        } catch (error) {
            console.error("Facebook login error:", error.code, error.message);
        } finally {
            setIsLoggingIn(false);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex flex-col items-center justify-center space-y-6 px-4">
            <h2 className="text-3xl font-extrabold tracking-wide">Chào mừng bạn!</h2>
            <p className="text-gray-400 text-sm">Vui lòng chọn phương thức đăng nhập:</p>

            <button
                onClick={loginWithGoogle}
                className="w-full max-w-xs flex items-center justify-center gap-3 bg-white text-black px-6 py-3 rounded-md shadow hover:scale-105 hover:shadow-lg transition transform duration-200"
            >
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                />
                <span className="font-semibold">Đăng nhập với Google</span>
            </button>

            <button
                onClick={loginWithFacebook}
                className="w-full max-w-xs flex items-center justify-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 hover:scale-105 transition transform duration-200"
            >
                <img
                    src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                    alt="Facebook"
                    className="w-5 h-5 bg-white rounded-full"
                />
                <span className="font-semibold">Đăng nhập với Facebook</span>
            </button>
        </div>
    )
}
