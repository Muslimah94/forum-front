import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { connect } from "react-redux";
import { getTopic, Reaction } from "../../redux/actions/forum/index";
import TimeAgo from "react-timeago/lib";
import "animate.css";
import "../../assets/scss/pages/posts.scss";
import { MessageSquare, ThumbsDown, ThumbsUp } from "react-feather";
import { GetCategories } from "./GetCategories";
import CommentList from "./Comments/CommentList";
import ReactHtmlParser from "react-html-parser";
import { getTime } from "./components/getTime";

class Posts extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.app.forum.routeParam !== state.currentLocation) {
      return {
        topic: props.app.forum.topic,
      };
    }
    // Return null if the state hasn't changed
    return null;
  }
  state = {
    topic: null,
    parsed: false,
    currentLocation: this.props.match.params.id,
  };
  async componentDidMount() {
    await this.props.getTopic(this.props.match.params.id);
    this.setState({
      topic: this.props.app.forum.topic,
      parsed: true,
    });
  }

  render() {
    const { topic } = this.state;
    return this.state.parsed ? (
      <Card
        className={"animated fadeInUp faster col-sm-12 col-md-8 offset-md-2"}
      >
        <CardHeader>
          <small className="text-muted">
            {console.log("topic", topic)}
            {topic.categories.length > 0 ? (
              <GetCategories categories={topic.categories} />
            ) : null}{" "}
            Posted by {topic.author.nickname}{" "}
            <TimeAgo date={getTime(topic.creation_date)} />
          </small>
        </CardHeader>
        <CardHeader>
          <CardTitle className={"title"}>{topic.title}</CardTitle>
        </CardHeader>
        <CardBody>
          {ReactHtmlParser(topic.content)}

          <div className="d-flex justify-content-start align-items-center mb-1">
            <div className="d-flex align-items-center">
              <span
                style={{ color: topic.user_reaction === 1 ? "#7367f0" : "" }}
                className="mr-2 cursor-pointer"
                onClick={(e) =>
                  this.props.Reaction({
                    author_id: 1,
                    type: 1,
                    post_id: topic.id,
                    comment_id: 0,
                  })
                }
              >
                <ThumbsUp size={15} className="" /> {topic.likes}
              </span>
              <span
                style={{ color: topic.user_reaction === 0 ? "#7367f0" : "" }}
                className={"cursor-pointer"}
                onClick={(e) => {
                  this.props.Reaction({
                    author_id: 1,
                    type: 0,
                    post_id: topic.id,
                    comment_id: 0,
                  });
                }}
              >
                <ThumbsDown size={15} /> {topic.dislikes}
              </span>
            </div>
            <span className="ml-auto">
              <MessageSquare size={15} /> {topic.comments}
            </span>
          </div>
          <CommentList postId={topic.id} />
        </CardBody>
      </Card>
    ) : null;
  }
}
const mapStateToProps = (state) => {
  return {
    app: state.forumApp,
  };
};
export default connect(mapStateToProps, {
  getTopic,
  Reaction,
})(Posts);
