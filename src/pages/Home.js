import  MainArtical  from "../components/MainArtical";
import MainAside from "../components/MainAside";

function Home(props) {
  const {category}= props
  return (
    <main>
      <section id="home">
        <main className="blog_main_cont">
          <MainArtical category={category} />
        </main>
        <aside>
          <MainAside />
        </aside>
      </section>
    </main>
  );
}

export default Home;
