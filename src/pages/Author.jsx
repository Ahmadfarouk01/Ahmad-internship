import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

const Author = () => {
  const [items, setItems] = useState([]);
  const [followed, setFollow] = useState(false);
  const [loading, setLoading] = useState(false);
  const skeletonList = [1];
  const params = useParams();

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${params.id}`
        )
        .then((res) => setItems(res.data))
        .catch((err) => console.log(err));
      setLoading(true);
    }, );
  }, []);
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <>
                        {loading ? (
                          <>
                            <img src={items.authorImage} alt="" />
                            <i className="fa fa-check"></i>
                            <div className="profile_name">
                              <h4>
                                {items.authorName}
                                <span className="profile_username">
                                  @{items.tag}
                                </span>
                                <span id="wallet" className="profile_wallet">
                                  {items.address}
                                </span>
                                <button id="btn_copy" title="Copy Text">
                                  Copy
                                </button>
                              </h4>
                            </div>
                          </>
                        ) : (
                          <>
                            {skeletonList.map((__, index) => (
                              <li>
                                <div className="author--skeleton-body">
                                <span className="skeleton skeleton-author-img"></span>
                                <div>
                                <div className=" skeleton skeleton-autor__text"></div>
                                    <span className="profile_username skeleton skeleton-autor__text--link"></span>
                                    <span className="profile_username skeleton skeleton-autor__text--id"></span>
                                </div>
                                      </div>
                              </li>
                            ))}
                          </>
                        )}
                      </>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {!followed ? (
                        <>
                          <div className="profile_follower">
                            {items.followers} followers
                          </div>
                          <button
                            to="#"
                            className="btn-main"
                            onClick={() => setFollow(true)}
                          >
                            Follow
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="profile_follower">
                            {items.followers + 1} followers
                          </div>
                          <button
                            to="#"
                            className="btn-main"
                            onClick={() => setFollow(false)}
                          >
                            Unfollow
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {items && (
                    <div className="de_tab tab_simple">
                      <AuthorItems authorId={items.id} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
