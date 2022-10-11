import React, { Component } from "react";
import "./Applied.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { Link } from "react-router-dom";

class CreateApplication extends Component {
  state = {
    JobTitle: "",
    JobDescription: "<p>Type Your Job Description Here</p>",
    DateApplied: "",
    userId: this.props.userId,
    CompanyName: "",
    link: "",
    error: "",
    classColor: "",
    submitted: false
  };

  editor = null;

  handleChange = (e) => {
    const { name, value } = e.target;

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
          DateApplied: this.state.DateApplied,
          userId: this.state.userId,
          id: this.props.huntId,
          CompanyName: this.state.CompanyName,
          link: this.state.link,
        }),
      };

      const fetchResponse = await fetch("/api/applied/create", data);
      if (!fetchResponse.ok) {
        console.log(fetchResponse);
        await this.setState({
          error: `Fields can't be empty`,
          classColor: "error-message",
        });
      } else {
        console.log(fetchResponse);
        await this.setState({
          error: `Added`,
          classColor: "sucess-message",
          submitted: true,
        });
      }
    } catch (err) {
      console.log("Create Interview error", err);
    }
  };

  render() {
    return (
      <div className="appliedDiv">
        <h1> Applied For This Job: </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group spaceOut">
            <label>Company Name: </label>
            <input
              type="text"
              className="form-control"
              name="CompanyName"
              value={this.state.CompanyName}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group spaceOut">
            <label>Job Title: </label>
            <input
              type="text"
              className="form-control"
              name="JobTitle"
              value={this.state.JobTitle}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group spaceOut">
            <label>Job Description:</label>
            {/* <input
              type="text"
              className="form-control"
              name="JobDescription"
              value={this.state.JobDescription}
              onChange={this.handleChange}
              required
              /> */}
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
          <div className="form-group spaceOut">
            <label>Date Applied</label>
            <input
              type="date"
              className="form-control"
              name="DateApplied"
              value={this.state.DateApplied}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group spaceOut">
            <label>Paste Job Link Here: </label>
            <input
              type="text"
              className="form-control"
              name="link"
              value={this.state.link}
              onChange={this.handleChange}
              required
            />
          </div>

          {this.state.submitted ? (
            <div className="spaceOut">
              <Link to="/viewApplications">
                <button className="btn btn-success ">
                  Return To Appplied List
                </button>
              </Link>
            </div>
          ) : (
            <div className="spaceOut">
              <button
                type="submit"
                class="btn btn-primary "
              >
                Submit
              </button>
            </div>
          )}

        </form>
        <div className="spaceout text-center">
          <p className={this.state.classColor}>&nbsp;{this.state.error}</p>
        </div>
      </div>
    );
  }
}

export default CreateApplication;
