import axios from "axios";
import React, { useEffect, useState } from "react";

const DisplayBlog = () => {

    const [Blogid,setBlogid] = useState('')
    const [Blogtype,setBlogtype] = useState('')
    const [Blog,setBlog] = useState('')
    const [Decription,setDecription] = useState('')
    const [Created,setCreated] = useState('')
    const [mydata, setdata] = useState([])

    useEffect(() => {
        loaddata()
    }, [])

    const collectAndSend = async() => {
        if (Blogtype!=="" && Blog!=="" && Decription!=="" && Created!=="") {

            try {
                const data = await axios.post("http://localhost:4000/insertBlog",{Blogtype,Blog,Decription,Created})
                if (data) {
                    alert("data inserted")
                  
                }else{
                    alert("data not inserted")
                }  
            } catch (error) {
                alert(error)
            }
            
        }else{
            alert("Fill All Blank Fields (Id not require for insertion)")
        }
    }

    const collectAndUpdate = async() => {
        if (Blogid!=="" && Blogtype!=="" && Blog!=="" && Decription!=="" && Created!=="") {
      
            try {
                const data = await axios.post("http://localhost:4000/updateBlog",{Blogid,Blogtype,Blog,Decription,Created})
                if (data.data.msg) {
                    alert("data Updated")
                    console.table(JSON.stringify(data)) 
                }else{
                    alert("data not Updated")
                }  
            } catch (error) {
                alert(error)
            }
            
        }else{
            alert("Fill All Blank Fields")
        }
    }

    // const collectAndDelete = async() => {
    //     if (Blogid!=="") {
        
    //         try {
    //             const data = await axios.post("http://localhost:4000/DeleteBlog",{Blogid})
    //             if (data.data.msg) {
    //                 alert("data Deleted")
    //                 console.table(JSON.stringify(data)) 
    //             }else{
    //                 alert("data not Deleted")
    //             }  
    //         } catch (error) {
    //             alert(error)
    //         }
            
    //     }else{
    //         alert("Require Id for delete")
    //     }
    // }

    const collectAndDelete = async(id) => {
            try {
                const data = await axios.post("http://localhost:4000/DeleteBlog",{id})
                if (data.data.msg) {
                    alert("data Deleted")
                    console.table(JSON.stringify(data)) 
                }else{
                    alert("data not Deleted")
                }  
            } catch (error) {
                alert(error)
            }
    }

    const clearForm = () => {
        setBlogid('')
        setBlogtype('')
        setBlog('')
        setDecription('')
        setCreated('')
    }

    const loaddata = async () => {
        try {
            const res = await axios.get("http://localhost:4000/getblog");
            setdata(res.data)
            console.log(res)
            localStorage.setItem("blog", JSON.stringify(res.data))
        } catch (error) {
            console.log("error: " + error)
        }
    }

    const showdata = mydata.map((d) => {
        return (
            <tr>
                {/* <td> {d._id} </td> */}
                <td> {d.Blogtype} </td>
                <td> {d.Blog} </td>
                <td> {d.Decription} </td>
                <td> {d.Created} </td>
                <td> <button onClick={(e) => editme({ d })}> Edit </button> </td>
                <td> <button onClick={(e) => deleteme({ d })}> Delete </button> </td>
            </tr>
        )
    });

    const editme = (data) => {
        console.log("edit me: " + JSON.stringify(data))
       
        setBlogid(data.d._id)
        setBlogtype(data.d.Blogtype)
        setBlog(data.d.Blog)
        setDecription(data.d.Decription)
        setCreated(data.d.Created)
    }

    const deleteme = (data) => {
        //console.log("delete me: " + JSON.stringify(data))
        //setBlogid(data.d._id)
        // collectAndDelete()
        collectAndDelete(data.d._id)
    }


    return (
        <>
            <>
                <h1 align="center"> Blog Management </h1>

                <table align="center">
                <tr>
                        <td> Blogid </td>
                        <td> <input type="text" value={Blogid} onChange={(e) => setBlogid(e.target.value)} /> </td>
                    </tr>
                    <tr>
                        <td> Blogtype </td>
                        <td> <input type="text" value={Blogtype} onChange={(e) => setBlogtype(e.target.value)} /> </td>
                    </tr>
                    <tr>
                        <td> Blog </td>
                        <td> <input type="text" value={Blog} onChange={(e) => setBlog(e.target.value)} /> </td>
                    </tr>
                    <tr>
                        <td> Blog Decription </td>
                        <td> <input type="text" value={Decription} onChange={(e) => setDecription(e.target.value)} /> </td>
                    </tr>
                    <tr>
                        <td> Created By </td>
                        <td> <input type="text" value={Created} onChange={(e) => setCreated(e.target.value)} /> </td>
                    </tr>
                </table>
                <table align="center"> 
                <tr>
                        <td> <br></br> <button onClick={collectAndSend}> Insert Blog </button> </td>
                        <td> <br></br> <button onClick={collectAndUpdate}> Update Blog </button> </td>
                        {/* <td> <br></br> <button onClick={collectAndDelete}> Delete Blog </button> </td> */}
                        <td> <br></br> <button onClick={clearForm}> Clear Form </button> </td>
                        <td> <br></br> <button onClick={loaddata} align="center"> Refresh Table </button> </td>
                    </tr>
                </table><br></br>
            </>
            <table border={1} align="center">
                <thead>
                    {/* <td> Id </td> */}
                    <td> Blog Type </td>
                    <td> Blog </td>
                    <td> Blog Description </td>
                    <td> Created By </td>
                    <td> Edit </td>
                    <td> Delete </td>
                </thead>
                {showdata}
            </table>
        </>
    )
}

export default DisplayBlog