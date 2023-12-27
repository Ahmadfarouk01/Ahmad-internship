import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const [details, setItemDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
        )
        .then((res) => setItemDetails(res.data))
        .catch((err) => console.log(err));
      setLoading(true);
    },);  
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {loading ? (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={details.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2 className="details__title">{details.title}</h2>
                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {details.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {details.likes}
                        </div>
                      </div>
                      <p>{details.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${details.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={details.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${details.ownerId}`}>
                                {details.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${details.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={details.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${details.creatorId  }`}>
                                {details.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{details.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="skeleton skeleton-nft">
                    {/* <img
                      src={details.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    /> */}
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2 className="details__title skeleton skeleton-text">
                        {details.title}
                      </h2>
                      <div className="item_info_counts">
                        <div className="item_info_views skeleton skeleton-price">
                          {details.views}
                        </div>
                        <div className="item_info_like skeleton skeleton-price">
                          {details.likes}
                        </div>
                      </div>
                      <p className="skeleton skeleton-text--bg">
                        {details.description}
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                        <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${details.ownerId}`}>
                                <img
                                  className="lazy skeleton skeleton-img"
                                  src={details.ownerImage}
                                  alt=""
                                />
                              </Link>
                            </div>
                            <div className="author_list_info"></div>
                          </div>
                        </div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                        <h6>Creator</h6>  
                          <div className="item_author">
                            <div className="author_list_pp">
                              <img
                                className="lazy skeleton skeleton-img"
                                src={details.creatorImage}
                                alt=""
                              />
                            </div>
                            <div className="author_list_info"></div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price skeleton skeleton-price"></div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;