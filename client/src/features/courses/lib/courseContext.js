import { createContext } from 'react'

// The course a CoursePage is showing, for deep children (e.g. ActionLink) that need its code.
export const CourseContext = createContext(null)
