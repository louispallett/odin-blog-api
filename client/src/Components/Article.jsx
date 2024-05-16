import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import { Spinner } from "./tailwind-ex-elements";
import imagePlaceholder from "/assets/images/image_placeholder.svg";
import userImg from "/assets/images/user.svg";

export default function Article() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getArticle = async () => {
            try {
                const response = await fetch(`/api/articles/${id}`, { mode: "cors" });
                if (!response.ok) {
                    throw new Error(response.status);
                }
                const actualData = await response.json();
                setData(actualData.article);
                setError(null);
            } catch (err) {
                setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        }
        getArticle();
    }, []);

    return (
        <>
            {loading && (
                <Spinner id="spinner"/>
            )}
            {data && (
                <ArticleBody data={data} articleId={id} />
            )}
            {error && (
                <div className="text-white">
                    <img src="" alt="" className="error"/>
                    <p>ERROR: {error}</p>
                    {/* <p>Apologies - an error has occured trying to fetch data from the server. Please try again later.</p> */}
                </div>
            )}
            <div className="flex flex-col p-2.5 sm:p-5 sm:max-w-5xl">
                <div className="bg-blue-950 rounded-b-none rounded-lg">
                    <h5 className="p-3 text-xl text-center font-sedan font-bold tracking-tight text-gray-100 sm:text-2xl sm:font-black sm:p-5">Comments</h5>
                </div>
                <Comments articleId={id} />
            </div>
        </>
    )
}

function ArticleBody({ data }) {
    return (
        <div className="flex flex-col p-2.5 sm:p-5 sm:max-w-5xl">
            <div className="bg-blue-950 rounded-b-none rounded-lg">
                <h5 className="p-3 text-2xl font-sedan font-bold tracking-tight text-gray-100 sm:text-4xl sm:font-black sm:p-5">{data.title}</h5>
            </div>
            <div className="flex flex-col min-w-full bg-white rounded-lg rounded-t-none shadow dark:bg-slate-700">
                {data.image_url ? (
                    <img src={data.image_url} alt="" className="object-cover max-h-60 max-w-full sm:max-h-96" />
                ) : (
                <img src={imagePlaceholder} alt="" className="object-contain max-h-60 max-w-full" />
                )}
                <p className="m-2 p-1 bg-blue-950 self-end font-bold rounded-lg text-slate-100 sm:mx-4 sm:p-1.5">By {data.author.username}</p>
                <p className="self-start italic px-2.5 py-3.5 sm:px-3 sm:py-4 dark:text-slate-100">{data.synopsis}</p>
                <hr className="mx-3.5 sm:mx-5" />
                <p className="self-start px-2.5 py-3.5 sm:px-3 sm:py-4 dark:text-slate-100">{data.content}</p>
            </div>
        </div>

    )
}

function Comments({ articleId }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getComments = async () => {
            try {
                const response = await fetch(`/api/articles/${articleId}/comments`, { mode: "cors" });
                if (!response.ok) {
                    throw new Error(response.status);
                }
                const actualData = await response.json();
                setData(actualData);
                setError(null);
            } catch (err) {
                setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        }
        getComments();
    }, [])
    
    return (
        <div className="flex flex-col min-w-full bg-white rounded-lg rounded-t-none shadow px-2.5 py-3.5 sm:px-3 sm:py-4 dark:bg-slate-700 dark:text-slate-100">
            {loading && (
                <Spinner id="spinner"/>
            )}
            {data && (
                data.comments.map(item => (
                    <Comment data={item} />
                ))
            )}
            {error && (
                <div>
                    <img src="" alt="" className="error"/>
                    <p className="bg-red-700 p-2.5 text-white text-center">ERROR: {error}</p>
                    {/* <p>Apologies - an error has occured trying to fetch data from the server. Please try again later.</p> */}
                </div>
            )}
        </div>
    )
}

function Comment({ data }) {
    return (
        <div className="flex flex-col gap-1 my-1.5 sm:my-2.5 sm:gap-1.5">
            <div className="flex justify-between items-center gap-1.5 sm:gap-3">
                <div className="flex items-center gap-1.5 sm:gap-3">
                    <img src={userImg} alt="" className="h-5 bg-blue-950 rounded-full p-1 sm:h-8 sm:p-1.5" />
                    <p className="font-bold sm:text-lg">{data.author.username}</p>
                </div>
                <p className="italic text-xs sm:text-sm">{data.date_formatted}</p>
            </div>
            <p className="px-2.5 sm:px-5">{data.content}</p>
        </div>
    )
}