import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import './Applied.css'
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

class Applied extends Component {
  state = {
    applications: [],
    viewApplication: null,
    editId: null,
    editJobDesc: "",
    editIntState: null,
    jobTtile: "",
    showApplication: null
  };

  editor = null;

  async componentDidMount() {
    let getAppliedJobs = await fetch(
      `/api/applied/getAppliedJobs/${this.props.huntId}`
    );
    getAppliedJobs = await getAppliedJobs.json();
    this.setState({ applications: getAppliedJobs });
    console.log(this.state);
  }

  handleView = async (n) => {
    if (!this.state.viewApplication) {
      this.setState({ viewApplication: this.state.applications[n] });
    } else {
      this.setState({ viewApplication: null });
    }
  };

  descChange = (e, editor) => {
    this.setState({ editJobDesc: editor.getData() });
  };

  handleEdit = async (n) => {
    await this.setState({
      editId: this.state.applications[n]["_id"],
      editJobDesc: this.state.applications[n]["JobDescription"],
      jobTtile: this.state.applications[n]["JobTitle"],
      editIntState: n
    });
  };

  handleDelete = async (n) => {
    try {
      const options = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: this.state.applications[n]["_id"],
          huntId: this.props.huntId,
        }),
      };

      const fetchResponse = await fetch(
        "/api/applied/deleteApplication",
        options
      );
      if (!fetchResponse.ok) {
        console.log(fetchResponse);
      } else {
        console.log(fetchResponse);
        let newInterestArr = this.state.applications;
        newInterestArr.splice(n, 1);
        await this.setState({ applications: newInterestArr });
      }
    } catch (err) {
      console.log(err);
    }
  };


  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: this.state.editId,
          JobDescription: this.state.editJobDesc,
        }),
      };

      const fetchResponse = await fetch("/api/applied/edit", data);
      if (!fetchResponse.ok) {
        console.log(fetchResponse);
        // await this.setState({editId: `Fields can't be empty`, classColor: 'error-message' })
      } else {
        console.log(fetchResponse);
        let newArr = this.state.applications
        // console.log(newArr[])
        newArr[this.state.editIntState]['JobDescription'] = this.state.editJobDesc
        await this.setState({ editId: null,  applications: newArr});
      }
    } catch (err) {
      console.log("Create Interest error", err);
    }
  };
  render() {
    return (
      <>
        {this.state.editId ? (
          <div className="ckBorder">
            <h1 className="job-title">{this.state.jobTtile}</h1>

            <form>
              <div className="form-group spaceOut">
                <label>Job Description: </label>
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
                  data={this.state.editJobDesc}
                  config={
                    {
                      /* the editor configuration */
                    }
                  }
                />
              </div>
              <button
                onClick={this.handleSubmit}
                type="submit"
                class="btn btn-primary spaceOut"
              >
                Submit
              </button>
            </form>
          </div>
        ) : (
        <>
            {!this.state.viewApplication ?
              <div className="appliedContainer row">
            {this.state.applications.map((val, id) => {
              return (
                <div className="applicationsDiv col-lg-4 col-md-6 col-sm-12">
                  <h3> {val.JobTitle}</h3>
                  <br />
                  <p>Date Applied: {val.DateApplied}</p>

                  <div className="text-center spaceOut">
                    <button
                      className="btn btn-danger btn-space"
                      onClick={() => {
                        this.handleDelete(id);
                      }}
                    >
                      Delete
                    </button>

                    <button
                      className="btn btn-primary btn-space"
                      onClick={() => {
                        this.handleEdit(id);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-success btn-space"
                      onClick={() => {
                        this.handleView(id);
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          :
          <div className="viewJobInterest ">
                    <h1 className="job-title">{this.state.viewApplication.JobTitle}</h1>

                    <div className="jobDesc">
                      {ReactHtmlParser(this.state.viewApplication.JobDescription)}
                    </div>

                    <button
                      className="btn btn-success spaceout"
                      onClick={() => {
                        this.handleView();
                      }}
                    >
                      Return To Interest List
                    </button>
                  </div>
              }
              </>
 
        )}
      </>
    );
  }
}

export default Applied;
