import imagePlaceholder from "/assets/images/image_placeholder.svg";

export default function WriteForUs() {
    return (
        <>
        <div className="flex flex-col p-2.5 sm:p-5 sm:max-w-5xl">
            <div className="bg-blue-950 rounded-b-none rounded-lg">
                <h5 className="p-3 text-2xl font-sedan font-bold tracking-tight text-gray-100 sm:text-4xl sm:font-black sm:p-5">Write for us</h5>
            </div>
            <div className="flex flex-col min-w-full bg-white rounded-lg rounded-t-none shadow dark:bg-slate-700">
                <img src={imagePlaceholder} alt="" className="object-contain max-h-60 max-w-full" />
                <hr className="mx-3.5 sm:mx-5" />
                <p className="self-start px-2.5 py-1 sm:px-3 sm:py-2 sm:pt-4 dark:text-slate-100">
                    Hi there! Thanks for your interest in writing for us. We're a Bristol based publishers posting opinion pieces covering all manner of things, but we primarily have a political angle.</p>
                <p className="self-start px-2.5 py-1 sm:px-3 sm:py-2 dark:text-slate-100">
                    However! Before you stop reading, remember that our definition of a 'political angle' is very loose. We have articles which do cover political and historic events, but we also have 
                     reviews of video games, films, and other media which have a loose focus on their political aspects. Politics is everywhere and related to everything - music, sports, gaming, nightlife... even food.
                </p>
                <p className="self-start px-2.5 py-1 sm:px-3 sm:py-2 dark:text-slate-100">
                    Still not convinced? Why not take a look at our articles and see the topics they cover. Yes, there are some purely political topics (and if you're interested in that, great!), but there
                     are also a few other topics you can look at too.
                </p>            
                <p className="self-start px-2.5 py-1 sm:px-3 sm:py-2 dark:text-slate-100">
                    Ready to write for us? Contact us and we can discuss what you'd like to write and then we can give you access to our writer portal.
                </p>
            </div>
        </div>        
        </>
    )
}