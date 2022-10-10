import React, { Component } from 'react';
import './Interested.css'
import { Route, Routes, Navigate } from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Link } from "react-router-dom";






class ViewInterests extends Component {

    state = {

        interestedJobs: [],
        editId: null,
        editJobDesc: '',
        jobTtile: '',
        viewInterest: null

    }

    editor = null
   
    async componentDidMount() {
        let getInterest = await fetch('/api/interested/getInterests')
        getInterest = await getInterest.json()
        this.setState({interestedJobs: getInterest, editId: null })
    }



    handleDelete = async (n) => {

        try {
            const options = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: this.state.interestedJobs[n]['_id']
                })
            }
            
            const fetchResponse = await fetch('/api/interested/deleteInterest', options)
            if (!fetchResponse.ok) {
                console.log(fetchResponse)
           
            } else {
                console.log(fetchResponse)
                let getInterest = await fetch('/api/interested/getInterests')
                getInterest = await getInterest.json()
                this.setState({interestedJobs: getInterest})

            }
            
            
        }
        catch (err) {
            
        }
       

        
    }

    handleEdit = async (n) => {


        await this.setState({
            editId: this.state.interestedJobs[n]['_id'],
            editJobDesc: this.state.interestedJobs[n]["JobDescription"],
            jobTtile: this.state.interestedJobs[n]["JobTitle"]
        })
       
        
    }

    descChange = (e, editor) => {
        this.setState({editJobDesc: editor.getData()})
    }

    handleSubmit = async (e) => {

        e.preventDefault()
        try {
            const data = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: this.state.editId, 
                    JobDescription: this.state.editJobDesc, 
                })
    
            }
    
            const fetchResponse = await fetch('/api/interested/editJobDesc', data)
            if (!fetchResponse.ok) {
                console.log(fetchResponse)
                // await this.setState({editId: `Fields can't be empty`, classColor: 'error-message' })
            } else {
                let getInterest = await fetch('/api/interested/getInterests')
                getInterest = await getInterest.json()
                this.setState({interestedJobs: getInterest, editId: null })
                console.log(fetchResponse)
                await this.setState({ editId: null })
            }
            
    
        } catch (err){
            console.log("Create Interest error", err)
        }

    }

    handleView = async (n) => {

        if (!this.state.viewInterest) {
            this.setState({viewInterest: this.state.interestedJobs[n]})

        } else {
            this.setState({viewInterest: null})

        }



    }

    

    render() {
        return (
            <>
                {
                    this.state.editId ?
                        <div className='ckBorder'>
                        
                        <h1>{this.state.jobTtile}</h1>
                        
                        <form>
                            <div className="form-group spaceOut">
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
                                        data={this.state.editJobDesc}
                                        config={{/* the editor configuration */ }}
                                        
                                    />
                                </div>
                                <button onClick={this.handleSubmit} type="submit" class="btn btn-primary spaceOut">Submit</button>
                            </form>
                        </div>
                        :
                        <div>
                            {
                                <>
                                    {
                                        !this.state.viewInterest ?
                                        this.state.interestedJobs.map((val, id) => {
                                            return (
                                                <div className='interestdivs'>
                                                    <h1>
                                                        {val.JobTitle}
                                                    </h1>
                                                    <div dangerouslySetInnerHTML={{ __html: val.JobDescription }} />
                                    

                                                    <button className='btn btn-danger spaceout' onClick={() => {
                                                        this.handleDelete(id)
                                                        
                                                    }}>
                                                        Delete
                                                    </button>
                                                    <button className='btn btn-primary spaceout' onClick={() => {
                                                        this.handleEdit(id)
                                                        
                                                    }}>
                                                        edit
                                                    </button>

                                                    <button className='btn btn-success spaceout' onClick={() => {
                                                        this.handleView(id)
                                                        
                                                    }}>
                                                        view
                                                    </button>
                                            
                                        
                                                    </div>


                                                )
                                        }) :
                                            <div className='interestdivs'>
                                                
                                                <h1>
                                                    {this.state.viewInterest.JobTitle}
                                                </h1>

                                                <div>
                                                    { ReactHtmlParser(this.state.viewInterest.JobDescription) }
                                                </div>

                                                <button className='btn btn-success spaceout' onClick={() => {
                                                        this.handleView()
                                                        
                                                    }}>
                                                    Return To Interest List
                                                    
                                                    </button>

                                            </div>
                                    }
                                </>
                 
                            } 
                            </div>            
                }
                


  
            </>
        )
    }

} 



export default ViewInterests;