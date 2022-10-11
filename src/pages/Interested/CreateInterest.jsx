import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import "./Interested.css";
import { Link } from "react-router-dom";

class CreateInterest extends Component {
  state = {
    JobTitle: "",
    JobDescription: "<p>Type Your Job Description Here</p>",
    userId: this.props.userId,
    error: "",
    classColor: "",
    submitted: false,
  };

  editor = null;

  titleChange = async (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  descChange = (e, editor) => {
    this.setState({ JobDescription: editor.getData() });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const data = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          JobTitle: this.state.JobTitle,
          JobDescription: this.state.JobDescription,
          userId: this.state.userId,
          id: this.props.huntId,
        }),
      };

      const fetchResponse = await fetch("/api/interested/create", data);
      if (!fetchResponse.ok) {
        console.log(fetchResponse);
        await this.setState({
          error: `Fields can't be empty`,
          classColor: "error-message",
        });
      } else {
        console.log(fetchResponse);
        await this.setState({
          error: `Interest Added`,
          classColor: "sucess-message",
          submitted: true,
        });
      }
    } catch (err) {
      console.log("Create Interest error", err);
    }
  };

  render() {
    return (
      <div className="ckBorder">
        <h1>Interested</h1>
        <h2>CKEditor 5 using a custom build - decoupled editor</h2>

        <form>
          <div className="form-group spaceOut">
            <label>Job Title</label>
            <input
              type="text"
              className="form-control"
              name="JobTitle"
              onChange={this.titleChange}
              value={this.state.JobTitle}
              required
            />
          </div>

          <div className="form-group spaceOut">
            <label>Job Description</label>
            <CKEditor
              onReady={(editor) => {
                console.log("Editor is ready to use!", editor);

                // Insert the toolbar before the editable area.
                editor.ui
                  .getEditableElement()
                  .parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement()
                  );

                this.editor = editor;
              }}
              onError={(error, { willEditorRestart }) => {
                // If the editor is restarted, the toolbar element will be created once again.
                // The `onReady` callback will be called again and the new toolbar will be added.
                // This is why you need to remove the older toolbar.
                if (willEditorRestart) {
                  this.editor.ui.view.toolbar.element.remove();
                }
              }}
              onChange={this.descChange}
              editor={DecoupledEditor}
              data={this.state.JobDescription}
              config={
                {
                  /* the editor configuration */
                }
              }
            />
          </div>

          {this.state.submitted ? (
            <div className="spaceOut">
              <Link to="/viewInterests">
                <button className="btn btn-success ">
                  Return To Interest List
                </button>
              </Link>
            </div>
          ) : (
            <div className="spaceOut">
              <button
                onClick={this.handleSubmit}
                type="submit"
                class="btn btn-primary "
              >
                Submit
              </button>
            </div>
          )}
        </form>

        <div className="spaceout">
          <p className={this.state.classColor}>&nbsp;{this.state.error}</p>
        </div>
      </div>
    );
  }
}

export default CreateInterest;
