import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import { Link ,  useNavigate } from 'react-router-dom';


function Write({boardId, handleCancel, isModifyMode}){
  const[form, setForm] = useState({
    title: '',
    content:''
  })
  const navigate = useNavigate();

  let write = () =>{
    Axios.post('http://localhost:8000/insert',{
      title: form.title,
      content: form.content
    })
    .then( res => {
     alert('등록 완료');
     navigate("/")
    })
    .catch(function (error) {     
      console.log(error);
    });
  }

  let update = () =>{
    Axios.post('http://localhost:8000/update',{
      id:boardId,
      title: form.title,
      content: form.content
    })
    .then( res => {
     alert('수정 완료');
     navigate("/")
     
     setForm({
      title: '',
      content:''
     })
     handleCancel();
    })
    .catch(function (error) {     
      console.log(error);
    });
  }

  let detail = () =>{
    Axios.get(`http://localhost:8000/detail?id=${boardId}`)
    .then( res => {
      if(res.data.length > 0){
        setForm({
          title:res.data[0].title,
          content:res.data[0].content,
        })
      }
    })
    .catch(function (error) {     
      console.log(error);
    });
  }
  useEffect(()=>{
    if(isModifyMode && boardId){
      detail();
    }
  },[isModifyMode, boardId])

  let inputHandler =(e)=> {
    if(e.target.name === 'title'){
      setForm({...form, title:e.target.value})
    }else {
      setForm({...form, content:e.target.value})
    }
  }
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>제목</Form.Label>
          <Form.Control 
            type="text" 
            name="title"
            placeholder="제목을 입력하세요" 
            onChange={inputHandler}
            value={form.title}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>내용</Form.Label>
          <Form.Control 
            as="textarea" 
            name="content"
            rows={3}
            onChange={inputHandler}
            value={form.content}
           />
        </Form.Group>
      </Form>
      <div className='d-flex gap-1'>
        <Button variant="info" onClick={
          isModifyMode ? update : write
        }>작성완료</Button> 
        <Link to="/">
        <Button variant="secondary" onClick={handleCancel}>취소</Button>
        </Link>          
      </div>
    </>
  )

}
export default Write;

// export default class Write extends Component {
//   state = {
//     title: '',
//     content:''
//   }

//   write = () =>{
//     Axios.post('http://localhost:8000/insert',{
//       title: this.state.title,
//       content: this.state.content
//     })
//     .then( res => {
//      alert('등록 완료');
//     })
//     .catch(function (error) {     
//       console.log(error);
//     });
//   }

//   update = () =>{
//     Axios.post('http://localhost:8000/update',{
//       id:this.props.boardId,
//       title: this.state.title,
//       content: this.state.content
//     })
//     .then( res => {
//      alert('수정 완료');
//      this.setState({
//       title:'',
//       content:''
//      })
//      this.props.handleCancel();
//     })
//     .catch(function (error) {     
//       console.log(error);
//     });
//   }
  
//   detail = () =>{
//     Axios.get(`http://localhost:8000/detail?id=${this.props.boardId}`)
//     .then( res => {
//       if(res.data.length > 0){
//         this.setState({
//           title:res.data[0].title,
//           content:res.data[0].content,
//         })
//       }
//     })
//     .catch(function (error) {     
//       console.log(error);
//     });
//   }

//   componentDidUpdate = (prevProps)=>{
//     if(this.props.isModifyMode && this.props.boardId !== prevProps.boardId){
//       this.detail();
//     }
//   }
//   componentDidMount = ()=>{
//     this.detail();
//   }

//   inputHandler =(e)=> {
//     this.setState({
//       [e.target.name]:e.target.value
//     })
//   }

//   render() {    
//     return (
//         <>
//           <Form>
//             <Form.Group className="mb-3" controlId="title">
//               <Form.Label>제목</Form.Label>
//               <Form.Control 
//                 type="text" 
//                 name="title"
//                 placeholder="제목을 입력하세요" 
//                 onChange={this.inputHandler}
//                 value={this.state.title}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="content">
//               <Form.Label>내용</Form.Label>
//               <Form.Control 
//                 as="textarea" 
//                 name="content"
//                 rows={3}
//                 onChange={this.inputHandler}
//                 value={this.state.content}
//                />
//             </Form.Group>
//           </Form>
//           <div className='d-flex gap-1'>
//             <Button variant="info" onClick={
//               this.props.isModifyMode ? this.update : this.write
//             }>작성완료</Button> 
//             <Link to="/">
//             <Button variant="secondary">취소</Button>
//             </Link>          
//           </div>
//         </>
//     )
//   }
// }
