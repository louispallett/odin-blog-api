import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import loadingIcon from "/assets/images/loading.svg";
import imagePlaceholder from "/assets/images/image_placeholder.svg";

export default function Articles() {
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getArticles = async () => {
            try {
                const response = await fetch("/api/articles/", { mode: "cors" });
                if (!response.ok) {
                    throw new Error(response.status);
                }
                const actualData = await response.json();
                setArticles(actualData);
                setError(null);
            } catch (err) {
                setError(err.message);
                setArticles(null);
            } finally {
                setLoading(false);
            }
        }
        getArticles();
    }, [])

    // TODO: We need to style the error a bit. Make it look a little nicer.
    return (
        <>
            {loading && (
                <img src={loadingIcon} alt="" className="h-10 m-10" id="loading-icon"/>
            )}
            {articles && (
                <div className="grid sm:grid-cols-2 m-2.5 sm:m-5 sm:gap-5 justify-center">
                    {/* NOTE: The JSON data starts with "article", hence we have to access it like this! */}
                    {articles.articles.map(item => (
                        <ArticleCard key={item._id} data={item} />
                    ))}
                </div>
            )}
            {error && (
                <div className="text-white">
                    <img src="" alt="" className="error"/>
                    <p>ERROR: {error}</p>
                    <p>Apologies - an error has occured trying to fetch data from the server. Please try again later.</p>
                </div>
            )}
        </>
    )
}

function ArticleCard({ key, data }) {
    return (
        <Link to={data._id} className="hover:opacity-80">
            <div className="bg-blue-950 rounded-b-none rounded-lg">
                <h5 class="p-3 text-2xl font-sedan font-bold tracking-tight text-gray-100 sm:text-4xl sm:font-black sm:p-5">{data.title}</h5>
            </div>
            <div className="flex items-center flex-col min-w-full p-6 bg-white rounded-lg rounded-t-none shadow dark:bg-slate-700">
                {data.image_url ? (
                    <img src={data.image_url} alt="" className="object-contain max-h-60 max-w-full" />
                ) : (
                    <img src={imagePlaceholder} alt="" className="object-contain max-h-60 max-w-full" />
                )}
                <p class="self-start my-1.5 italic sm:my-3.5 dark:text-slate-100">{data.synopsis}</p>
            </div>
        </Link>
    )
}