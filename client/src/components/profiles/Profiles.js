import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profileActions";

class Profiles extends Component {
  componentDidMount() {
    const initialProfilesToLoad = 10;
    this.props.getProfiles(initialProfilesToLoad);
  }
  loadMore = () => {
    const { profiles } = this.props.profile;
    const skip = profiles.length;
    const newProfilesToLoad = 10;
    this.props.getProfiles(newProfilesToLoad, skip, profiles);
  };
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with Developers
              </p>
              {profileItems}
              <button
                onClick={this.loadMore}
                className="btn btn-lg btn-light d-block m-auto"
              >
                Load more Developer Profiles
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(mapStateToProps, { getProfiles })(Profiles);
