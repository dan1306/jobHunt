import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

let ourEditor = null
class Interested extends Component {

    render() {
      return (
          <div >
              <h1> Interested
              </h1>
              <h2>CKEditor 5 using a custom build - decoupled editor</h2>
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

            ourEditor = editor;
          }}
          onError={({ willEditorRestart }) => {
            // If the editor is restarted, the toolbar element will be created once again.
            // The `onReady` callback will be called again and the new toolbar will be added.
            // This is why you need to remove the older toolbar.
            if (willEditorRestart) {
              ourEditor.ui.view.toolbar.element.remove();
            }
          }}
          onChange={(event, editor) => console.log({ event, editor })}
          editor={DecoupledEditor}
          data="<p>Hello from CKEditor 5's decoupled editor!</p>"
          config={
            {
              /* the editor configuration */
            }
          }
        />
        </div> 
      );
    }
  }
  
  export default Interested;