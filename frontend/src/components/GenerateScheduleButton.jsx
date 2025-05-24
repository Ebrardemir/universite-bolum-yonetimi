import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createFullScheduleData } from '../redux/slices/scheduleSlice'

function GenerateScheduleButton() {
  const dispatch = useDispatch()

  const { loadingPost } = useSelector((state) => state.schedule)
  const { selectedClass, selectedTerm } = useSelector((state) => state.selection)

  const handleClick = () => {
    if (!selectedClass || !selectedTerm) {
      alert("Lütfen sınıf ve dönem seçiniz.")
      return
    }
    console.log("createScheduleRequest çağrılıyor...");

    dispatch(createFullScheduleData({
      sinif: selectedClass,
      donem: selectedTerm,
      bolumId:1
    }))
    
      .unwrap()
      .then(() => alert("Ders programı oluşturma isteği gönderildi!"))
      .catch((err) => alert("Hata oluştu: " + err))
  }

  return (
    <button
      onClick={handleClick}
      disabled={loadingPost}
      style={{
        padding: '5px',
        backgroundColor: loadingPost ? '#90caf9' : '#4caf50',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: loadingPost ? 'not-allowed' : 'pointer',
      }}
    >
      {loadingPost ? 'Oluşturuluyor...' : 'Ders Programı Oluştur'}
    </button>
  )
}

export default GenerateScheduleButton
