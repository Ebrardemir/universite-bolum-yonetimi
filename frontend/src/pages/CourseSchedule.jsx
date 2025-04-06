import React from 'react'
import SelectClass from '../components/SelectClass'
import PageContainer from '../container/PageContainer'
import Lessons from '../components/Lessons'
import Teachers from '../components/Teachers'
import LessonTable from '../components/LessonTable'

function CourseSchedule() {
  return (
    <div>
      <PageContainer>
        <SelectClass />
   
      </PageContainer>
      <LessonTable/>

    </div>
  )
}

export default CourseSchedule