import React from 'react'
import { useAuth } from '../hooks'

const ProfileSetting = () => {
  const auth = useAuth()
  return (
    <div id='profile_full_Container'>
    <div id='profileSetting'>
      <header>
        <h1>EDIT INFORMATION</h1>

      </header>
      <div className='profile_pic_container'>
        <div className='profile_pic'>
        <img
              alt=""
              width={"100%"}
              height="100%"
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
            />
        </div>
        <div className='edit_btn_container'>
          <label htmlFor='chooseFile'>Choose a file</label>
          <input id='chooseFile' type={'file'}/>
        </div>

      </div>
      <div className='acccount_info_heading'>
        <h1>ACCOUNT INFORMATION</h1>

      </div>
      <div className='acount_information'>
          <div>
            <label htmlFor='name'>Name :</label>
            <input value={auth?.user?.name} id='name' type={'name'}/>
          </div>
            <div>
            <label htmlFor='email'>Email :</label>
            <input value={auth?.user?.email} id='email' type={'email'}/>
            </div>

      </div>
      <div className='submit_btn_container'>
        <button  className='submit_btn'>Submit</button>
      </div>
    </div>
    </div>
  )
}

export default ProfileSetting