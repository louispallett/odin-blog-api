import { useEffect, useState } from "react";
import { BoxContainer } from "./tailwind-containers";

import loadingIcon from "/assets/images/loading.svg";

export default function About() {
    /* Here we can write up a few things:
        Number of articles published
        Number of authors
        Number of comments
        Number of likes

        We can then also give static information, like who we are and what we like to write about.
        And also where we are based etc.
    */

    const [data, setData] = useState(null);

    useEffect(() => {
        const apiCall = async () => {
            const response = await fetch("/api/about/");
            const data = await response.json();
            setData(data);
        }
        apiCall();
    }, []);

    
    return (
        <>
            <BoxContainer>
                <h1 className="font-jaro text-center my-5 sm:text-3xl sm:mb-15 dark:text-white">Just the ramblings of a Bristol-based developer</h1>
                { data ? (
                    <ul className="flex justify-center items-center gap-7 text-yellow-500">
                        <li className="px-2.5 py-1.5 bg-blue-900 font-bold rounded-lg">Users: {data.users}</li>
                        <li className="px-2.5 py-1.5 bg-blue-900 font-bold rounded-lg" >Articles: {data.articles}</li>
                        <li className="px-2.5 py-1.5 bg-blue-900 font-bold rounded-lg">Comments: {data.comments}</li>
                    </ul>
                ) : (
                    <img src={loadingIcon} alt="" className="h-10 m-10" id="loading-icon"/>
                )}
                <div>
                    
                </div>
            </BoxContainer>
        </>
    )
}