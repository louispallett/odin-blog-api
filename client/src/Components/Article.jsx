import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import loadingIcon from "/assets/images/loading.svg";
import imagePlaceholder from "/assets/images/image_placeholder.svg";

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
                <img src={loadingIcon} alt="" className="h-10 m-10" id="loading-icon"/>
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
                {/* <p className="self-end my-1.5 italic sm:my-3.5 dark:text-slate-100">{data.author}</p> */}
                <p className="self-start italic px-2.5 py-3.5 sm:px-3 sm:py-4 dark:text-slate-100">{data.synopsis}</p>
                <hr className="mx-3.5 sm:mx-5" />
                <p className="self-start px-2.5 py-3.5 sm:px-3 sm:py-4 dark:text-slate-100">{data.content}</p>
            </div>
        </div>

    )
}

function Comments({ articleId }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getComments = async () => {
            try {
                const response = await fetch(`api/articles/${articleId}/comments/664381b14a69d3a6948e2ba5`, { mode: "cors" });
                if (!response.ok) {
                    throw new Error(response.status);
                }
                const actualData = await response.json();
                setComments(actualData);
                setError(null);
            } catch (err) {
                setError(err.message);
                setComments([]);
            } finally {
                setLoading(false);
            }
        }
        getComments();
    }, [])
    
    return (
        <div className="flex flex-col min-w-full bg-white rounded-lg rounded-t-none shadow px-2.5 py-3.5 sm:px-3 sm:py-4 dark:bg-slate-700 dark:text-slate-100">
            {loading && (
                <img src={loadingIcon} alt="" className="h-10 m-10" id="loading-icon"/>
            )}
            {comments && (
                <p className="text-black"></p>
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