import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import type { ColDef } from 'ag-grid-community';
import { Send } from 'lucide-react';
import './grid.css'
import RatingStars from './Rating';
import { useNavigate } from 'react-router-dom';
const ApexGrid = () => {
    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([
        { Student: ["DW","Dari Walid"], Completion: 100, Rating: 4.2 },
        { Student: ["BY","Bazine Yahia"], Completion: 60, Rating: 5 },
        { Student: ["DW","Dari Walid"], Completion: 40, Rating: 2 },
        
    ]);
    const navigate = useNavigate()
    const SendBtn = () => {
    return (
    <div className='flex justify-center items-center h-full'><button onClick={() => navigate("/teach/messages/id") } className='flex text-blue-500 font-medium cursor-pointer flex-row items-center justify-center gap-1  '>Send message <Send className="w-4 h-4" /> </button></div>);
  };
  const Avatar = (props:any)=>{
    return (<div className="flex h-full items-center gap-3">
      <div className="w-8 h-8 rounded-full text-white students-avatar  flex items-center justify-center text-sm font-semibold">
        {props.value[0]}
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
    return (
      <div className='flex h-full items-center justify-center'>
        <RatingStars value={props.value}/>
        
      </div>
    
  )
  }

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState<ColDef[]>([
        { field: "Student" ,flex:1,cellRenderer:Avatar},
        { field: "Completion",headerName:"Course Completion" ,flex:1,cellRenderer:Completion},
        { field: "Rating" ,flex:1,cellRenderer:Rating},
        { field: "Action" ,flex:1,cellRenderer:SendBtn},
        
    ]);

    // ...
    return (
    // Data Grid will fill the size of the parent container
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
