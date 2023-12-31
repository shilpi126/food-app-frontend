import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Styles/planDetail.css'
import '../Styles/contact.css'
import AuthProvider, { useAuth } from '../context/AuthProvider';

function PlanDetail() {
    const [plan, setplan] = useState([])
    
    let { id } = useParams();
    const [arr, setarr] = useState();
    const [review, setreview] = useState("");
    const [rate, setrate] = useState();
    const { user } = useAuth();
    console.log("====>",id);
    const navigate = useNavigate()
    
    
    

    async function detail(){
    
      
        console.log("inside detail");

        const data = await axios.get(`/plan/plan/${id}`);
        console.log(data);

        setplan(data.data.data)
        delete data.data.data["_id"]
        delete data.data.data["__v"]
        
        const reviews = await axios.get(`/review/${id}`);
        // console.log(reviews);
        // console.log(reviews.data.data);
        setarr(reviews.data.data)
        // console.log(arr);
        
        
    }

    useEffect(() => {
        // console.log("inside use effect");
        
        if(user?.userDetails){
            detail()

        }else{
            // console.log("please login");
            
            alert("please login")
            navigate("/login")

        }
        
        
    },[])

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    

    const handleClick = async () => {
        // console.log(123645);
        
        const data = await axios.post(`/review/crud/${id}`, {
            "review": review,
            "rating": rate,
            "user": user?.userDetails?._id,
            "plan": id
        })
        // console.log("=======>",data);
        
        const reviews = await axios.get("/review/" + id);
        
        setarr(reviews.data.data);
        setrate("")
        setreview("")
        
    }
    
    
    const handleDelete = async(reviewId) =>{
        try{
        
            console.log("12345",reviewId);
            let data = await axios.delete("/review/crud/"+id, { data: { "id": reviewId } });
            console.log(data.config.data);
            const reviews = await axios.get("/review/" + id);
            console.log(reviews);
            setarr(reviews.data.data);
            alert("review deleted");
        }
        catch(err){
            alert(err);
        }
    }
    
    return (
    <div>
        <div className="pDetailBox">
            <div className='h1Box'>
                <h1 className='h1'>PLAN DETAILS</h1>
                <div className="line"></div>
            </div>
            <div className="planDetailBox">
                <div className='planDetail'>
                    <div className="loginBox">
                        {
                            Object.keys(plan).map((ele, key) => (
                                <div className='entryBox' key={key}>
                                    <div className="entryText">{capitalizeFirstLetter(ele)}</div>
                                    <div className=" input">{capitalizeFirstLetter(plan[ele].toString())}</div>
                                </div>
                            ))
                        }
                    </div>
                
                </div>
            </div>
        </div>


        <div className='reviewBox'>
                <div className="reviewEnrty">
                    <input type="text" value={review} onChange={(e) => setreview(e.target.value)} style={{border:"2px solid gray"}} />
                    <select name="" id="" className="select" onChange={(e) => { setrate(e.target.value) }}>
                        <option value="5">5 Excellent</option>
                        <option value="4">4 Very Good</option>
                        <option value="3">3 Good</option>
                        <option value="2">2 Poor</option>
                        <option value="1">1 Very Poor</option>
                    </select>
                    <button className="btn" onClick={handleClick}>
                        Submit
                    </button>
                </div>
                {
                    arr && arr?.map((ele, key) => (
                        <div className="reviewsCard" key={key}>
                            <div className="pdreviews">
                                <div className="pdrdetail">
                                    <h3>{ele.user.name}</h3>
                                    <div className="input"> {ele.review}</div>
                                </div>
                                <div className='rate'>
                                    {
                                        <label htmlFor="star5" title="text">{ele.rating}</label>
                                        
                                    }
                                </div>
                            </div>
                            
                            <div className='rcBtn'>
                                <button className="showMoreBtn btn" onClick={()=>{handleDelete(ele._id)}}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            
            </div>
        
    
    </div>
    )
}

export default PlanDetail