import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Likings from "../timer/likes";

const AuthorItems = () => {
  const [items, setItems] = useState([]);
  const params = useParams();

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${params.id}`
        )
        .then((data) => setItems(data.data.nftCollection))
        .catch((err) => console.log(err));
    },1000);
  }, []);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
                {items.map((item, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    key={index}
                  >
                    <div className="nft__item">
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
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <span>
                            <Likings items={item} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
