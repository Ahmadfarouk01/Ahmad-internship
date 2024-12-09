 import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Count from "../timer/explorTimer";
import Likings from "../timer/likes";

const ExploreItems = () => {

  

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
    const skeletonList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    

  useEffect(() => {
    setTimeout(() => {
      axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
      setLoading(true)
    }, 100);
  }, []);

  function filterNfts(filter) {
    if (filter === "price_low_to_high") {
      setItems(
        items
          .slice()
          .sort(
            (a, b) =>
              (a.price) -
              (b.price)
          )
      );
    }
    if (filter === "price_high_to_low") {
      setItems(
        items
          .slice()
          .sort(
            (a, b) =>
            (b.price) -
            (a.price)
          )
      );
    }
    if (filter === "likes_high_to_low") {
      setItems(
        items
            .slice()
            .sort(
              (a, b) =>
                (b.likes - a.likes)
            )
        );
      }}

     
 
  return (
    <>
      <div>
        <select id="filter-items" defaultValue=""  onChange={(event) => filterNfts(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <>
{items.map((item, index) => (
  <div
    key={index}
    className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
    style={{ display: "block", backgroundSize: "cover" }}
  >
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to={`/author/${item.authorId}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
        >
          <img className="lazy" src={item.authorImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      <div className="de_countdown"><Count items={item}/></div>

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
          <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${item.nftId}`}>
          <h4>{item.title}</h4>
        </Link>
        <div className="nft__item_price">{item.price}ETH</div>
        <div className="nft__item_like">
          <span><Likings items={item}/></span>
        </div>
      </div>
    </div>
  </div>
  ))}
  </>
      ):(
        <>
        {skeletonList.map((__, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp skeleton skeleton-img">
              </div>
              <div className="de_countdown skeleton skeleton-timer"></div>
  
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
                <div to="/item-details" className="skeleton skeleton-nft-img">
                </div>
              </div>
              <div className="nft__item_info">
                <div to="/item-details" className="skeleton skeleton-text">
                </div>
                <div className="nft__item_price skeleton skeleton-price"></div>
                <div className="nft__item_like">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        ))}
        </>
      )}
      
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
