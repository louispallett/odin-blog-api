import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { Spinner } from "./tailwind-ex-elements";
import Error from "./Error.jsx";
import imagePlaceholder from "/assets/images/image_placeholder.svg";

export default function Articles() {
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getArticles = async () => {
            try {
                const response = await fetch("https://son-server.fly.dev/api/articles/", { mode: "cors" });
                if (!response.ok) {
                    throw new Error(response.status);
                }
                const actualData = await response.json();
                setArticles(actualData.articles.filter(item => item.published));
                setError(null);
            } catch (err) {
                setError(err);
                setArticles(null);
            } finally {
                setLoading(false);
            }
        }
        getArticles();
    }, [])

    return (
        <>
            {loading && (
                <div className="my-10">
                    <Spinner id="spinner"/>
                </div>
            )}
            {articles && (
                <div className="grid gap-2.5 lg:grid-cols-2 m-2.5 sm:m-5 sm:gap-5 justify-center">
                    {articles.map(item => (
                        <ArticleCard data={item} key={item._id} />
                    ))}
                </div>
            )}
            {error && (
                <Error />
            )}
        </>
    )
}

function ArticleCard({ data }) {
    return (
        <Link to={data._id} className="hover:opacity-80">
            <div className="bg-blue-950 rounded-b-none rounded-lg">
                <h5 className="p-3 text-2xl font-sedan font-bold tracking-tight text-gray-100 sm:text-4xl sm:font-black sm:p-5">{data.title}</h5>
            </div>
            <div className="flex flex-col min-w-full bg-white rounded-lg rounded-t-none shadow dark:bg-slate-700">
                {data.image_url ? (
                    <img src={data.image_url} alt="" className="object-cover max-h-96 max-w-full" />
                ) : (
                    <img src={imagePlaceholder} alt="" className="object-contain max-h-96 max-w-full" />
                )}
                <p className="self-start italic px-2.5 py-3.5 sm:px-3 sm:py-4 dark:text-slate-100">{data.synopsis}</p>
            </div>
        </Link>
    )
}