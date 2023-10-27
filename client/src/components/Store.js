
import { configureStore } from "@reduxjs/toolkit"
import tasksReducer from './slices/tasksSlice';
import courseReducer from "./slices/CourseSlice";
import moduleReducer from "./slices/ModuleSlice";
import topicReducer from './slices/TopicSlice';


export const store = configureStore({
    reducer: {
        tasks:tasksReducer,
        courses: courseReducer,
        module: moduleReducer,
        topic: topicReducer

    }
})