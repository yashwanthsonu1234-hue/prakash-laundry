export default function FAQ() {
  return (
    <div className="min-h-screen bg-blue-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-8">
        Frequently Asked Questions
      </h1>

      <div className="space-y-6">

        <div className="bg-white/10 p-5 rounded-xl">
          <h2 className="font-bold text-xl">
            How long does delivery take?
          </h2>

          <p>
            Usually 24–48 hours.
          </p>
        </div>

        <div className="bg-white/10 p-5 rounded-xl">
          <h2 className="font-bold text-xl">
            Do you provide pickup?
          </h2>

          <p>
            Yes, we provide doorstep pickup.
          </p>
        </div>

        <div className="bg-white/10 p-5 rounded-xl">
          <h2 className="font-bold text-xl">
            Do you provide dry cleaning?
          </h2>

          <p>
            Yes, dry cleaning services are available.
          </p>
        </div>

      </div>
    </div>
  );
}