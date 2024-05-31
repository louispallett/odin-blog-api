import { useEffect, useState } from "react";
import { BoxContainer } from "./tailwind-containers";

import { Spinner } from "./tailwind-ex-elements";

export default function About() {
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
                <h1 className="font-jaro text-center my-5 px-2.5 text-2xl sm:text-3xl sm:mb-15 dark:text-white">Just the ramblings of a Bristol-based developer</h1>
                { siteData ? (
                    <ul className="flex list-none justify-center items-center gap-4 text-yellow-500 text-sm sm:text-md flex-col sm:flex-row">
                        <li className="px-2.5 py-1.5 bg-blue-900 font-bold rounded-lg">Users: {siteData.users}</li>
                        <li className="px-2.5 py-1.5 bg-blue-900 font-bold rounded-lg" >Articles: {siteData.articles}</li>
                        <li className="px-2.5 py-1.5 bg-blue-900 font-bold rounded-lg">Comments: {siteData.comments}</li>
                    </ul>
                ) : (
                    <Spinner id="spinner"/>
                )}
                <div className="flex flex-col p-2.5 sm:p-5 sm:min-w-minArticle sm:max-w-maxArticle">
                    <div className="flex flex-col min-w-full bg-white rounded-lg shadow dark:bg-slate-700">
                        <div className="px-2.5 py-3.5 sm:px-3 sm:py-4 dark:text-slate-100" id="articleBody">
                            <p>
                                Hi there! I'm an <i>aspiring</i> developer from Bristol and this is my 'blog' <i><b>Singapore on-Thames</b></i>. 
                                Created using frontend libraries such as React and a backend with NodeJS and the Express framework, this project has two frontends: the 'main' site, which 
                                is the one you are on and <i><b>Singapore on-Thames: Writers</b></i>, a front end for writers to sign up and write, update, and delete their own articles.
                            </p>
                            <p>
                                If you want to check out the source code, you can do so <a href="https://github.com/louispallett/odin-blog-api" className="font-bold text-yellow-500">here</a> on my Github repo.
                                 You'll find a list of all the technologies and libraries used - including the methods used for things like authorisation and authentication, handling forms, and file uploads (with 
                                 sites like <a href="https://cloudinary.com/" className="font-bold text-yellow-500">Cloudinary</a>).
                            </p>
                            <p>You'll also find instructions there on how to run it locally (although this does require setting up a MongoDB database and Cloudinary account etc.)</p>
                            <h2 className="text-lg font-bold sm:text-xl">Why 'Singapore on-Thames'?</h2>
                            <p>Just a silly joke really. On 12 November 2019, Martin Sorrell, then the CEO of S4Capital, argued that, if the UK were to come out of the European Union, he would like to see a <a href="https://www.youtube.com/watch?v=8vYy4qf5N9U&t=126s" className="font-bold text-yellow-500">'Singapore-on-Steriods'</a>.
                                The idea was a nation with low regulation, low taxes, small state. A libertarian utopia where, in <a href="https://youtu.be/v3Mo0yKCVww?si=GMuqmzykqWS13Uqx&t=196" className="font-bold text-yellow-500">the words</a> of journalist and former BBC political editor, Andrew Marr: 
                                 "a radically different future, of the markets roaring ahead in all direction..." and also where it would become the home of huge corporations such as Amazon and Google.
                            </p>
                            <p>It took a few years but, eventually, in September 2022, this ideology was put into practice. Liz Truss and Kwasi Kwarteng, her Chancellor of the Exchequer, announced huge tax cuts - particulary for top earners, abolishing the 45% tax rate (earnings over 150k).
                                However, instead of the great economic leap forward, the 'Singapore on-Thames' theory led to a £45bn hole in the economy, the Bank of England <a href="https://www.theguardian.com/business/2022/oct/20/the-mini-budget-that-broke-britain-and-liz-truss" className="font-bold text-yellow-500">stepping in
                                to buy £65bn of government bonds</a>, and the end of the shortest premiership in UK political history.
                            </p>
                            <p>So, just a silly joke - as long as you ignore the mortgage rates.</p>
                        </div>
                    </div>
                </div>
            </BoxContainer>
        </>
    )
}