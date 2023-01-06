import React from "react";
import MainArtical from "./MainArtical";
import MainAside from './MainAside'

export const Main = () => {
  return (
    <section id="home">
      <main className="blog_main_cont">
        <MainArtical />
      </main>
      <aside>
        <MainAside/>
      </aside>
    </section>
  );
};
