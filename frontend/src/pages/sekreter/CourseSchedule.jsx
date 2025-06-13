import React from 'react'
import SelectClass from '../../components/SelectClass'
import SelectTerm from '../../components/SelectTerm'
import PageContainer from '../../container/PageContainer'

import LessonTable from '../../components/LessonTable'
import GenerateScheduleButton from '../../components/GenerateScheduleButton'

function CourseSchedule() {
  return (
    <div>
      <PageContainer>
        <div style={{ display: "flex", flexDirection: "row", gap: "50px" }}>
          <SelectClass /><SelectTerm /> <GenerateScheduleButton />
        </div>


      </PageContainer>
      <LessonTable />

    </div>
  )
}

export default CourseSchedule