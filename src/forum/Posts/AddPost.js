import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  Input,
} from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../assets/scss/plugins/extensions/editor.scss";
import { addNewPost } from "../../redux/actions/forum";
import Select from "react-select";
import draftToHtml from "draftjs-to-html";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bold from "../../assets/svgIconsToolbar/bold.svg";
import italic from "../../assets/svgIconsToolbar/italic.svg";
import unordered from "../../assets/svgIconsToolbar/unordered.svg";
import ordered from "../../assets/svgIconsToolbar/ordered.svg";
import indent from "../../assets/svgIconsToolbar/indent.svg";
import outdent from "../../assets/svgIconsToolbar/outdent.svg";
import link from "../../assets/svgIconsToolbar/link.svg";
import unlink from "../../assets/svgIconsToolbar/unlink.svg";
import undo from "../../assets/svgIconsToolbar/undo.svg";
import redo from "../../assets/svgIconsToolbar/redo.svg";
import code from "../../assets/svgIconsToolbar/code.svg";
import { history } from "../../history";

class AddPost extends Component {
  state = {
    categories: [],
    editorState: EditorState.createEmpty(),
    cats: null,
    title: "",
    catsErr: false,
    alert: true,
  };
  componentDidMount() {
    axios.get(`/api/categories`).then((response) => {
      this.setState({
        categories: response.data.all_categories,
      });
    });
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState: editorState,
    });
  };
  onSelectChange = (value) => {
    this.setState({ cats: value });
  };

  onInputChange = (value) => {
    this.setState({
      title: value.target.value,
    });
  };

  Submit = () => {
    if (this.state.title === null || this.state.title.trim().length === 0) {
      toast.error("Title is null", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (this.state.cats === null || this.state.cats.length === 0) {
      toast.error("Categories is null", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (
      this.state.editorState.getCurrentContent().getPlainText().trim()
        .length === 0
    ) {
      toast.error("Body is null", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const categories = this.state.cats.map((item) => item.value + 1);
    const content = draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
    const NewPost = {
      title: this.state.title,
      content: content,
      categories_id: categories,
    };
    this.props.addNewPost(NewPost);
    history.push("/");
  };

  render() {
    const { categories, editorState } = this.state;
    const Categories = categories.map((item, id) => {
      return { label: item, value: id };
    });

    return (
      <React.Fragment>
        <Card
          className={"animated fadeInUp faster col-sm-12 col-md-8 offset-md-2"}
        >
          <CardSubtitle>
            <CardHeader>
              Title
              <small>
                Be specific and imagine you’re asking a question to another
                person
              </small>
            </CardHeader>
          </CardSubtitle>
          <CardBody>
            <Input onChange={this.onInputChange} />
          </CardBody>
          <CardSubtitle>
            <CardHeader>
              Categories
              <small>
                Select categories to describe what your question is about
              </small>
            </CardHeader>
          </CardSubtitle>
          <CardBody>
            <Select
              isMulti
              name="colors"
              options={Categories}
              className="React"
              onChange={this.onSelectChange}
              classNamePrefix="select"
            />
          </CardBody>
          <CardSubtitle>
            <CardHeader>
              Body
              <small>
                Include all the information someone would need to answer your
                question
              </small>
            </CardHeader>
          </CardSubtitle>
          <CardBody>
            <Editor
              toolbarClassName="demo-toolbar-absolute"
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
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
          </CardBody>
        </Card>
        <Button
          color={"primary"}
          className={"animated fadeInUp faster col-sm-12 col-md-3 offset-md-7"}
          onClick={this.Submit}
        >
          Post your question
        </Button>

        <ToastContainer />
      </React.Fragment>
    );
  }
}

export default connect(null, {
  addNewPost,
})(AddPost);
