import './App.css'
import FirstPage from './pages/FirstPage'
import RouterConfig from './config/RouterConfig'
import Navbar from './components/Navbar'
import PageContainer from './container/PageContainer'
import TeacherSchedule from './components/TeacherSchedule'
function App() {

  return (
    <div>
      <TeacherSchedule />

      {/*}
      <Navbar />
      <RouterConfig />

      {/** <FirstPage />*/}


    </div>
  )
}

export default App
