export default function Register() {
  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center px-6">

      <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl w-full max-w-md shadow-xl">

        <h2 className="text-white text-4xl font-bold text-center mb-8">
          Register
        </h2>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-5 py-4 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none"
          />

          <input
            type="text"
            placeholder="Mobile Number"
            className="w-full px-5 py-4 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-5 py-4 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-4 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none"
          />

          <button className="w-full bg-blue-500 hover:bg-blue-600 py-4 rounded-xl text-white font-semibold transition">
            Create Account
          </button>

        </div>

      </div>

    </div>
  );
}