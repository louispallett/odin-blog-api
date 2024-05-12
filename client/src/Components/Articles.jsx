import { useEffect, useState } from "react"

import loadingIcon from "/assets/images/loading.svg"

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
                <div className="grid sm:grid-cols-3">
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
        <div className="">
            <p>{data.title}</p>
        </div>
    )
}