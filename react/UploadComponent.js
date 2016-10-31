/**
 * Created by hwh on 16/10/28.
 */
import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import styles from '../../css/FindCss.css'
import {fetchProjectData} from '../actions/Actions'
import SlidePage from './ViewComponent/SlidePage'
import {SlideComponent} from './ViewComponent/SlideComponent'

export class UploadComponent extends Component {

    constructor(props){
        super(props)
        this.state={
            files:[],
            uploadHistory:[],
            multiple:true,
            url:'http://localhost:3000/upload',
            lookShow:false
        }
    }

    handleChange(e){
        e.preventDefault();
        let target = e.target;
        let files = target.files;
        console.log('startInput',files);
        let count = this.state.multiple ? files.length : 1;
        for(let i = 0;i < count;i++){
            files[i].url = URL.createObjectURL(files[i]);
        }
        //转换为真正的数组
        files = Array.prototype.slice.call(files,0);
        files = files.filter(file=>{
            return /image/i.test(file.type);
        })
        console.log('files',files);
        this.setState({
            files:this.state.files.concat(files)
        })
    }

    handleDragHover(e){
        e.stopPropagation()
        e.preventDefault()
    }

    handleDrop(e){
        this.handleDragHover(e);
        let files = e.target.files || e.dataTransfer.files;
        let count = this.state.multiple ? files.length : 1;

        for(let i = 0;i < count;i++){
            files[i].url = URL.createObjectURL(files[i]);
        }
        files = Array.prototype.slice.call(files,0);
        files = files.filter(file => {
            return /image/i.test(file.type)
        })
        this.setState({files:this.state.files.concat(files)});
    }

    renderImages(){
        const {files} = this.state
        if (files.length > 0){
            return files.map((item,index)=>{
                return(
                    <div className='selectImagesDiv' key={index}>
                        <div>{item.name}</div>
                        <img src={item.url} style={{width:100,marginLeft:15,height:100}}/>
                    </div>
                )
            })

        }else{
            return false
        }
    }

    watchImageInServer(index){
        this.setState({
            lookShow:true,
            imgIndex:index
        })
    }

    renderUploadInfo(){
        const {uploadHistory} = this.state
        if(uploadHistory.length > 0){
            return uploadHistory.map((item,index)=>{
                return (
                    <div className='uploadHistoryDiv' key={index}>
                        上传成功，图片地址是
                        <div className='uploadUrlDiv'>
                            {item}
                        </div>
                        <button style={{marginLeft:4}} type='button' onClick={()=>this.watchImageInServer(index)}>查看</button>
                    </div>
                )
            })
        }
        return false
    }

    handleUpload(e,hl){

        let formData = new FormData();
        var index = 0;
        for(var item of this.state.files){
            formData.append('filedata' + index,item);
            index ++;
        }
        formData.append('filedata',this.state.files[0])
        //console.log('fileDDD',formData.get('filedata').type);
        $.ajax({
            url:this.state.url,
            data:formData,
            dataType:'json',
            type:'post',
            cache: false,
            contentType: false,
            processData: false,
            success:function(data){
                console.log('data',data);
                if(data.code == 0){
                    hl.setState({
                        uploadHistory:data.result.urls
                    })
                } //$('#submitButton').attr('disabled',false);
            },error:function(err){
                console.log(err);
            }
        });
        //return false;
        //console.log('dom',this.refs.head);
        //$(this.refs.myForm.getDOMNode()).fileupload('add',{url:'http://localhost:3000/upload'});
        //let _promises = this.state.files.map((file, idx) => this.upload(file, idx))
        //Promise.all(_promises).then( (res) => {
        //    // 全部上传完成
        //    console.log('res',res);
        //    //this.handleComplete()
        //}).catch( (err) => { console.log('error',err) })

    }

    handleSuccess(file,url){

    }

    handleDeleteFile(file){

    }

    handleFailure(file,error){

    }

    upload(file,idx){
        return new Promise((resolve,reject)=>{
            let xhr = new XMLHttpRequest()
            if(xhr){
                xhr.onreadystatechange = (e)=>{
                    if(xhr.readyState == 4){
                        if(xhr.status == 200){
                            this.handleSuccess(file,xhr.responseText);
                            this.handleDeleteFile(file);
                            resolve(xhr.responseText);
                        }else{
                            this.handleFailure(file,xhr.responseText);
                            reject(xhr.responseText);
                        }
                    }
                }
                xhr.open('POST',this.state.url,true);
                let form = new FormData();
                form.append('filedata',file);
                console.log('formData',form.getAll('filedata'));
                xhr.send(form);
            }
        })
    }

    render() {
        return(
            <form ref='myForm' action='http://localhost:3000/upload' method='post' encType='multipart/form-data'>
                <div ref='head' className='uploadContainer' style={{backgroundColor:'white'}}>
                    <div className='uploadBox'>
                        <input type='file' onChange={(v)=>this.handleChange(v)} accept='image/*' name='fileSelect' multiple={this.state.multiple}/>
                        <span ref='dragBox' onDragOver={(e)=>this.handleDragHover(e)} onDragLeave={(e)=>this.handleDragHover(e)}
                              onDrop={(e)=>this.handleDrop(e)} className='dragBox'
                            >
                            或将图片拖到此处
                        </span>
                    </div>
                    <div className={this.state.files.length > 0 ? "showImage":"none"}>
                        {this.renderImages()}
                    </div>
                    <div className={this.state.files.length > 0 ? "uploadBtnBox":"none"} onClick>
                        <button type='button' onClick={(e)=>this.handleUpload(e,this)}>确认上传图片</button>
                    </div>
                    <div>
                        {this.state.uploadHistory.length > 0?this.renderUploadInfo():false}
                    </div>

                {this.state.lookShow && this.state.uploadHistory.length > 0?<div className='lookImageBack' onClick={()=>this.setState({lookShow:false})}>
                    <div className='lookImageDiv'></div>
                    <img className={this.state.lookShow && this.state.uploadHistory.length > 0 ? 'lookImage imgScale':'lookImage'} src={this.state.uploadHistory[this.state.imgIndex]}/>
                </div>:false}</div>
            </form>
        )
    }

}
