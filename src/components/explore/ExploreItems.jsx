import React, { useEffect, useState } from "react";
import axios from "axios";
import NewItemCard from "../UI/NewItemCard";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [seenItems, setSeenItems] = useState(8);
  const [chosenFilter, setChosenFilter] = useState("");

  const fetchNewItems = async () => {
    const filterSearch = chosenFilter ? `?filter=${chosenFilter}` : "";
    
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${filterSearch}`
    );
    setNewItems(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNewItems();
  }, [chosenFilter]);

  const loadMoreItems = () => {
    setSeenItems(seenItems + 4);
  };

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => setChosenFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {isLoading
        ? Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <Skeleton
                        width="100px"
                        height="30px"
                        borderRadius="5px"
                      />
                    </div>
                  </div>
                  <Skeleton width="100%" height="300px" borderRadius="10px" />
                </div>
                <div className="nft__item_info">
                  <Skeleton width="150px" height="20px" borderRadius="5px" />
                  <div className="nft__item_price">
                    <Skeleton width="80px" height="20px" borderRadius="5px" />
                  </div>
                  <div className="nft__item_like">
                    <Skeleton width="20px" height="20px" borderRadius="50%" />
                    <span>
                      <Skeleton width="30px" height="20px" borderRadius="5px" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        : newItems.slice(0, seenItems).map((item, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NewItemCard item={item} />
            </div>
          ))}
      <div className="col-md-12 text-center">
        {newItems.length > seenItems && (
          <button onClick={loadMoreItems} className="btn-main lead">
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
