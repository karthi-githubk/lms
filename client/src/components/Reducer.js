// import { CREATE_COURSE } from "./Actiontype";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const initialState={
//     initialvalue:[]
// }

// const Coursereducer=(state=initialState,action)=>{
//     console.log(state.initialState);
//     switch(action.type){
//         case CREATE_COURSE:
//             return{
//                 initialvalue:[...(state.initialvalue ),action.payload]
//             }
//             default:return state
//     }
// }
// export default Coursereducer;


// export const getTaskFromServer = createAsyncThunk(
//     "tasks/getTaskFromServer",
//     async(_,{rejectWithValue})=>{
//         const response = await('http://localhost:8000/employees')
//         if(response.ok){
//             const jsonResponse = await response.json()
//             return jsonResponse
//         }else{
//             return rejectWithValue({error:'No Tasks Found'})
//         }
//         }
//     )

    








