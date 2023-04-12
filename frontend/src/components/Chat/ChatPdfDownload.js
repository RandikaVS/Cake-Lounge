import React,{Component} from "react";
import jsPDF from'jspdf'
import pdf from 'react-to-pdf'
import Button from '@mui/material/Button';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { ChatState} from '../../Context/ChatProvider'
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
  getSender
} from "../../config/chatLogics";
import { useState } from "react";
import { useEffect } from "react";


// const { setPdfMessage,pdfMessage } =
//     ChatState();
//  class PDFFile extends React.Component{

    

//     constructor(props) {
//         super(props)
//         this.state ={}
//     };

//     jsPDFGenarator = ()=>{

//         var doc = new jsPDF('p','pt');

//         doc.text(20,20,'This is default text');

//         doc.setFont('courier');

//         doc.text(20,30,'pdfMessage');

//         doc.save("genarated.pdf");
//     }

//     render(){

//         return(
//             <Button variant="contained" startIcon={<DownloadForOfflineIcon/>} style={{marginLeft:'250px'}} onClick={this.jsPDFGenarator}>
//                  Download Chat
//              </Button>
//         )
//     }

// }

// export default PDFFile;

const PDFFile =()=>{

    const userData = (JSON.parse(localStorage.getItem("userInfo")));
    const { setPdfMessage,pdfMessage,user,selectedChat } =ChatState();
    let x=60;
    const [messageLength,setMessageLength]=useState();

    useEffect(() => {
     setMessageLength(pdfMessage.length);
     console.log("Message length",messageLength);
    }, [])
    
        


        const jsPDFGenarator = ()=>{

    
        var doc = new jsPDF('p','pt');

        doc.text(200,20,getSender(userData._id, selectedChat.users))


        for(let i=0;i<messageLength;i+=1){

            if(pdfMessage[i].sender._id!==userData._id){
                doc.text(20,x,pdfMessage[i].content)
            }else{
                doc.text(400,x,pdfMessage[i].content)
            }
            x=x+30;
        }

        doc.save("genarated.pdf");

        

}

    return(
        <>
            <Button variant="contained" startIcon={<DownloadForOfflineIcon/>} style={{marginLeft:'250px'}} onClick={jsPDFGenarator}>
                Download Chat
            </Button>
        </>
    )
};

export default PDFFile;