import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { getUserProfile, getUserStatus, updateStatus } from "../../redux/profileReducer";
import { withRouter } from "react-router-dom";
// import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authUserId;
      if (!userId) {
        this.props.history.push("/users");
      }
    }
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);

  }
  render() {
    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    fake: state.profilePage.fake,
  };
};

// let AuthRedirectComponent = WithAuthRedirect(ProfileContainer); // HOC. Передаём компоненту
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
// export default connect(mapStateToProps, { getUserProfile })(WithUrlDataContainerComponent);

export default compose(
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateStatus }),
  withRouter
  // WithAuthRedirect
)(ProfileContainer);
