import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const Topauthorss = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAuthors();
  }, []);

  async function fetchAuthors() {
    setIsLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setAuthors(data);
    setIsLoading(false);
  }

  return (
    <section
      id="section-popular"
      className="pb-5"
      data-aos="slide-right"
      data-aos-easing="ease-in"
      data-aos-duration="800"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top authors</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {isLoading
                ? Array.from({ length: 12 }).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </div>
                      <div className="author_list_info">
                        <Skeleton width="100px" height="20px" />
                        <Skeleton width="60px" height="15px" />
                      </div>
                    </li>
                  ))
                : authors.map((author, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${authors.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={author.authorImage}
                            alt={author.authorName}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${author.authorId}`}>
                          {author.authorName}
                        </Link>
                        <span>{author.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Topauthorss;
