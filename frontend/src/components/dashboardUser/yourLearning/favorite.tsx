import UserCard from "../../userCard/userCard";

function Favorite(){
    return(
        <div className="favorite p-4 ">
            <h3 className="font-bold text-2xl mb-4">Favorite</h3>
            
            <div className="overflow-x-auto flex gap-4" style={{scrollbarWidth:"none"}}>
                <UserCard isfavorite={true}/>
                <UserCard isfavorite={true}/>
                <UserCard isfavorite={true}/>  
            </div>
        </div>
    )
}

export default Favorite