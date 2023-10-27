// import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

// const initialState = {
//     topicsList:[],
//     selectedTopics:{},
//     isLoading:false,
//     error:''
// }
// const BASE_URL = ' http://localhost:8000/topics'
// //GET
// export const getTopicsFromCourse = createAsyncThunk(
//     "topics/getTopicsFromCourse",
//     async (_,{rejectWithValue}) => {
//         const response = await fetch(BASE_URL)
//         if (response.ok) {
//             const jsonResponse = await response.json()
//             return jsonResponse
//         } else {
//             return rejectWithValue({error:'No Tasks Found'})
//         }
//     }
// )


// //POST 
// export const addTopicsToCourse = createAsyncThunk(
//     "topics/addTopicsToCourse",
//     async (topics,{rejectWithValue}) => {
//         const options = {
//             method:'POST',
//             body: JSON.stringify(topics),
//             headers: {
//                 "Content-type":"application/json; charset=UTF-8"
//             }
//         }
//         const response = await fetch( BASE_URL,options)
//         if (response.ok) {
//             const jsonResponse = await response.json()
//             return jsonResponse
//         } else {
//             return rejectWithValue({error:'Task Not Added'})
//         }
//     }
// )

// // export const updateTopicInServer = createAsyncThunk(
// //     "topics/updateTopicInServer",
// //     async (topic, { rejectWithValue }) => {
// //       const options = {
// //         method: "PATCH",
// //         body: JSON.stringify(topic),
// //         headers: {
// //           "Content-type": "application/json; charset=UTF-8",
// //         },
// //       };
// //       const response = await fetch(BASE_URL + "/" + topic.id, options);
// //       if (response.ok) {
// //         const jsonResponse = await response.json();
// //         return jsonResponse;
// //       } else {
// //         return rejectWithValue({ error: "Topic Not Updated" });
// //       }
// //     }
// //   );

// //PATCH 
// export const updateTaskInServer = createAsyncThunk(
//     "module/updateTaskInServer",
//     async (task,{rejectWithValue}) => {
//         const options = {
//             method:'PATCH',
//             body: JSON.stringify(task),
//             headers: {
//                 "Content-type":"application/json; charset=UTF-8"
//             }
//         }
//         const response = await fetch(BASE_URL + '/' + task.id,options)
//         if (response.ok) {
//             const jsonResponse = await response.json()
//             return jsonResponse
//         } else {
//             return rejectWithValue({error:'Task Not Updated'})
//         }
//     }
// )

// //DELETE
// export const deleteTaskFromServer = createAsyncThunk(
//     "module/deleteTaskFromServer",
//     async (task,{rejectWithValue}) => {
//         const options = {
//             method:'DELETE',
            
//         }
//         const response = await fetch(BASE_URL + '/' + task.id,options)
//         if (response.ok) {
//             const jsonResponse = await response.json()
//             return jsonResponse
//         } else {
//             return rejectWithValue({error:'Task Not Deleted'})
//         }
//     }
// )


// const tasksTopicSlice = createSlice({
//     name:'tasksTopicSlice',
//     initialState,
//     reducers: {
//         addTaskToList:(state,action) => {
//             const id = Math.random() * 100
//             let task = {...action.payload,id}
//             state.topicsList.push(task)
//         },
//         removeTaskFromList:(state,action) => {
//             state.topicsList = state.topicsList.filter((task) => task.id !== action.payload.id)
//         },
//         updateTaskInList:(state,action) => {
//             state.topicsList = state.topicsList.map((task) => task.id === action.payload.id ? action.payload : task )
//         },
//         setSelectedTask:(state,action) => {
//             state.selectedTask = action.payload
//         }

//     },
//     extraReducers:(builder) => {
//         builder
//             .addCase(getTopicsFromCourse.pending,(state) => {
//                 state.isLoading = true
//             })
//             .addCase(getTopicsFromCourse.fulfilled,(state,action) => {
//                 state.isLoading = false
//                 state.error = ''
//                 state.topicsList = action.payload
//             })
//             .addCase(getTopicsFromCourse.rejected,(state,action) => {
//                 state.error = action.payload.error
//                 state.isLoading = false
//                 state.topicsList = []
//             })
//             .addCase(addTopicsToCourse.pending,(state) => {
//                 state.isLoading = true
//             })
//             .addCase(addTopicsToCourse.fulfilled,(state,action) => {
//                 state.isLoading = false
//                 state.error = ''
//                 state.topicsList.push(action.payload)
//             })
//             .addCase(addTopicsToCourse.rejected,(state,action) => {
//                 state.error = action.payload.error
//                 state.isLoading = false
//             })
//             .addCase(updateTaskInServer.pending,(state) => {
//                 state.isLoading = true
//             })
//             .addCase(updateTaskInServer.fulfilled,(state,action) => {
//                 state.isLoading = false
//                 state.error = ''
//                 state.topicsList = state.topicsList.map((task) => task.id === action.payload.id ? action.payload : task )
//             })
//             .addCase(updateTaskInServer.rejected,(state,action) => {
//                 state.error = action.payload.error
//                 state.isLoading = false
//             })
//             .addCase(deleteTaskFromServer.pending,(state) => {
//                 state.isLoading = true
//             })
//             .addCase(deleteTaskFromServer.fulfilled,(state,action) => {
//                 state.isLoading = false
//                 state.error = ''
                
//             })
//             .addCase(deleteTaskFromServer.rejected,(state,action) => {
//                 state.error = action.payload.error
//                 state.isLoading = false
//             })
//     }

// })

// export const {addTaskToList,removeTaskFromList,updateTaskInList,setSelectedTask} = tasksTopicSlice.actions

// export default tasksTopicSlice.reducer