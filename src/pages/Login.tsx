import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const confirmInput = ["", "", "", "", "", ""];
  // const isTOTPFilled = !confirmInput.includes("");
  const [isTOTPSent, setIsTOTPSent] = useState(false);
  const [isTOTPConfirmed, setIsTOTPConfirmed] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");

  const confirmTOTP = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(confirmInput.join(""));
    setIsTOTPConfirmed(true);
    // navigate("/");
  };

  const sendTOTP = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsTOTPSent(true);
  };

  const submitUsername = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="flex flex-col bg-gray-50 h-screen w-full items-center justify-center">
      <h1 className="text-5xl absolute top-1/4 font-light">Live App</h1>
      {!isTOTPSent && (
        <form onSubmit={sendTOTP} className="flex flex-col gap-1">
          <label htmlFor="phone-number">Enter your number</label>
          <input
            id="phone-number"
            placeholder="000-000-0000"
            value={phoneNumber}
            onChange={(event) => {
              const value = event.target.value;
              setPhoneNumber((prev) =>
                prev.length === 2 || prev.length === 6 ? value + "-" : value
              );
            }}
            className="text-center text-2xl font-light w-full max-w-lg h-12 rounded-xl border border-gray-300 bg-white shadow-md"
            type="text"
          />
          <button
            disabled={phoneNumber.length < 12}
            className="w-full mt-5 text-blue-800 shadow-md bg-blue-200 px-5 py-3 rounded-xl disabled:bg-transparent disabled:shadow-none disabled:border disabled:border-gray-300 disabled:text-gray-500"
          >
            {"Confirm ->"}
          </button>
        </form>
      )}
      {isTOTPSent && !isTOTPConfirmed && (
        <form
          onSubmit={confirmTOTP}
          className="flex flex-col items-center gap-4"
        >
          <h3 className="text-sm">Text has been sent! Confirm the code</h3>
          <div className="flex gap-1">
            {confirmInput.map((value, i) => (
              <input
                key={i}
                autoFocus={i === 0}
                placeholder="0"
                value={value}
                onChange={(event) => (confirmInput[i] = event.target.value)}
                className="text-center text-2xl font-light w-10 h-12 rounded-xl border border-gray-300 bg-white shadow-md"
                type="text"
              />
            ))}
          </div>
          <button
            // disabled={!isTOTPFilled}
            className="w-fit text-blue-800 shadow-md bg-blue-200 px-5 py-3 rounded-xl disabled:bg-transparent disabled:shadow-none disabled:border disabled:border-gray-300 disabled:text-gray-500"
          >
            {"Confirm ->"}
          </button>
        </form>
      )}
      {isTOTPConfirmed && (
        <form onSubmit={submitUsername} className="flex flex-col gap-1">
          <label htmlFor="name">Enter a username</label>
          <input
            id="name"
            autoFocus
            placeholder="..."
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="text-center text-2xl font-light w-full max-w-lg h-12 rounded-xl border border-gray-300 bg-white shadow-md"
            type="text"
          />
          <label htmlFor="name">Choose a color</label>
          <div className="flex gap-2">
            <div className="flex justify-center items-center rounded-full h-10 w-10 bg-red-200 border border-red-300 text-red-500">
              {username
                ? username
                    .substring(0, username.length > 1 ? 2 : 1)
                    .toUpperCase()
                : ""}
            </div>
            <div className="flex justify-center items-center rounded-full h-10 w-10 bg-orange-200 border border-orange-300 text-orange-500">
              {username
                ? username
                    .substring(0, username.length > 1 ? 2 : 1)
                    .toUpperCase()
                : ""}
            </div>
            <div className="flex justify-center items-center rounded-full h-10 w-10 bg-yellow-200 border border-yellow-300 text-yellow-500">
              {username
                ? username
                    .substring(0, username.length > 1 ? 2 : 1)
                    .toUpperCase()
                : ""}
            </div>
            <div className="flex justify-center items-center rounded-full h-10 w-10 bg-green-200 border border-green-300 text-green-500">
              {username
                ? username
                    .substring(0, username.length > 1 ? 2 : 1)
                    .toUpperCase()
                : ""}
            </div>
            <div className="flex justify-center items-center rounded-full h-10 w-10 bg-blue-200 border border-blue-300 text-blue-500">
              {username
                ? username
                    .substring(0, username.length > 1 ? 2 : 1)
                    .toUpperCase()
                : ""}
            </div>
            <div className="flex justify-center items-center rounded-full h-10 w-10 bg-purple-200 border border-purple-300 text-purple-500">
              {username
                ? username
                    .substring(0, username.length > 1 ? 2 : 1)
                    .toUpperCase()
                : ""}
            </div>
            <div className="flex justify-center items-center rounded-full h-10 w-10 bg-pink-200 border border-pink-300 text-pink-500">
              {username
                ? username
                    .substring(0, username.length > 1 ? 2 : 1)
                    .toUpperCase()
                : ""}
            </div>
          </div>
          <button
            disabled={phoneNumber.length < 12}
            className="w-full mt-5 text-blue-800 shadow-md bg-blue-200 px-5 py-3 rounded-xl disabled:bg-transparent disabled:shadow-none disabled:border disabled:border-gray-300 disabled:text-gray-500"
          >
            {"Confirm ->"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
