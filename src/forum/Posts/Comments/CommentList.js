import React from "react";
import { connect } from "react-redux";
import { addNewComment, getComments } from "../../../redux/actions/comments";
import { Button } from "reactstrap";
import bold from "../../../assets/svgIconsToolbar/bold.svg";
import italic from "../../../assets/svgIconsToolbar/italic.svg";
import code from "../../../assets/svgIconsToolbar/code.svg";
import unordered from "../../../assets/svgIconsToolbar/unordered.svg";
import ordered from "../../../assets/svgIconsToolbar/ordered.svg";
import indent from "../../../assets/svgIconsToolbar/indent.svg";
import outdent from "../../../assets/svgIconsToolbar/outdent.svg";
import link from "../../../assets/svgIconsToolbar/link.svg";
import unlink from "../../../assets/svgIconsToolbar/unlink.svg";
import undo from "../../../assets/svgIconsToolbar/undo.svg";
import redo from "../../../assets/svgIconsToolbar/redo.svg";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../../assets/scss/plugins/extensions/editor.scss";
import draftToHtml from "draftjs-to-html";
import { ThumbsDown, ThumbsUp } from "react-feather";
import { Reaction } from "../../../redux/actions/forum/index";
import ReactHtmlParser from "react-html-parser";

class CommentList extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.comments.comments.routeParam !== state.currentLocation) {
      return {
        comments: props.comments.comments.comments,
      };
    }
    return null;
  }
  state = {
    comments: null,
    parsed: false,
    editorState: EditorState.createEmpty(),
    newComment: {
      post_id: this.props.postId,
      content: "",
    },
  };
  async componentDidMount() {
    await this.props.getComments(this.props.postId);
    this.setState({
      comments: this.props.comments.comments.comments,
      parsed: true,
    });
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState: editorState,
      newComment: {
        ...this.state.newComment,
        content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      },
    });
  };

  render() {
    const { comments, editorState } = this.state;
    console.log("coments", this.state.comments);
    let renderComments =
      this.state.parsed && this.state.comments !== null ? (
        comments.map((comment, i) => (
          <div
            key={i}
            className="d-flex justify-content-start align-items-center mb-1"
          >
            <div className="comment-info col-sm-10 pl-1 ">
              <h6 className="mb-1 ">{comment.author.nickname}</h6>
              <span className="font-small-2 ">
                {ReactHtmlParser(comment.content)}
              </span>
            </div>
            <div className="ml-auto cursor-pointer">
              <span
                style={{ color: comment.user_reaction === 1 ? "#7367f0" : "" }}
                onClick={() =>
                  this.props.Reaction(
                    {
                      type: 1,
                      post_id: 0,
                      comment_id: comment.id,
                    },
                    this.props.postId
                  )
                }
                className="mr-75"
              >
                <ThumbsUp size={15} className="mr-25" />
                {comment.likes}
              </span>
              <span
                className="mr-50"
                style={{ color: comment.user_reaction === 0 ? "#7367f0" : "" }}
                onClick={() => {
                  this.props.Reaction(
                    {
                      type: 0,
                      post_id: 0,
                      comment_id: comment.id,
                    },
                    this.props.postId
                  );
                }}
              >
                <ThumbsDown className="mr-25" size={15} />
                {comment.dislikes}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="p-1 text-center mt-2 font-medium-3 text-bold-500">
          No comments at this time
        </p>
      );

    return (
      <React.Fragment>
        {renderComments}
        <fieldset className="form-label-group mb-50">
          <Editor
            toolbarClassName="demo-toolbar-absolute"
            wrapperClassName="demo-wrapper"
            editorClassName="comment-editor"
            editorState={editorState}
            toolbar={{
              options: ["inline", "blockType", "list", "link", "history"],
              inline: {
                options: ["bold", "italic", "monospace"],
                bold: { icon: bold },
                italic: { icon: italic },
                monospace: { icon: code, title: "Code" },
              },
              blockType: {
                options: ["Normal", "Blockquote", "Code"],
              },
              list: {
                options: ["unordered", "ordered", "indent", "outdent"],
                unordered: { icon: unordered, className: undefined },
                ordered: { icon: ordered, className: undefined },
                indent: { icon: indent, className: undefined },
                outdent: { icon: outdent, className: undefined },
              },
              link: {
                options: ["link", "unlink"],
                link: { icon: link, className: undefined },
                unlink: { icon: unlink, className: undefined },
              },
              history: {
                options: ["undo", "redo"],
                undo: { icon: undo, className: undefined },
                redo: { icon: redo, className: undefined },
              },
            }}
            onEditorStateChange={this.onEditorStateChange}
          />
        </fieldset>
        <Button
          size="sm"
          color="primary"
          onClick={() => {
            this.props.addNewComment(this.state.newComment);
            this.setState({
              newComment: {
                post_id: this.props.postId,
                content: "",
              },
            });
          }}
          disabled={
            this.state.editorState.getCurrentContent().getPlainText().trim()
              .length === 0
          }
        >
          Post Comment
        </Button>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    comments: state.comments,
  };
};

export default connect(mapStateToProps, {
  addNewComment,
  Reaction,
  getComments,
})(CommentList);
