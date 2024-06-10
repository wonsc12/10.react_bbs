import React, { Component, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Board from './Board';
import { Link , useNavigate } from 'react-router-dom';


function BoardList(props){
  const [boardList, setBoardList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [boardId, setBoardId] = useState([]);
  const navigate = useNavigate();

  let getList = () =>{
    Axios.get('http://34.47.83.38:8000/list')
    .then( res => {
      //const data = res.data;
      const {data} = res;
      setBoardList(data);
      setCheckList([]);
      setBoardId(0);
      // this.setState({
      //   boardList:data,
      //   checkList: [],
      //   boardId: 0
      // })
     props.renderComplete(); // 목록 출력 완료
    })
    .catch(function (error) {
      // 에러 핸들링
      console.log(error);
    });
  }
  useEffect(()=>{
    getList();
  },[]) // 최초 한번 실행, 결과가 나오면 실행

  let onCheckboxChange = (checked, id)=>{

    let list = checkList;
  
    if(checked){
      if(list.indexOf(id)=== -1){
        list.push(id);
      }
    }else {
      // id 2, false
      let idx = list.indexOf(id);
      list.splice(idx,1);
    }
    setCheckList(list);
  };

  let handleModify = ()=>{
    let checklist = checkList;
    if(checklist.length === 0  ){
      alert('최소 하나만 체크해주세요')
    }else if (checklist.length > 1){
      alert('하나만 체크해 주세요');
    } else {
      setBoardId(checklist[0]);
      props.handleModify(checklist[0]);
      navigate("/write")
    }

    
  }

  let handleDelete = () => {
    //체크 항목이 없으면 '삭제할 게시글을 선택하세요' 경고창 
    if(checkList.length === 0){
      alert('삭제할 게시글을 선택하세요');
    }
    // let boardIdList = this.state.checkList.join();
    let boardIdList ='';
    checkList.forEach(item=>{
      boardIdList += `'${item}',`;
    });
    console.log(boardIdList);
    Axios.post('http://34.47.83.38:8000/delete',{
      boardIdList : boardIdList.substring(0, boardIdList.length -1)
    })
    .then( res => {
      getList();
     })
    .catch(function (error) {     
      console.log(error);
    });
  };

  useEffect(()=>{
    if(!props.isComplete){
      getList();
    }
  },[props.isComplete])
  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">선택</th>
            <th scope="col">번호</th>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">작성일</th>
          </tr>
        </thead>
        <tbody>
          
          {
            boardList.map(item =>(
              
              <Board key={item.id} data={item} onCheckboxChange={onCheckboxChange}/>
              // <tr>              
              //   <th scope="row">
              //     <input type="checkbox"/>
              //   </th>
              //   <td>{item.id}</td>
              //   <td>{item.title}</td>
              //   <td>{item.user_id}</td>
              //   <td>{item.update_date}</td>
              // </tr>  
 
            ))
            //map return(<tr></tr>)
            
          }

        </tbody>
      </table>
      <div className="d-flex justify-content-between gap-3">
        <div className="d-flex gap-1">
          <Button variant="info" onClick={handleModify}>수정</Button>    
          <Button variant="danger" onClick={handleDelete}>삭제</Button>
        </div>
        <Link to="/write">
          <Button variant="primary">글쓰기</Button>
        </Link>
      </div>
    </>
  ) 
}

export default BoardList;


// export default class BoardList extends Component {
  
//   componentDidMount(){
//     this.getList(); //최초한번 실행, 결과가 나오면 실행
//   }

//   onCheckboxChange = (checked, id)=>{

//     let list = this.state.checkList;
  
//     if(checked){
//       if(list.indexOf(id)=== -1){
//         list.push(id);
//       }
//     }else {
//       // id 2, false
//       let idx = list.indexOf(id);
//       list.splice(idx,1);
//     }
//     this.setState({
//       checkList:list
//     });
//   };

//   handleModify = ()=>{
//     let checkList = this.state.checkList;
//     if(checkList.length === 0  ){
//       alert('최소 하나만 체크해주세요')
//     }else if (checkList.length > 1){
//       alert('하나만 체크해 주세요');
//     } else {
//       this.setState({
//         boardId: checkList[0]
//       });   
//     }
//     this.props.handleModify(checkList[0]);
//   }

//   handleDelete = () => {
//     //체크 항목이 없으면 '삭제할 게시글을 선택하세요' 경고창 
//     if(this.state.checkList.length === 0){
//       alert('삭제할 게시글을 선택하세요');
//     }
//     // let boardIdList = this.state.checkList.join();
//     let boardIdList ='';
//     this.state.checkList.forEach(item=>{
//       boardIdList += `'${item}',`;
//     });
//     console.log(boardIdList);
//     Axios.post('http://34.47.83.38:8000/delete',{
//       boardIdList : boardIdList.substring(0, boardIdList.length -1)
//     })
//     .then( res => {
//     this.getList();
//      })
//     .catch(function (error) {     
//       console.log(error);
//     });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.checkList.length === 1 && this.state.boardId !== prevState.boardId) {
//       this.props.handleModify(this.state.boardId);
//     }
//     if (!this.props.isComplete && prevProps.isComplete !== this.props.isComplete) {
//       this.getList();
 
//     }
//   }

//   render() {
//     console.log(this.state.boardList);
    
//   }
// }

