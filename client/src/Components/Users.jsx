import { Outlet } from "react-router-dom"
import { BackgroundContainerCentre, UsersContainer } from "./tailwind-containers"


export default function Users() {
    return (
        <BackgroundContainerCentre>
            <UsersContainer>
                <div className="flex min-h-full flex-col text-white px-6 py-12 lg:px-8 max-sm:px-0">
                    <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                        <div className="">
                            <h1 className="text-3xl font-bold tracking-tight text-nowrap max-sm:text-wrap m-0">The</h1>
                            <h1 className="text-3xl font-bold tracking-tight text-nowrap max-sm:text-wrap m-0">Guardian</h1>
                        </div>
                        <h2 className="text-center text-base leading-9 tracking-tight">News you can trust</h2>
                    </div>
                    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-lg">
                        <Outlet />
                    </div>
                </div>
            </UsersContainer>
        </BackgroundContainerCentre>
    )
}