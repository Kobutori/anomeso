// pages/index.js
import Link from 'next/link';
import CompHeader from "../components/header"

export default function Home({ blog }) {
  return (
    <>
      <CompHeader />
      <div>
        <ul>
          {blog.map(blog => (
            <li key={blog.id}>
              <Link href={`blog/${blog.id}`}>
                <a>{blog.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}


// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch('https://anomeso.microcms.io/api/v1/blog', key)
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      blog: data.contents,
    },
  };
};