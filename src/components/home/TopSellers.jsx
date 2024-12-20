import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [sellers, setsellers] = useState([]);
  const [loading, setLoading] = useState(false);
    const skeletonList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    
    useEffect(() => {
        setTimeout(() => {
          axios
          .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
          .then((res) => setsellers(res.data))
          .catch((err) => console.log(err));
          setLoading(true)
        }, 1000);
      }, []);
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
              {loading ? (
                <>
                {sellers.map((seller, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage }
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                    <span>{seller.price} ETH</span>
                  </div>
                </li>
                ))}
                </>
              ) : (
                <>
                {skeletonList.map((__, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <span>
                          <div
                            className="lazy pp-author skeleton-img skeleton"
                            alt=""></div>
                          <i className="fa fa-check"></i>
                        </span>
                      </div>
                      <div className="author_list_info">
                        <span className="skeleton skeleton-text">
                        </span>
                        <span className="skeleton skeleton-text">
                        </span>
                      </div>
                    </li>
                  ))} 
                </>
                 
              )
              }
                </>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
