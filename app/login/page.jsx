import LoginForm from "../components/LoginForm";


export const metadata = {
    title: "Login",
};

export default function Login() {


    return (
        <>
            <style>{`
                body {
                    background-color: white;
                }
            `}</style>
            <div className="bg-white">

                <LoginForm />

            </div>
        </>
    )
}