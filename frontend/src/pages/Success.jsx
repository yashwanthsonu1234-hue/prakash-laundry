export default function Success() {
  return (
    <div className="min-h-screen bg-blue-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">
        Order Placed Successfully 🎉
      </h1>

      <p className="text-xl">
        We will pick up your clothes at the scheduled time.
      </p>
      <a
  href="/orders"
  className="bg-red-500 hover:bg-white-600 px-6 py-3 rounded-xl"
>
  View Orders
</a>
    </div>
  );
}
