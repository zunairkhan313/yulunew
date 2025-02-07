import RegisterForm from "../components/RegisterForm";

export const metadata = {
  title: "Register",
};

export default async function Register() {


  return (
    <>
      <style>{`
                body {
                    background-color: white;
                }
            `}</style>
      <div className="bg-white">

        <RegisterForm />
      </div>
    </>
  )
}