import React from 'react'
import MenuList from '../../componets/MenuList/MenuList'
import './Admin.scss'

const Admin = () => {
  return (
    <div>
        <h1 style={{textAlign:'center'}}>Admin Panel</h1>
        <MenuList/>
    </div>
  )
}

export default Admin