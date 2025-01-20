import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import axios from "axios";
import { useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [follows, setFollows] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchAuthorData = async () => {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthorData(data);
        setFollows(data.followers);
        setIsLoading(false);
    };

    fetchAuthorData();
  }, [authorId]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollows((prevCount) =>
      isFollowing ? prevCount - 1 : prevCount + 1
    );
  };

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
              <div
                className="col-md-12"
                data-aos="fade-in"
                data-aos-easing="ease-in"
                data-aos-duration="900"
              >
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {isLoading ? (
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />
                      ) : (
                        <img src={authorData.authorImage} alt="" />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        {isLoading ? (
                          <>
                            <h4>
                              <div>
                                <Skeleton width="150px" height="30px" />
                              </div>
                              <div>
                                <Skeleton width="100px" height="20px" />
                              </div>
                              <div>
                                <Skeleton width="250px" height="20px" />
                              </div>
                            </h4>
                          </>
                        ) : (
                          <h4>
                            {authorData.authorName}
                            <span className="profile_username">
                              @{authorData.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {authorData.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {isLoading ? (
                          <Skeleton width="100px" height="20px" />
                        ) : (
                          `${follows} followers`
                        )}
                      </div>
                      <button className="btn-main" onClick={handleFollow}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-md-12"
                data-aos="fade-in"
                data-aos-easing="ease-in"
                data-aos-duration="700"
              >
                <div className="de_tab tab_simple">
                  <AuthorItems />
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