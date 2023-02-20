import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { followList, toggleFollow } from "../api";
import Loader from "../components/Loader";
import { useAuth } from "../hooks";

const FollowList = () => {
  const [loading, setLoading] = useState(true);
  const [followers, setFollwers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [follower, setFollwer] = useState(true);
  const { list } = useParams();
  const auth = useAuth();
  useEffect(() => {
    const getUserFollowData = async () => {
      if (auth?.user) {
        const response = await followList(auth?.user?._id);
        if (response.success) {
          //   console.log(response);
          setFollwers(response.data.followers);
          setFollowing(response.data.following);
          if (list == "following") {
            setFollwer(false);
          }
        }
      }
      setLoading(false);
    };
    getUserFollowData();
  }, [auth]);

  const handelfollowersList = () => {
    setFollwer(true);
  };
  const handelfollowingList = () => {
    setFollwer(false);
  };

  const handelToggleFollow = async (profileUser) => {
    const response = await toggleFollow(auth?.user?._id, profileUser);
    if (response.success) {
      //   console.log(response);
    }
  };

  const handelUnfollow = (id) => {
    setFollowing((list) => list.filter((listId) => listId._id !== id));
  };

  const handelUnfollowFollowBack = (list) => {
    for (const i of following) {
      if (i._id === list._id) {
        setFollowing((follow) =>
          follow.filter((follow) => follow._id !== list._id)
        );
        // setFollowing(following.filter((item) => item._id !== list._id));

        return;
      }
    }

    return setFollowing((prevFollowing) => [...prevFollowing, list]);
  };

  const handelCheckFollowing = (id) => {
    if (following) {
      for (const i of following) {
        if (i._id === id) {
          return "Following";
        }
      }
      return "Follow Back";
    }
  };

  const List = follower ? followers : following;

  if (loading) {
    return <Loader/>
  }
  return (
    <main className="followList_container">
      <div className="followList_outer_div">
        <section className="list_seprations">
          <div
            onClick={handelfollowersList}
            className={follower ? "selectedList" : "notseletedList"}
          >
            Followers
          </div>
          <div
            onClick={handelfollowingList}
            className={follower ? "notseletedList" : "selectedList"}
          >
            Following
          </div>
        </section>
        {List.length ? (
          <>
            {List?.map((list) => (
              <section key={list._id} className="follow_list_details">
                <div className="user_full_info">
                  <div className="user_profile_detail">
                    <div className="user_profile_img">
                      {list.avatar ? (
                        <img
                          alt=""
                          width={"100%"}
                          height="100%"
                          src={`data:image/png;base64,${btoa(
                            String.fromCharCode(
                              ...new Uint8Array(list.avatar.img.data)
                            )
                          )}`}
                        />
                      ) : (
                        <img
                          alt=""
                          width={"100%"}
                          height="100%"
                          src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                        />
                      )}
                    </div>
                    <div className="user_name_email">
                      <p>{list.name}</p>
                      <p>{list.email}</p>
                    </div>
                  </div>
                  <div className="unfollow_btn_container">
                    {follower ? (
                      <button
                        onClick={() => {
                          handelToggleFollow(list._id);
                          handelUnfollowFollowBack(list);
                        }}
                      >
                        {handelCheckFollowing(list._id)}
                        {/* Follow Back {" "} */}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handelToggleFollow(list._id);
                          handelUnfollow(list._id);
                        }}
                      >
                        Unfollow{" "}
                      </button>
                    )}
                  </div>
                </div>
              </section>
            ))}
          </>
        ) : (
          <div className="empty_list">
            <h1> Empty List!!</h1>
          </div>
        )}
      </div>
    </main>
  );
};

export default FollowList;
