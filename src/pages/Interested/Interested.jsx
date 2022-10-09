import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import './Interested.css'
import { useNavigate } from 'react-router-dom';


class Interested extends Component {

    state = {
        JobTitle: '',
        JobDescription: '',
        userId: this.props.userId
    };

    editor = null

    navigateToSummary = async (e) => {

        e.preventDefault()

        let navigate = useNavigate()

        navigate('/summary')

        
        
    }
    
    
    
  

    titleChange = async (event) => {
        const { name, value } = event.target
        this.setState({[name]: value})
    }

    descChange = (e, editor) => {
        this.setState({fieldTxt: editor.getData()})
    }

    handleSubmit= async (evt) => {
        evt.preventDefault();

        const data = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                JobTitle: this.state.JobTitle, 
                JobDescription: this.state.JobDescription, 
                userId: this.state.userId 
            })

        }

        const fetchResponse = await fetch('/api/users/signup', data)
        

    }

    render() {
      return (
          <div className ='ckBorder'>
              <h1> Interested
              </h1>
              <h2>CKEditor 5 using a custom build - decoupled editor</h2>

              <form>
                    <div class="form-group spaceOut">
                        <label >Job Title</label>
                        <input type="text" class="form-control" name='JobTitle' onChange={this.titleChange} required/>
                    </div>
                    
                    <div class="form-group spaceOut">
                        <label >Job Description</label>
                        <CKEditor
                
                            onReady={ editor => {
                                console.log( 'Editor is ready to use!', editor );

                                // Insert the toolbar before the editable area.
                                editor.ui.getEditableElement().parentElement.insertBefore(
                                    editor.ui.view.toolbar.element,
                                    editor.ui.getEditableElement()
                                );

                                this.editor = editor;
                            } }
                            onError={ ( error, { willEditorRestart } ) => {
                                // If the editor is restarted, the toolbar element will be created once again.
                                // The `onReady` callback will be called again and the new toolbar will be added.
                                // This is why you need to remove the older toolbar.
                                if ( willEditorRestart ) {
                                    this.editor.ui.view.toolbar.element.remove();
                                }
                            } }
                            onChange={ this.descChange  }
                            editor={ DecoupledEditor }
                            data="<p>Type Your Job Description Here</p>"
                            config={{/* the editor configuration */ }}
                            
                            />
                    </div>
  
                    <button onClick={this.navigateToSummary} type="submit" class="btn btn-primary spaceOut">Submit</button>
             </form>
            



              <div>
                { ReactHtmlParser(this.state.JobDescription) }
              </div>
            </div>
      );
    }
  }
  
  export default Interested;