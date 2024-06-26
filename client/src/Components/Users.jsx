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
                                <h1 id="subtitle" className="relative font-jaro inset-y-3 inset-x-16 text-2xl sm:inset-x-20 sm:text-4xl font-black text-white">Singapore</h1>
                                <h1 id="main-title" className="text-2xl font-jaro sm:text-4xl font-black text-white">on-Thames</h1>
                            </Link>
                        </div>
                        <h2 className="text-sm text-center text-gray-100 font-bold leading-9 tracking-tight">Bored beyond your years</h2>
                    </div>
                    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-lg">
                        <Outlet />
                    </div>
                </div>
            </UsersContainer>
        </BackgroundContainerCentre>
    )
}