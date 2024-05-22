import { useEffect, useRef, useState } from "react";
import { Editor } from '@tinymce/tinymce-react';

import { Spinner } from "./tailwind-ex-elements";

export default function NewArticle() {
    const [apiKey, setApiKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const editorRef = useRef(null);

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    useEffect(() => {
        const getApi = async () => {
            try {
                const response = await fetch("/api/writers/new", { mode: "cors" });
                if (!response.ok) {
                    throw new Error(response.status);
                }
                const actualData = await response.json();
                setApiKey(actualData.key);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        getApi();
    })

    /* SUBMISSION OF CONTENT
        Note the above log() function where the editor uses useRef to write out the information. TinyMCE deals with dangerous characters like < > and &, escaping them itself.
        So, we just need to upload this to MongoDB as is. It's a little more complicated when we fetch the info and we're gonna have to change this (and convert it to html!).
    */

    return (
        <div className="flex flex-col p-2.5 sm:p-5 sm:max-w-5xl">
            <div className="bg-blue-950 rounded-b-none rounded-lg">
                <h5 className="p-3 text-2xl font-sedan font-bold tracking-tight text-gray-100 sm:text-4xl sm:font-black sm:p-5">New Article</h5>
            </div>
            <div className="flex flex-col min-w-full bg-white rounded-lg rounded-t-none shadow p-3 sm:p-5 dark:bg-slate-700">
                {/* <form action="" className="flex flex-col gap-2.5 sm:gap-3.5"> */}
                    <div>
                        <label htmlFor="title" className="font-bold dark:text-slate-100">Title</label>
                        <input type="text" id="title" maxLength={40} minLength={2}
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6 dark:bg-transparent dark:text-slate-100"
                        />
                    </div>
                    <div>
                        <label htmlFor="synopsis" className="font-bold dark:text-slate-100">Synopsis</label>
                        <textarea type="text" id="synopsis" maxLength={200} minLength={2}
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset outline-none focus:ring-yellow-400 sm:text-sm sm:leading-6 dark:bg-transparent dark:text-slate-100"
                        ></textarea>
                    </div>
                    { loading && (
                        <div className="flex justify-center items-center my-20">
                            <Spinner id="spinner"/>
                        </div>                
                    )}
                    { apiKey && (
                        <>
                            <Editor
                                apiKey={apiKey}
                                onInit={(_evt, editor) => editorRef.current = editor}
                                initialValue="<p>Write your article content here...</p>"
                                init={{
                                skin: (window.matchMedia("(prefers-color-scheme: dark)").matches ? "oxide-dark" : "oxide"),
                                content_css: (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : ""),
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                            <button onClick={log}
                                className="flex w-full justify-center rounded-md bg-green-600 px-3 mt-2.5 py-1.5 font-semibold leading-6 text-white shadow-sm sm:max-w-5xl hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                            >Save</button>
                        </>
                    )}
                {/* </form> */}
            </div>
        </div>
    )
}