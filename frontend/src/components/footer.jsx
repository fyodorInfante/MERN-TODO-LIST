function Footer() {
    return(
        <>
       <footer className="bg-gray-800 text-white py-4 bottom-0 fixed w-full">
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
                <p>&copy; 2024 Todo List Mern. All rights reserved.</p>
                <nav className="space-x-4">
                    <a href="https://github.com/FyodorH" target="_blank" className="text-gray-300 hover:text-gray-100">Github</a>
                </nav>
            </div>
        </div>
    </footer>
        </>
    )
}

export default Footer;