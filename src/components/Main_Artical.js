import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Main_Artical = () => {
  return (
    <section id="Main_Artical_full_container">
      <header id="Main_Artical_header">
        <div id="search_container">
          <FontAwesomeIcon className="search_icon" icon={faSearch} size="la" />
          <input placeholder="Search" />
        </div>
        <div id="topics">
          <p>Topics: </p>
          <ul>
            <li>View all </li>
            <li>Design </li>
            <li>Product </li>
            <li>Product </li>

          </ul>
        </div>
      </header>
      <main></main>
    </section>
  );
};

export default Main_Artical;
