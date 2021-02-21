import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { connect } from "react-redux";
import { getTopics } from "../../redux/actions/forum/index";
import TimeAgo from "react-timeago/lib";
import { GetCategories } from "./GetCategories";
import "../../assets/scss/pages/posts.scss";
import { MessageSquare, ThumbsDown, ThumbsUp } from "react-feather";
import ReactHtmlParser from "react-html-parser";
import { getTime } from "./components/getTime";
import { history } from "../../history";

class Posts extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.app.forum.routeParam !== state.currentLocation) {
      return {
        topics: props.app.forum.topics,
      };
    }
    // Return null if the state hasn't changed
    return null;
  }
  state = {
    topics: [],
    currentLocation: this.props.location.pathname,
    value: "",
  };
  async componentDidMount() {
    await this.props.getTopics(this.props.match.params);
    this.setState({
      topics: this.props.app.forum.topics,
    });
  }

  render() {
    const { topics, value } = this.state;
    let topicsArr = value.length ? this.props.app.forum.filteredTopics : topics;
    return topicsArr.length > 0 ? (
      topicsArr.map((topic, i) => {
        return (
          <Card
            key={i}
            className={
              "animated fadeInUp faster col-sm-12 col-md-8 offset-md-2"
            }
            style={{
              display: "grid",
              gridTemplateColumns: "auto max-content",
            }}
          >
            <div className={"text-overflow"}>
              <CardHeader>
                <small className="text-muted">
                  {topic.categories.length > 0 ? (
                    <GetCategories categories={topic.categories} />
                  ) : null}{" "}
                  Posted by {topic.author.nickname}{" "}
                  <TimeAgo date={getTime(topic.creation_date)} />
                </small>
              </CardHeader>
              <CardHeader>
                <CardTitle
                  onClick={() => history.push("/post/" + topic.id)}
                  className={"cursor-pointer overflow-ellipsis"}
                >
                  {topic.title}
                </CardTitle>
              </CardHeader>
              <CardBody>{ReactHtmlParser(topic.content)}</CardBody>
            </div>
            <div className="views ">
              <div
                className="m-0 position-relative"
                style={{ top: "50%", transform: "translateY(-50%)" }}
              >
                <li>
                  <div
                    style={{
                      cursor: "default",
                      padding: "1rem 0.5rem",
                      color: topic.user_reaction === 1 ? "#7367f0" : "",
                    }}
                  >
                    <ThumbsUp size={15} /> {topic.likes}
                  </div>
                </li>
                <li>
                  <div
                    style={{
                      cursor: "default",
                      padding: "1rem 0.5rem",
                      color: topic.user_reaction === 0 ? "#7367f0" : "",
                    }}
                  >
                    <ThumbsDown size={15} /> {topic.dislikes}
                  </div>
                </li>
                <li>
                  <div style={{ cursor: "default", padding: "1rem 0.5rem" }}>
                    <MessageSquare size={15} /> {topic.comments}
                  </div>
                </li>
              </div>
            </div>
          </Card>
        );
      })
    ) : (
      <p className="p-1 text-center mt-2 font-medium-3 text-bold-500">
        No topics at this time
      </p>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    app: state.forumApp,
  };
};
export default connect(mapStateToProps, {
  getTopics,
})(Posts);
