import React, { useEffect, useState, Component } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const HotCollections = (props) => {
  const [hotFeatures, setHotFeatures] = useState([]);
  useEffect(() => {
    axios
      .get(
        " https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      )
      .then((res) => setHotFeatures(res.data))
      .catch((err) => console.log(err));
  }, []);


  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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
          <Slider {...settings}>
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
                  <div className="nft_coll_pp">
                    <Link to="/author">
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
                    <span>ERC- {feature.code}</span>
                  </div>
                </div>
              </div>
          ))}
       
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
