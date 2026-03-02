import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 

ModuleRegistry.registerModules([AllCommunityModule]);
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from 'react';
import type { ColDef } from 'ag-grid-community';
import { Send } from 'lucide-react';
import './grid.css'
import RatingStars from './Rating';
import { useNavigate } from 'react-router-dom';
import { getAllEnrollmentsByIns } from '@/services/enrollServices';
import type { User } from '@/types/users';
import type { enrollements } from '@/types/enrollements';
import type { ReviewsC } from '@/types/reviewsC';
type params={
  id:number
}
const ApexGrid = ({id}:params) => {
    
    const [rowData, setRowData] = useState<{Student:string[],Completion:number,Rating:number,id:number}[]>([]);
    useEffect(()=>{
        const get = async ()=>{
          const res = await getAllEnrollmentsByIns(Number(id))
          
          if(res.success){
              setRowData(res.enr.enrollements.map((e:enrollements)=>{
                return {
                  Student:[e.user.photo ?? e.user.initials,e.user.fname+" "+e.user.lname],
                  Completion:e.progress,
                  Rating: res.enr.reviewsCs.reduce((acc:any,curr:ReviewsC,i:number)=>{
                   
                    if(curr.userId==e.userId){
                      
                      return curr.rating;
                    }
                    if(i+1==res.enr.reviewsCs.length){
                      return acc+0
                    }
                    
                    
                  },0),
                  id:e.userId
                }
              }))
          }
        }
        get()
    },[])

    
    const navigate = useNavigate()


    const SendBtn = (props:any) => {
      
    return (
    <div className='flex justify-center items-center h-full'>
      <button onClick={() => navigate("/teach/messages/"+props.data.id) } className='flex text-blue-500 font-medium cursor-pointer flex-row items-center justify-center gap-1  '>
        Send message 
        <Send className="w-4 h-4" /> 
      </button>
    </div>);
  };


  const Avatar = (props:any)=>{
    return (<div className="flex h-full items-center gap-3">
      <div style={{backgroundSize:"cover",backgroundPosition:"center",backgroundImage: !/^[A-Z]/.test(props.value)?`url(${import.meta.env.VITE_API_FILE_URL}/${props.value[0]})`:undefined}} className="w-8 h-8 rounded-full text-white students-avatar  flex items-center justify-center text-sm font-semibold">
        {/^[A-Z]/.test(props.value) && props.value[0]}
      </div>
      <span className="font-medium ">{props.value[1]}</span>
    </div>);
  }

  const Completion = (props:any)=>{
    return(
      <div className='flex h-full flex-row items-center gap-2'>
        {props.value>=70 ? (
          <div className="completion-wrapper  h-4 flex-1 bg-[#E1E2F3] rounded-3xl overflow-hidden" >
            <div className="completion h-full" style={{width: props.value+"%",backgroundColor:"#00E21A",borderRadius:24}}>

            </div>
        </div>
        ):props.value<=40?(
          <div className="completion-wrapper  h-4 flex-1 bg-[#E1E2F3] rounded-3xl overflow-hidden" >
            <div className="completion h-full" style={{width: props.value+"%",backgroundColor:"#E2B400",borderRadius:24}}>

            </div>
        </div>
        ):(
          <div className="completion-wrapper  h-4 flex-1 bg-[#E1E2F3] rounded-3xl overflow-hidden" >
            <div className="completion h-full" style={{width: props.value+"%",borderRadius:24,backgroundColor:"#000dff"}}>

            </div>
        </div>
        )}
        
        <p className='text-gray-600'>{props.value}%</p>
      </div>
        
      
    )
  }

  const Rating = (props:any)=>{
    console.log(props.data.Rating)
    return (
      <div className='flex h-full items-center justify-center'>
        {!props.value?(
          <p>No rating</p>
        ):(
          <RatingStars value={props.value}/>
        )}
        
        
      </div>
    
  )
  }

    
    const [colDefs, _setColDefs] = useState<ColDef[]>([
        { field: "Student" ,flex:1,cellRenderer:Avatar},
        { field: "Completion",headerName:"Course Completion" ,flex:1,cellRenderer:Completion},
        { field: "Rating" ,flex:1,cellRenderer:Rating},
        { field: "Action" ,flex:1,cellRenderer:SendBtn},
        
    ]);

   
    return (
    
    <div className="w-full max-w-full overflow-hidden">
      <div style={{ height: 500,width:"100%" }}>
        <AgGridReact
            fullWidthCellRenderer={true}
            rowData={rowData}
            columnDefs={colDefs}
            animateRows={true}
            suppressScrollOnNewData={true}
            rowHeight={56}
            headerHeight={48}
            
        />
    </div>
    </div>
    
)
}

export default ApexGrid;
