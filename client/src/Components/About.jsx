import { useEffect, useState } from "react";

import { Spinner, Anchor } from "./tailwind-ex-elements";
import tower from "/assets/images/tower.svg";

export default function About() {
    const [siteData, setSiteData] = useState(null);

    useEffect(() => {
        const apiCall = async () => {
            const response = await fetch("https://son-server.fly.dev/api/about/", { mode: "cors" });
            const siteData = await response.json();
            setSiteData(siteData);
        }
        apiCall();
    }, []);

    
    return (
        <>
            <div className="flex flex-col justify-center items-center bg-none px-0 pt-10 pb-8 sm:mx-auto sm:max-w-maxArticle sm:rounded-lg">
                <div className="flex flex-col p-2.5 sm:p-5 sm:min-w-minArticle sm:max-w-maxArticle">
                    <div className="flex flex-col min-w-full bg-white rounded-lg shadow dark:bg-slate-700">
                    <div className="bg-blue-950 rounded-b-none rounded-lg">
                        <h5 className="p-3 text-2xl font-sedan font-bold tracking-tight text-gray-100 sm:text-4xl sm:font-black sm:p-5">About</h5>
                    </div>
                        <div className="flex justify-center my-20 gap-20">
                            <div>
                                <h1 id="subtitle" className="relative font-jaro inset-y-2 inset-x-20 text-3xl sm:inset-x-24 sm:text-5xl font-black dark:text-white">Singapore</h1>
                                <h1 id="main-title" className="text-3xl font-jaro sm:text-5xl font-black dark:text-white">on-Thames</h1>
                            </div>
                        <img src={tower} alt="" className="max-h-20"/>
                        </div>
                        <h1 className="font-jaro text-center my-5 px-2.5 text-2xl sm:text-3xl sm:mb-15 dark:text-white">Just the ramblings of a Bristol-based developer</h1>
                        { siteData ? (
                            <ul className="flex list-none justify-center items-center gap-4 text-yellow-500 text-sm sm:text-md flex-col sm:flex-row">
                                <li className="px-2.5 py-1.5 bg-blue-900 font-bold rounded-lg">Users: {siteData.users}</li>
                                <li className="px-2.5 py-1.5 bg-blue-900 font-bold rounded-lg" >Articles: {siteData.articles}</li>
                                <li className="px-2.5 py-1.5 bg-blue-900 font-bold rounded-lg">Comments: {siteData.comments}</li>
                            </ul>
                        ) : (
                            <div className="flex justify-center items-center">
                                <Spinner id="spinner"/>
                            </div>
                        )}
                        <div className="px-2.5 py-3.5 sm:px-3 sm:py-4 dark:text-slate-100" id="articleBody">
                            <p>
                                Hi there! I'm an <i>aspiring</i> developer from Bristol and this is my 'blog' <i><b>Singapore on-Thames</b></i>. 
                                Created using frontend libraries such as React and a backend with NodeJS and the Express framework, this project has two frontends: the 'main' site, which 
                                is the one you are on and <i><b>Singapore on-Thames: Writers</b></i>, a front end for writers to sign up and write, update, and delete their own articles.
                            </p>
                            <p>
                                If you want to check out the source code, you can do so <Anchor href="https://github.com/louispallett/odin-blog-api">here</Anchor> on my GitHub repo.
                                 You'll find a list of all the technologies and libraries used - including the methods used for things like authorisation and authentication, handling forms, and file uploads (with 
                                 sites like <Anchor href="https://cloudinary.com/">Cloudinary</Anchor>).
                            </p>
                            <p>You'll also find instructions there on how to run it locally (although this does require setting up a MongoDB database and Cloudinary account etc.)</p>
                            <h2 className="text-lg font-bold sm:text-xl">Why 'Singapore on-Thames'?</h2>
                            <p>Just a silly joke really. On 12 November 2019, Martin Sorrell, then the CEO of S4Capital, argued that, if the UK were to come out of the European Union, he would like to see a <Anchor href="https://www.youtube.com/watch?v=8vYy4qf5N9U&t=126s">'Singapore-on-Steriods'</Anchor>.
                                The idea was a nation with low regulation, low taxes, small state. A libertarian utopia where, in <Anchor href="https://youtu.be/v3Mo0yKCVww?si=GMuqmzykqWS13Uqx&t=196">the words</Anchor> of journalist and former BBC political editor, Andrew Marr: 
                                 "a radically different future, of the markets roaring ahead in all direction..." and also where it would become the home of huge corporations such as Amazon and Google.
                            </p>
                            <p>It took a few years but, eventually, in September 2022, this ideology was put into practice. Liz Truss and Kwasi Kwarteng, her Chancellor of the Exchequer, announced huge tax cuts - particulary for top earners, abolishing the 45% tax rate (earnings over 150k).
                                However, instead of the great economic leap forward, the 'Singapore on-Thames' theory led to a £45bn hole in the economy, the Bank of England <Anchor href="https://www.theguardian.com/business/2022/oct/20/the-mini-budget-that-broke-britain-and-liz-truss">stepping in
                                to buy £65bn of government bonds</Anchor>, and the end of the shortest premiership in UK political history.
                            </p>
                            <p>So, just a silly joke - as long as you ignore the mortgage rates.</p>
                            <h2 className="text-lg font-bold sm:text-xl">So... what's it for?</h2>
                            <p>On a surface level, just a place for me (or anyone else) to express opinions about almost anything... although I do tend to lean towards things which have a 'political' angle. Politics seems into everything, however - society, culture, history, etc. - it's not just about 
                                discusing politians and elections... that would get boring very quickly.
                            </p>
                            <p>On a deeper level this is a site which allows me to practice and implement the numerous skills I've been learning over the last 18 months: JavaScript, Express, React, CSS (and TailwindCSS), and NoSQL database management with MongoDB. Our <Anchor href="">companion site</Anchor> allows 
                             writers to use a form and rich texteditor to create, update, publish (and unpublish), and delete articles. This allows anyone to write, edit, delete, and publish their own articles through a friendly UI and without any knowledge in web development or programming. This type of fullstack website
                             could be useful in a variety of different environments and contexts - such as a Restaurant site, in which the menus on site may need to be regularly updated, or even a basic social media application for a small group (such as a sports club) where members could sign up, read, create, and delete posts,
                             and write/read comments.
                            </p>
                            <p>The <Anchor href="https://son-writers.netlify.app">companion site</Anchor> requires sign up and you need an access key to do so. This is to protect who can post articles (although you are only able to edit and delete your own). If you would like to write your own articles (or just simply see the companion site), please get in 
                             contact with me. The GitHub respoitory's main page (README) contains information on this companion website as well as screenshots from the site.</p>
                            <p>A full list of libraries and frameworks used can be found on the <Anchor href="https://github.com/louispallett/odin-blog-api">repository</Anchor> on GitHub.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}