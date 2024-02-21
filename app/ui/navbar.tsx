import Link from "next/link";

export default function Navbar() {
    return (
        <header>
            <Link href='/'>
                <h1>Chatbot App</h1>
            </Link>

            <div>
                <p> Usuario</p>
                <button>
                    Profile
                </button>
            </div>
        </header >
    )
}
