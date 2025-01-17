import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      fetchNfts();
  }, []);

  async function fetchNfts() {
      setIsLoading(true);
      const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
      setNfts(data);
      setIsLoading(false);
  }

  useEffect(() => {
      const timer = setInterval(() => {
          setNfts(prevNfts => {
              return prevNfts.map(nft => {
                  return { ...nft, countdown: getCountdown(nft.expiryDate) }; 
              });
          });
      }, 1000);

      return () => clearInterval(timer);
  }, [nfts]);

  const getCountdown = (expiryTimestamp) => {
      const endTime = expiryTimestamp * 1000 || expiryTimestamp;
      const currentTime = new Date().getTime();
      const remainingTime = endTime - currentTime;

      if (remainingTime <= 0) {
          return "Auction Closed";
      }
      const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      return `${hours}h ${minutes}m ${seconds}s`;
  };

  const owlSettings = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 4 },
    },
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

          <OwlCarousel
            key={isLoading ? "loading" : "loaded"}
            className="owl-theme"
            {...owlSettings}
          >
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div className="item" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton width="100%" height="300px" />
                      </div>
                      <div className="nft_coll_pp">
                        <Skeleton width="40px" height="40px" />
                      </div>
                      <div className="nft_coll_info">
                        <Skeleton width="150px" height="20px" />
                      </div>
                      <div className="nft_coll_info">
                        <Skeleton width="150px" height="20px" />
                      </div>
                    </div>
                  </div>
                ))
              : nfts.map((nft, index) => (
                  <div key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to="/author"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={nft.title}
                        >
                          <img className="lazy" src={nft.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="de_countdown">{getCountdown(nft.expiryDate)}</div>

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

                        <Link to="/item-details">
                          <img
                            src={nft.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <h4>{nft.title}</h4>
                        </Link>
                        <div className="nft__item_price">{nft.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{nft.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
