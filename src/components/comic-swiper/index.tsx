import React, { useState, useRef } from "react";
import Swiper from "react-id-swiper";
// import "static/css/swiper.min.css";
import "./index.scss";
import LoadingPageNumComponent from "../loading-pagenum";
import CppBtn from "../../components/cpp-btn";
interface PropsModel {
  orderStatus: boolean;
  currentPage: number;
  setCurrentPage: (currentPage: number | undefined) => void;
  navVisible: () => void;
  pages: any[];
  nextChapter: () => void;
}

class ComicSwiper extends React.Component<PropsModel> {
  constructor(props: any) {
    super(props);
  }
  touchController = (e: any) => {
    var event: MouseEvent | Touch;
    if (e.changedTouches) {
      event = e.changedTouches[0];
    } else {
      event = e;
    }

    let { clientX } = event;
    let deviceWidth = window.innerWidth;
    // 把画面分成12栅栏
    let x = deviceWidth / 12;
    if (clientX < 4 * x) {
      this.leftTouch();
    }
    if (clientX >= 4 * x && clientX <= 8 * x) {
      this.props.navVisible();
    }
    if (clientX > 8 * x) {
      this.rightTouch();
    }
  };

  state: any = {
    params: {
      // slidesPerGroup: 2,
      // longSwipesRatio:0.9,
      // effect:"flip",
      effect: "fade",
      loop: false,
      // touchRatio:0.4,
      on: {
        tap: this.touchController,
        slideChangeTransitionStart: () => {
          // 翻页时记录到store中
          if (this.state.swiper) {
            this.props.setCurrentPage(this.state.swiper.activeIndex);
          }
        },
        progress: (progress: number) => {
          if (progress > 1) {
            this.props.nextChapter();
          }
        }
      },
      lazy: {
        preloaderClass: "comic-lazy-preloading",
        loadPrevNext: true,
        loadPrevNextAmount: 2
      }
    },
    swiper: null,
    flag: false,
    horizontal: false,
    doms: []
  };

  rightTouch = () => {
    if (this.state.swiper !== null) {
      // 最后一页跳下一章

      if (this.props.orderStatus) {
        if (this.state.swiper.isEnd) {
          this.props.nextChapter();
        }
        this.state.swiper.slideNext();
      } else {
        this.state.swiper.slidePrev();
      }
    }
  };
  leftTouch = () => {
    if (this.state.swiper !== null) {
      if (this.props.orderStatus) {
        this.state.swiper.slidePrev();
      } else {
        if (this.state.swiper.isEnd) {
          this.props.nextChapter();
        }
        this.state.swiper.slideNext();
      }
    }
  };

  componentDidMount() {}
  doms: any[] = [];

  render() {
    let tmpdom: any[] = [];
    console.log("render");
    this.props.pages.forEach(({ id, url }, i) => {
      if (i == 0) {
        tmpdom.push(
          <div
            style={{ backgroundColor: "#161616", height: "100%", width: "36%" }}
          ></div>
        );
      } else {
        tmpdom.push(
          <img
            src={url}
            style={{ height: "100%" }}
            onError={() => {
              console.log("error");
            }}
          />
        );
      }

      if (i % 2) {
        // 双数
        this.doms.push(
          <div key={i} className="swiper-lazy cpp-comic-img">
            {tmpdom}
          </div>
        );
        tmpdom = [];
      }
    });

    return (
      <div>
        <div
          style={{ position: "fixed", right: "7%", top: "5%", zIndex: 10000 }}
        >
          <CppBtn onClick={() => this.state.swiper.slidePrev()}>上一页</CppBtn>
          <CppBtn onClick={() => this.state.swiper.slideNext()}>下一页</CppBtn>
        </div>
        <Swiper
          {...this.state.params}
          initialSlide={this.props.currentPage}
          getSwiper={val => {
            this.setState({ swiper: val });
          }}
          rtl={this.props.orderStatus ? undefined : "left"}
        >
          {this.doms}
          {/* {this.props.pages.map(({ id, url }, index) => (
            <div key={id} className="cpp-comic-container">
              <LoadingPageNumComponent
                className="comic-lazy-preloading"
                pageNum={index + 1}
              ></LoadingPageNumComponent>
              <div
                // data-background={url}
                className="swiper-lazy cpp-comic-img"
              />
              <div
                style={{
                  backgroundImage: `url(${url})`,
                  backgroundPosition: index % 2 ? "right" : "left"
                }}
              ></div>
            </div>
          ))} */}
        </Swiper>
      </div>
    );
  }
}
export default ComicSwiper;
