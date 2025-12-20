import "./search.css"
import search from "../../assets/icons/search.svg"

function Search() {
    return (
        <section className="mt-5 w-full">
            <div className="search-wrapper flex justify-center">
                <div className="w-[50%] flex sm:h-12.5 md:h-15 items-center pr-2 justify-between rounded-3xl border-[#a8c4e7] border-2 bg-gray-100 transition-all ease-in-out">
                    <input className="w-[90%] p-2 h-[95%] bg-gray-100 rounded-3xl"
                     type="search"  name="search" placeholder="What are you looking for?" />
                     <img src={search} alt="search" className="h-[80%]"/>
                </div>
                
            </div>
        </section>
    );
}

export default Search;