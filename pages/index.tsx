import Head from "next/head";
import styles from "../styles/Home.module.scss";

const CONTENT_API_KEY = "9921fd21bd1cf71994300c90a1";
const BLOG_URL = "https://febrilian.digitalpress.blog";

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts();
  return {
    props: { posts },
  };
};

type Post = {};

async function getPosts() {
  //curl "https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062&include=tags,authors"
  const res = await fetch(`${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}`)
    .then((res) => res.json())

    const titles = res.posts.map((post:any) => post.title)
    const html = res.posts.map((post:any) => post.html)
    console.log('titles', html)
    return {titles, html}
}

const Home: React.FC<{ posts: Post[] }> = (props) => {

  const { posts } = props

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello :D</h1>
      <ul>
        {
          posts.titles.map((post, index) => {
          return <>
          <li key={index}>{post}</li>
          </>
          })
        }
        
      </ul>
    </div>
  );
};

export default Home;
