import { useEffect, useState } from "react";
import { BoxContainer } from "./tailwind-containers";

import { Spinner } from "./tailwind-ex-elements";

export default function About() {
    /* Here we can write up a few things:
        Number of articles published
        Number of authors
        Number of comments
        Number of likes

        We can then also give static information, like who we are and what we like to write about.
        And also where we are based etc.
    */

    const [siteData, setSiteData] = useState(null);

    useEffect(() => {
        const apiCall = async () => {
            const response = await fetch("/api/about/");
            const siteData = await response.json();
            setSiteData(siteData);
        }
        apiCall();
    }, []);

    
    return (
        <>
            <BoxContainer>
                <h1 className="font-jaro text-center my-5 sm:text-3xl sm:mb-15 dark:text-white">Just the ramblings of a Bristol-based developer</h1>
                { siteData ? (
                    <ul className="flex justify-center items-center gap-7 text-yellow-500">
                        <li className="px-2.5 py-1.5 bg-blue-900 font-bold rounded-lg">Users: {siteData.users}</li>
                        <li className="px-2.5 py-1.5 bg-blue-900 font-bold rounded-lg" >Articles: {siteData.articles}</li>
                        <li className="px-2.5 py-1.5 bg-blue-900 font-bold rounded-lg">Comments: {siteData.comments}</li>
                    </ul>
                ) : (
                        <Spinner id="spinner"/>
                )}
                <div>
                    
                </div>
            </BoxContainer>
        </>
    )
}