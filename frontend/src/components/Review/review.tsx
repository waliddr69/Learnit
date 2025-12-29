import "./review.css"

type ReviewProps = {
    username:String,
    content:String
}

function Review({username,content}:ReviewProps){
    return(
        <div className="comment flex gap-3 p-4 bg-[#D3E6FF] rounded-3xl">
                                <div className="reviewer rounded-full shrink-0" style={{width:"55px",height:"55px",backgroundColor:"black"}}></div>
                                <div className="content flex flex-col gap-3">
                                    <p className="font-medium">{username}</p>
                                    <div className="content-text">
                                        {content}
                                    </div>
                                </div>
                            </div>
    )
}

export default Review

