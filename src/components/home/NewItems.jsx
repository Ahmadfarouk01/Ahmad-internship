import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Timer from "../timer/timer";
import Liker from "../timer/liker";
import Likings from "../timer/liker";

const NewItems = () => {
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(false);
  const skeletonList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

 

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(
          " https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        )
        .then((res) => setItems(res.data))
        .catch((err) => console.log(err));
      setLoading(true);
    }, 200);
   
  }, []);

  const sliderRef = React.useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <>
            {loading ? (
              <>
                <Slider ref={sliderRef} {...settings}>
                  {items.map((item, index) => (
                    <div
                      className="col-lg-12 col-md-6 col-sm-6 col-xs-12 nft-dynamic"
                      key={index}
                    >
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator: Monica Lucas"
                          >
                            <img
                              className="lazy"
                              src={item.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="de_countdown">
                          <Timer items={item} />
                        </div>

                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-facebook fa-lg"></i>
                                </a>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-twitter fa-lg"></i>
                                </a>
                                <a href="">
                                  <i className="fa fa-envelope fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>

                          <Link to={`/item-details/${item.nftId}`}>
                            <img
                              src={item.nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to={`/item-details/${item.nftId}`}>
                            <h4>{item.title}</h4>
                          </Link>
                          <div className="nft__item_price">
                            {item.price} ETH
                          </div>
                          <div className="nft__item_like">
                            <span>
                             <Likings items={item}/>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </>
            ) : (
              <>
                {skeletonList.slice(0, 4).map((__, index) => (
                  <div className="skeleton-wrap" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to="/author"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                          className="skeleton skeleton-img"
                        >
                          <img className="lazy" alt="" />
                        </Link>
                      </div>
                      <div className="skeleton skeleton-countdown"></div>
                      <div className="nft__item_wrap skeleton">
                        <Link to="/item-details">
                          <img className="lazy nft__item_preview " alt="" />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link
                          to="/item-details"
                          className="skeleton skeleton-text"
                        ></Link>
                        <div className="nft__item_price skeleton skeleton-text"></div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
          <button className="slider-prev-btn slider-btn" onClick={previous}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="slider-next-btn slider-btn" onClick={next}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
