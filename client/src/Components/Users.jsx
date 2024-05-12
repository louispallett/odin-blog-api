import { Link, Outlet } from "react-router-dom"
import { BackgroundContainerCentre, UsersContainer } from "./tailwind-containers"


export default function Users() {
    return (
        <BackgroundContainerCentre>
            <UsersContainer>
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 max-sm:px-0">
                    <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                        <div className="flex flex-col items-center">
                            <Link to="/dashboard/articles/" >
                                <h1 className="relative font-jaro inset-y-4 inset-x-6 text-5xl sm:inset-x-5 font-black text-white">The</h1>
                                <h1 className="text-5xl font-jaro font-black text-white">Guardian</h1>
                            </Link>
                        </div>
                        <h2 className="text-center text-gray-100 font-bold leading-9 tracking-tight">News you can trust</h2>
                    </div>
                    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-lg">
                        <Outlet />
                    </div>
                </div>
            </UsersContainer>
        </BackgroundContainerCentre>
    )
}