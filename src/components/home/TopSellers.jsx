import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { Suspense } from "react";

const TopSellers = () => {
  const [sellers, setsellers] = useState([]);
  const url =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

  useEffect(() => {
    async function renderData(){
      setTimeout(() => {
        axios
        .get(url)
        .then((res) => setsellers(res.data))
        .catch((err) => console.log(err));
      }, 7000);
    }
      renderData();
  }, [url]);
  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              <>
              {sellers.map((seller, index) => (
                <Suspense fallback={<Skeleton />} className="yes">
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage || <Skeleton />}
                        alt=""
                      />

                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">{seller.authorName}</Link>
                    <span>{seller.price || <Skeleton />} ETH</span>
                  </div>
                </li>
                </Suspense>
                ))}
                </>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
