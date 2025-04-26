import './App.css'

import FirstPage from './pages/FirstPage'
import PanelPage from './pages/PanelPage'
import RouterConfig from './config/RouterConfig'
import Navbar from './components/Navbar'
import PageContainer from './container/PageContainer'
import LessonTableSchedule from './components/LessonTableSchedule'
import ExamSchedule from './pages/ExamSchedule'
function App() {

  return (
    <div>
      <ExamSchedule />
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
