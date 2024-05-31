import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, Link } from "react-router-dom"

import { Spinner } from "./tailwind-ex-elements";
import Error from "./Error.jsx";
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
                <div className="flex justify-center my-20">
                    <Spinner id="spinner"/>
                </div>
            )}
            {data && (
                <ArticleBody data={data} articleId={id} />
            )}
            {error && (
                <Error />
            )}
            <div className="flex flex-col p-2.5 sm:p-5 sm:min-w-minArticle sm:max-w-maxArticle">
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
        <div className="flex flex-col p-2.5 sm:p-5 sm:min-w-minArticle sm:max-w-maxArticle">
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
                <p className="italic px-2.5 py-3.5 sm:px-3 sm:py-4 dark:text-slate-100">{data.synopsis}</p>
                <hr className="mx-3.5 sm:mx-5" />
                <div className="px-2.5 py-3.5 sm:px-3 sm:py-4 dark:text-slate-100" dangerouslySetInnerHTML={{__html: data.content }} id="articleBody"></div>
            </div>
        </div>

    )
}

function Comments({ articleId }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState(true)

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
    }, [newComment])
    
    return (
        <div className="flex flex-col bg-white rounded-lg rounded-t-none shadow px-2.5 py-3.5 sm:px-3 sm:py-4 dark:bg-slate-700 dark:text-slate-100">
            {loading && (
                <div className="flex justify-center mx-28 my-10">
                    <Spinner id="spinner"/>
                </div>
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
            <PostComment articleId={articleId} newComment={newComment} setNewComment={setNewComment}/>
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

function PostComment({ articleId, newComment, setNewComment }) {
    const form = useForm();
    const { register, control, handleSubmit, formState, watch } = form;
    const { errors } = formState;
    const [isPending, setIsPending] = useState(false);

    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const onSubmit = async (data) => {
        const token = localStorage.getItem("Authorization");
        if (!token) {
            setLoading(false);
            return;
        }
        setIsPending(true);
        try {
            await fetch(`/api/articles/${articleId}/comments/create`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": token
                },
                body: JSON.stringify(data)
            })
            setNewComment(!newComment);
            setIsPending(false);
            document.getElementById("content").value = "";
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem("Authorization");
            if (!token) {
                setLoading(false);
                return;
            };
            try {
                const response = await fetch(`/api/articles/${articleId}/comments/create`, { 
                    mode: "cors", 
                    headers: { "Authorization": token } 
                })
                if (response.status < 400) {
                    setIsAuth(true);
                    setError(null);
                } else {
                    setIsAuth(false);
                }
            } catch (err) {
                setError(err);
                setIsAuth(false);
            } finally {
                setLoading(false);
            }
        }
        checkUser();
    }, [])
    
    return (
        <>
            { isAuth && (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-2.5 my-2 sm:gap-4 sm:my-4">
                    <hr className="mx-5 sm:mx-10 border-slate-600"/>
                    <div className="flex justify-center gap-2.5 sm:gap-5">
                        <textarea name="content" id="content" placeholder="Type here..."
                            className="block w-full rounded-md py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:focus:bg-blue-950 dark:bg-transparent dark:text-white"
                            {...register("content", {
                                required: "This input is required!",
                                maxLength: {
                                    value: 600,
                                    message: "Cannot be longer than 600 characters"
                                }
                            })}>
                        </textarea>
                        <span className="flex text-sm font-bold text-red-400">
                            <p>{errors.content?.message}</p>
                        </span>
                        { isPending ? (
                            <div className="flex justify-center">
                                <Spinner id="spinner"/>
                            </div>
                        ) : (
                            <button type="submit" 
                                className="text-sm rounded-md px-2.5 py-1 font-bold bg-yellow-600 shadow-sm sm:px-3.5 py-1.5 hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600">
                                Post
                            </button>
                        )}
                    </div>
                </form>
            )}
            { !isAuth && (
                <div className="my-2 sm:my-4">
                    <p><Link to="/users/sign-in" className="font-semibold leading-6 text-yellow-600 hover:text-yellow-500"> Login </Link> 
                    or
                    <Link to="/users/sign-up" className="font-semibold leading-6 text-yellow-600 hover:text-yellow-500"> Sign Up </Link> 
                    to post a comment!</p>
                </div>
            )}
            { loading && (
                <div className="flex justify-center p-2.5 sm:p-4.5">
                    <Spinner id="spinner" />
                </div>
            )}
        </>
    )
}