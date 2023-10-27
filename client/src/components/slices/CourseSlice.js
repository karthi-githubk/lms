// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // const initialState = {
// //   coursesList: [],
// //   isLoading: false,
// //   error: "",
// // };

// // const BASE_URL = "http://localhost:8000/course";

// // export const addCourseToServer = createAsyncThunk(
// //   "courses/addCourseToServer",
// //   async (courseData, { rejectWithValue }) => {
// //     try {
// //       const options = {
// //         method: "POST",
// //         body: JSON.stringify(courseData),
// //         headers: {
// //           "Content-type": "application/json; charset=UTF-8",
// //         },
// //       };
// //       const response = await fetch(BASE_URL, options);
// //       if (response.ok) {
// //         const jsonResponse = await response.json();
// //         return jsonResponse;
// //       } else {
// //         return rejectWithValue({ error: "Course Not Added" });
// //       }
// //     } catch (error) {
// //       return rejectWithValue({ error: "Network error" });
// //     }
// //   }
// // );
// // export const getCoursefromserver = createAsyncThunk(
// //   'courses/getCoursefromserver',
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const response = await fetch(BASE_URL); 
// //       if (!response.ok) {
// //         return rejectWithValue({ error: 'Failed to fetch courses list' });
// //       }
// //       const jsonResponse = await response.json();
// //       return jsonResponse;
// //     } catch (error) {
// //       return rejectWithValue({ error: 'Network error' });
// //     }
// //   }
// // );

// // export const updateCourseInServer = createAsyncThunk(
// //   "courses/updateCourseInServer",
// //   async (course, { rejectWithValue }) => {
// //     const { id, ...data } = course;
// //     const options = {
// //       method: "PUT",
// //       body: JSON.stringify(data),
// //       headers: {
// //         "Content-type": "application/json; charset=UTF-8",
// //       },
// //     };
// //     const response = await fetch(`${BASE_URL}/${id}`, options);
// //     if (response.ok) {
// //       const jsonResponse = await response.json();
// //       return jsonResponse;
// //     } else {
// //       return rejectWithValue({ error: "Course Not Updated" });
// //     }
// //   }
// // );

// // export const deleteCourseFromServer = createAsyncThunk(
// //   "courses/deleteCourseFromServer",
// //   async (courseId, { rejectWithValue }) => {
// //     const options = {
// //       method: "DELETE",
// //     };
// //     const response = await fetch(`${BASE_URL}/${courseId}`, options);
// //     if (response.ok) {
// //       return courseId;
// //     } else {
// //       return rejectWithValue({ error: "Course Not Deleted" });
// //     }
// //   }
// // );

