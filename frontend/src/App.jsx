import './App.css'

import FirstPage from './pages/FirstPage'
import AkademikPersonelPaneli from './pages/akademikpersonel/AkademikPersonelPaneli'

import RouterConfig from './config/RouterConfig'
import Navbar from './components/Navbar'
import PageContainer from './container/PageContainer'
import LessonTableSchedule from './components/LessonTableSchedule'
import ExamSchedule from './pages/akademikpersonel/ExamSchedule'


function App() {

  return (
    <div>
      <RouterConfig />
      {/* <PanelPage /> */}
      {/* <LessonTableSchedule /> */}

      {/*}
      <Navbar />
      <RouterConfig />

      {/** <FirstPage />*/}


    </div>
  )
}

export default App
