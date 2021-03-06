import React, { useEffect, useState } from "react";
import "./Profile.css";
import PublicUserDetails from "../../components/UserDetails/PublicUserDetails";
import PublicUserPosts from "../../components/UserPosts/PublicUserPosts";

// useEffect - when component renders for the first time match the current :name in the params and find that specific profile

const PublicProfile = (props) => {
  const [userpost, setPost] = useState();

  useEffect(() => {
    const id = props.match.params.id;
    console.log(id);
    fetch(`/api/profiles/public/${id}`)
      .then((res) => res.json())
      .then((userpost) => setPost(userpost), console.log(userpost))
      .catch((error) => {
        console.error("error", error);
      });
  }, []);

  return (
    <div className="profile">
      <PublicUserDetails
        {...props}
        currentUser={props.profile}
        userpost={userpost}
      />
      <PublicUserPosts {...props} userpost={userpost} />
    </div>
  );
};

export default PublicProfile;
