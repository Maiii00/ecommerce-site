export default function Footer() {
    return (
        <footer className="text-center p-4 bg-gray-100 mt-8">
            <p>&copy; <span className="mr-2">{new Date().getFullYear()}</span>My Shop.</p>
        </footer>
    )
}