// // const courseSlice = createSlice({
// //   name: "coursesSlice",
// //   initialState,
// //   reducers: {},
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(addCourseToServer.pending, (state) => {
// //         state.isLoading = true;
// //       })
// //       .addCase(addCourseToServer.fulfilled, (state, action) => {
// //         state.isLoading = false;
// //         state.error = "";
// //         state.coursesList.push(action.payload);
// //       })
// //       .addCase(addCourseToServer.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.error = action.payload.error;
// //       })
// //       .addCase(getCoursefromserver.pending, (state) => {
// //         state.isLoading = true;
// //         state.error = '';
// //       })
// //       .addCase(getCoursefromserver.fulfilled, (state, action) => {
// //         state.isLoading = false;
// //         state.error = '';
// //         state.coursesList = action.payload;
// //       })
// //       .addCase(getCoursefromserver.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.error = action.payload.error;
// //       })
// //       .addCase(updateCourseInServer.pending, (state) => {
// //         state.isLoading = true;
// //       })
// //       .addCase(updateCourseInServer.fulfilled, (state, action) => {
// //         state.isLoading = false;
// //         state.error = "";
// //         state.coursesList = state.coursesList.map((course) =>
// //           course.id === action.payload.id ? action.payload : course
// //         );
// //       })
// //       .addCase(updateCourseInServer.rejected, (state, action) => {
// //         state.error = action.payload.error;
// //         state.isLoading = false;
// //       })
// //       .addCase(deleteCourseFromServer.pending, (state) => {
// //         state.isLoading = true;
// //       })
// //       .addCase(deleteCourseFromServer.fulfilled, (state, action) => {
// //         state.isLoading = false;
// //         state.error = "";
// //         state.coursesList = state.coursesList.filter(
// //           (course) => course.id !== action.payload
// //         );
// //       })
// //       .addCase(deleteCourseFromServer.rejected, (state, action) => {
// //         state.error = action.payload.error;
// //         state.isLoading = false;
// //       });
// //   },
// // });

// // export default courseSlice.reducer;





// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const initialState = {
//   coursesList: [],
//   isLoading: false,
//   error: "",
// };

// const BASE_URL = "http://localhost:8000/course";

// export const addCourseToServer = createAsyncThunk(
//   "courses/addCourseToServer",
//   async (courseData, { rejectWithValue }) => {
//     try {
//       const options = {
//         method: "POST",
//         body: JSON.stringify(courseData),
//         headers: {
//           "Content-type": "application/json; charset=UTF-8",
//         },
//       };
//       const response = await fetch(BASE_URL, options);
//       if (response.ok) {
//         const jsonResponse = await response.json();
//         return jsonResponse;
//       } else {
//         return rejectWithValue({ error: "Course Not Added" });
//       }
//     } catch (error) {
//       return rejectWithValue({ error: "Network error" });
//     }
//   }
// );
// export const getCoursefromserver = createAsyncThunk(
//   'courses/getCoursefromserver',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch(BASE_URL); // Make sure your API endpoint is returning all fields for each course
//       if (!response.ok) {
//         return rejectWithValue({ error: 'Failed to fetch courses list' });
//       }
//       const jsonResponse = await response.json();
//       return jsonResponse;
//     } catch (error) {
//       return rejectWithValue({ error: 'Network error' });
//     }
//   }
// );

// export const updateCourseInServer = createAsyncThunk(
//   "courses/updateCourseInServer",
//   async (course, { rejectWithValue }) => {
//     const { id, ...data } = course;
//     const options = {
//       method: "PUT",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     };
//     const response = await fetch(`${BASE_URL}/${id}`, options);
//     if (response.ok) {
//       const jsonResponse = await response.json();
//       return jsonResponse;
//     } else {
//       return rejectWithValue({ error: "Course Not Updated" });
//     }
//   }
// );

// export const deleteCourseFromServer = createAsyncThunk(
//   "courses/deleteCourseFromServer",
//   async (courseId, { rejectWithValue }) => {
//     const options = {
//       method: "DELETE",
//     };
//     const response = await fetch(`${BASE_URL}/${courseId}`, options);
//     if (response.ok) {
//       return courseId;
//     } else {
//       return rejectWithValue({ error: "Course Not Deleted" });
//     }
//   }
// );

// const courseSlice = createSlice({
//   name: "coursesSlice",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(addCourseToServer.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(addCourseToServer.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.error = "";
//         state.coursesList.push(action.payload);
//       })
//       .addCase(addCourseToServer.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload.error;
//       })
//       .addCase(getCoursefromserver.pending, (state) => {
//         state.isLoading = true;
//         state.error = '';
//       })
//       .addCase(getCoursefromserver.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.error = '';
//         state.coursesList = action.payload;
//       })
//       .addCase(getCoursefromserver.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload.error;
//       })
//       .addCase(updateCourseInServer.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(updateCourseInServer.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.error = "";
//         state.coursesList = state.coursesList.map((course) =>
//           course.id === action.payload.id ? action.payload : course
//         );
//       })
//       .addCase(updateCourseInServer.rejected, (state, action) => {
//         state.error = action.payload.error;
//         state.isLoading = false;
//       })
//       .addCase(deleteCourseFromServer.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(deleteCourseFromServer.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.error = "";
//         state.coursesList = state.coursesList.filter(
//           (course) => course.id !== action.payload
//         );
//       })
//       .addCase(deleteCourseFromServer.rejected, (state, action) => {
//         state.error = action.payload.error;
//         state.isLoading = false;
//       });
//   },
// });

// export default courseSlice.reducer;