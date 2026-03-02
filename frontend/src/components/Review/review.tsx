import "./review.css"

type ReviewProps = {
    username:String,
    content:String,
    photo?:string,
    initials:string
}

function Review({username,content,photo,initials}:ReviewProps){
    return(
        <div className="comment flex gap-3 p-4 bg-[#D3E6FF] rounded-3xl">
                                <div className="reviewer rounded-full font-bold text-white shrink-0" style={{width:"55px",height:"55px",backgroundImage: photo?`url(${import.meta.env.VITE_API_FILE_URL}/${photo})`:undefined}}>
                                    {!photo && initials}
                                </div>
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

