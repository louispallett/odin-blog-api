import warning from "/assets/images/Warning-rafiki.svg"

export default function Error () {
    return (
        <div className="grid m-2.5 sm:m-5 justify-center">
            <div className="bg-blue-950 rounded-b-none rounded-lg">
                <h5 className="p-3 text-2xl font-sedan font-bold tracking-tight text-gray-100 sm:text-4xl sm:font-black sm:p-5">Server Error</h5>
            </div>
            <div className="flex flex-col min-w-full bg-white rounded-lg rounded-t-none shadow dark:bg-slate-700">
                <img src={warning} alt="" className="object-cover max-h-96 max-w-full" />
                <p className="px-2.5 py-3.5 sm:px-3 sm:py-4 dark:text-slate-100">
                    Sorry, an error occured with our server. Please try again later.
                </p>
            </div>
        </div>
    )
}