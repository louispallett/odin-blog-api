import { useEffect, useState } from "react";
import { BoxContainer } from "./tailwind-containers";

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
            const response = await fetch("/api/about");
            const data = await response.json();
            setData(data);
        }

        apiCall();
    }, []);

    
    return (
        <>
            <BoxContainer>
                <h1 >Just the ramblings of a Bristol-based developer</h1>
            </BoxContainer>
        </>
    )
}