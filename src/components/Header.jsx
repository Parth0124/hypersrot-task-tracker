import React from 'react'

function Header() {
  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12 my-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <h4 className='fw-bold'>Task Board</h4>
                    <i className="bi bi-person-fill bg-light fs-1 p-2 rounded-circle d-flex align-items-center"></i>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header
