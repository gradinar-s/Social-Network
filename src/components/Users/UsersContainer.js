import React from "react";
import { connect } from "react-redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUserCount,
  getUsers,
} from "../../redux/selectors/usersSelector";
import {
  follow,
  setCurrentPage,
  unfollow,
  toggleIsFollowingProgress,
  getUsersThunkCreator,
  onPageChangedThunkCreator,
  followThunkCreator,
  unfollowThunkCreator,
} from "../../redux/usersReducer";
import Preloader from "../common/Preloader/Preloader";
import Users from "./Users";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsersThunkCreator(this.props.pageSize, this.props.currentPage);
  }
  onPageChanged = (pageNumber) => {
    this.props.onPageChangedThunkCreator(this.props.pageSize, pageNumber);
  };
  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users {...this.props} onPageChanged={this.onPageChanged} />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUserCount: getTotalUserCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setCurrentPage,
  toggleIsFollowingProgress,
  getUsersThunkCreator,
  onPageChangedThunkCreator,
  followThunkCreator,
  unfollowThunkCreator,
})(UsersContainer);
