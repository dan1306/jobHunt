import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

let ourEditor = null
class Interested extends Component {

    state = {
        fieldTxt: '',
      };
    


    handleChange = async (event, editor) => {
        this.setState({fieldTxt: editor.getData()})
    }

    render() {
      return (
          <div >
              <h1> Interested
              </h1>
              <h2>CKEditor 5 using a custom build - decoupled editor</h2>
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
                  onChange={ this.handleChange  }
                  editor={ DecoupledEditor }
                  data="<p>Hello from CKEditor 5's decoupled editor!</p>"
                  config={ {/* the editor configuration */ }}
              />

              <div>
              { ReactHtmlParser(this.state.fieldTxt) }
              </div>
              </div>
      );
    }
  }
  
  export default Interested;