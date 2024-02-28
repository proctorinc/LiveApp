import { Chats, UserCircle } from "@phosphor-icons/react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const submitLoginAsGuest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="flex flex-col bg-gray-50 h-screen w-full items-center justify-center p-4">
      <div className="border border-gray-300 rounded-xl bg-white shadow-2xl overflow-clip w-full flex flex-col items-center max-w-sm p-4 pt-10 gap-10">
        <div className="flex gap-3 items-center text-5xl">
          <Chats size={50} />
          Live Chat
        </div>
        <form
          onSubmit={submitLoginAsGuest}
          className="flex flex-col gap-4 w-full"
        >
          <div className="flex items-center w-full border border-gray-300 rounded-xl overflow-clip">
            <div className="relative text-md flex items-center gap-1 w-full">
              <h3 className="absolute left-4">Name:</h3>
              <input
                type="text"
                placeholder="Your name"
                value={username}
                className="w-full pl-[70px] rounded-xl rounded-l-xl py-2 px-4 bg-gray-50"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex gap-1 items-center justify-center w-full rounded-xl p-2 border border-gray-300 bg-white disabled:bg-gray-200 disabled:text-gray-300 hover:bg-gray-100"
          >
            <UserCircle size={20} /> Login as Guest
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
