import React, { useEffect, useState, Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css';
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";

const HotCollections = (props) => {
  const [loaded, setLoaded] = useState([false])
  const [hotFeatures, setHotFeatures] = useState([]);
  useEffect(() => {
    axios
      .get(
        " https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      )
      .then((res) => setHotFeatures(res.data))
      .catch((err) => console.log(err));
      setTimeout(() => {
        setLoaded(true)
      },1000);
  }, []);

  const sliderRef = React.useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };


  const settings = {
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loaded ? (
          <div className="slide_section">
          <Slider ref={sliderRef} {...settings}>
          {hotFeatures.map((feature, index) => (
            <div
            className="col-lg-12 col-md-6 col-sm-6 col-xs-12 edit"
            key={index}
            >
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${feature.nftId}`}>
                      <img
                        src={feature.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp ">
                    <Link to={`/author/${feature.authorId}`}>
                      <img
                        className="lazy pp-coll"
                        src={feature.authorImage}
                        alt=""
                        />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{feature.title}</h4>
                    </Link>
                    <span >ERC- {feature.code}</span>
                  </div>
                </div>
              </div>
          ))}
          </Slider>
          <button className="slider-prev-btn slider-btn" onClick={previous}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="slider-next-btn slider-btn" onClick={next}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          ) : (
            <>
            <div className="nft_coll skeleton"></div>
            <div className="lazy img-fluid skeleton"></div>
            <div className="lazy pp-coll skeleton"></div>
            <div  className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
