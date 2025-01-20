import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import NewItemCard from "../UI/NewItemCard";
import axios from "axios";

const AuthorItems = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorData = async () => {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthorData(data);
        setIsLoading(false);
    };
    fetchAuthorData();
  }, [authorId]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft__item_wrap">
                    <Skeleton width="100%" height="300px" borderRadius="10px" />
                  </div>
                  <div className="nft__item_info">
                    <Skeleton width="70%" height="20px" borderRadius="5px" />
                    <Skeleton width="50%" height="16px" borderRadius="5px" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="nft-collection">
                <div className="row">
                  {authorData.nftCollection.map((nft) => {
                    return (
                      <div
                        className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                        key={nft.id}
                      >
                        <NewItemCard
                          nft={nft}
                          authorImage={authorData.authorImage}
                          authorId={authorData.authorId}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
