
import { useState } from "react";

function Login({ setIsLoggedIn }) {
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const url = isRegister
        ? "http://localhost:5000/api/auth/register"
        : "http://localhost:5000/api/auth/login";

      const body = isRegister
        ? {
            name,
            email,
            password,
          }
        : {
            email,
            password,
          };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      // Register successful
      if (isRegister) {
        alert("Registration successful. Please login.");

        setIsRegister(false);
        setName("");
        setEmail("");
        setPassword("");

        return;
      }

      // Login successful
      localStorage.setItem("token", data.token);

      setIsLoggedIn(true);

      alert("Login successful");
    } catch (error) {
      console.log("Authentication error:", error);
      alert("Unable to connect to server");
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 px-4 py-10">
      <div className="mx-auto mt-10 max-w-md rounded-2xl bg-white p-6 shadow-lg">

        <h2 className="mb-2 text-center text-3xl font-bold text-gray-800">
          {isRegister ? "Create Account" : "Login"}
        </h2>

        <p className="mb-6 text-center text-gray-500">
          {isRegister
            ? "Create an account to manage your tasks"
            : "Login to manage your tasks"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {isRegister && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            {isRegister ? "Register" : "Login"}
          </button>

        </form>

        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setName("");
              setEmail("");
              setPassword("");
            }}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;
