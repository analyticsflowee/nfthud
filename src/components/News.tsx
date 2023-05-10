import classNames from 'classnames';
import React, { ReactElement, useEffect, useState, useCallback } from 'react';
import db from '../firebase';
import { ref, onValue, set, update } from "firebase/database";
import Section from './Section';
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'

type NewsProps = {
  active?: boolean;
  className?: string;
  page?: string;
};

export default function News({ active, className, page }: NewsProps): ReactElement {
  const [data, setData] = useState({ markdown: "", html: "", timestamp: 0 });
  const [preview, setPreview] = useState('');
  const query = ref(db, "news/" + page);

  // get data from firebase Realtime Database and set to state:
  useEffect(() => {
    console.log('render at', page);
    return onValue(query, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        setData(val);
        setPreview(val.html);
      };
    });
  }, [page]);

  // handle change to markdown and save to firebase Realtime Database:
  const handleSave = async (e: React.ChangeEvent<HTMLPreElement>) => {
    console.log('data was:', data);
    const markdown = e.target.parentElement.previousElementSibling.innerText;
    const timestamp = Date.now();

    const html = unified()
      .use(remarkParse)
      .use(remarkHtml)
      .processSync(markdown).value;

    console.log("new data is:", { markdown, html, timestamp });
    set(query, { markdown, html, timestamp });
  }
  const updatePreview = useCallback((e: React.ChangeEvent<HTMLPreElement>) => {
    const markdown = e.target.innerText;
    const html = unified()
      .use(remarkParse)
      .use(remarkHtml)
      .processSync(markdown).value;

    setPreview(html);
  }, []);

  return (
    <section className='p-2'>
      <ul>
        <li>
          Update the markdown for {page}:
        </li>
      </ul>
      <pre
        contentEditable='true'
        className='mx-4 my-2 border overflow-auto whitespace-pre-wrap min-h-[50%] bg-slate-200'
        onInput={updatePreview}
      >
        {data.markdown}
      </pre>
      {preview &&
        <Section id={`${page}-3`} sectionNumber={3} html={preview} />
      }
      <div>
        <button
          onClick={handleSave}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
        >
          Save Changes to Firebase
        </button>
      </div>
      <p>
        Last saved: {new Date(data.timestamp).toString()}
      </p>
    </section>
  );
}
