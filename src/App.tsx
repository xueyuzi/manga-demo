import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ComicSwiper from "./components/comic-swiper/index";
import CppBtn from "./components/cpp-btn";
function App() {
  const pages = Array.from({ length: 20 }, (v, k) => ({
    id: k,
    url: `./manga/${k}.png`
  }));
  console.log(pages);
  return (
    <div className="App">
      
      <ComicSwiper
        orderStatus={false}
        currentPage={1}
        setCurrentPage={() => {}}
        navVisible={() => {}}
        pages={pages}
        nextChapter={() => {}}
      />
    </div>
  );
}

export default App;
