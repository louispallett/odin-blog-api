import { useState } from "react"

import loadingIcon from "/assets/images/loading.svg"

export default function Articles() {
    const [articles, setArticles] = useState(null);
    return (
        <>
            {articles ? (
                <p></p>
            ) : (
                <img src={loadingIcon} alt="" className="h-10 m-10" id="loading-icon"/>
            )}
        </>
    )
}