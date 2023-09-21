import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import rehypeRaw from "rehype-raw";
import DOMpurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import ReactMarkdown from 'react-markdown';
import TurndownService from 'turndown';
import remarkGfm from 'remark-gfm'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import "./rich-text.css";
import { convert } from 'html-to-text';
function convertStringToHTML(htmlString) {
    const parser = new DOMParser();
    const html = parser.parseFromString(htmlString, 'text/html');
    return html.body;
}


/*function Test() {
    var turndown=new TurndownService();
    const str = `My name is Aditya
    =================`;
    const html = convertStringToHTML(str);
    console.log(typeof html);
    console.log(html.innerHTML);
    const s=turndown.turndown(str);
    console.log(s);
    return (
        <ReactMarkdown children={str} />
    );
}*/

function Test() {
    function htmltotext() {
        const options = {
            wordwrap: 130,
            // ...
        };
        const html = '<h1>Yay!</h1><h2><a href="https://www.google.com" rel="noopener noreferrer" target="_blank"><strong><em>Party Time</em></strong></a></h2><p>Just having som fun.</p>';
        const text = convert(html, options);
        console.log(text); // Hello World
    }


    return (
        <>

            <button onClick={htmltotext}> Click me </button>
 
        </>


    )
}

export default Test;