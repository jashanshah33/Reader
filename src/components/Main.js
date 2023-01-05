import React from "react";
import Main_Artical from "./Main_Artical";
import Main_Aside from './Main_Aside'

export const Main = () => {
  return (
    <section id="home">
      <main>
        <Main_Artical />
      </main>
      <aside>
        <Main_Aside/>
      </aside>
    </section>
  );
};
