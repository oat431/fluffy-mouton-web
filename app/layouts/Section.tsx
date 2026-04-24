import Footer from "../components/Footer"
import NavBar from "../components/NavBar"

function Section({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
    return (
        <>
            <NavBar />
            <div className="hero bg-base-200 min-h-screen">
                <div className={wide ? "hero-content w-full max-w-none px-2 sm:px-4 lg:px-6" : "hero-content text-center"}>
                    <div className={wide ? "w-full max-w-none" : "max-w-md"}>
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Section