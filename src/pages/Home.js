import  MainArtical  from "../components/MainArtical";
import MainAside from "../components/MainAside";

function Home() {
  return (
    <main>
      <section id="home">
        <main className="blog_main_cont">
          <MainArtical />
        </main>
        <aside>
          <MainAside />
        </aside>
      </section>
    </main>
  );
}

export default Home;
