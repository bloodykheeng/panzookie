import Link from "next/link";

export default function SuccessPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-[#0d1117] transition-colors">

            <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                Payment Successful! 🎉
            </h1>

            <p className="mb-6 text-gray-500 dark:text-gray-400">
                Thanks for booking. We'll be in touch shortly to confirm your appointment.
            </p>

            <Link
                href="/"
                className="px-6 py-3 font-bold rounded-xl cursor-pointer bg-amber-400 hover:bg-amber-300 text-black transition-colors"
            >
                Back to Home
            </Link>
        </div>
    );
}