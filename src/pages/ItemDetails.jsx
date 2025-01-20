import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import axios from "axios";
import EthImage from "../images/ethereum.svg";

const ItemDetails = () => {
  const { itemId } = useParams();
  const [nftData, setNftData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNftData = async () => {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${itemId}`
      );
      setNftData(data);
      setIsLoading(false);
    };
    fetchNftData();
  }, [itemId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div
        className="no-bottom no-top"
        id="content"
        data-aos="zoom-in"
        data-aos-easing="ease-in"
        data-aos-duration="900"
      >
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {isLoading ? (
                  <Skeleton width="100%" height="400px" borderRadius="10px" />
                ) : (
                  <img
                    src={nftData.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {isLoading ? (
                    <>
                      <Skeleton width="80%" height="40px" borderRadius="5px" />
                      <div className="item_info_counts">
                        <Skeleton
                          width="80px"
                          height="20px"
                          borderRadius="5px"
                        />
                        <Skeleton
                          width="80px"
                          height="20px"
                          borderRadius="5px"
                        />
                      </div>
                      <Skeleton width="100%" height="80px" borderRadius="5px" />
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="50%"
                              />
                              <i className="fa fa-check"></i>
                            </div>
                            <div className="author_list_info">
                              <Skeleton
                                width="100px"
                                height="20px"
                                borderRadius="5px"
                              />
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
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="50%"
                              />
                              <i className="fa fa-check"></i>
                            </div>
                            <div className="author_list_info">
                              <Skeleton
                                width="100px"
                                height="20px"
                                borderRadius="5px"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>
                            <Skeleton
                              width="80px"
                              height="24px"
                              borderRadius="5px"
                            />
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2>
                        {nftData.title} #{nftData.tag}
                      </h2>
                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {nftData.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {nftData.likes}
                        </div>
                      </div>
                      <p>{nftData.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${nftData.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={nftData.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nftData.ownerId}`}>
                                {nftData.ownerName}
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
                              <Link to={`/author/${nftData.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={nftData.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nftData.creatorId}`}>
                                {nftData.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{nftData.price}</span>
                        </div>
                      </div>
                    </>
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

export default ItemDetails;
