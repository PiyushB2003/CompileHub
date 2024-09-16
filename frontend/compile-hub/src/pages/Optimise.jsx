import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'

const Optimise = () => {
  const { optimiseText, setOptimiseText } = useContext(Context);
  useEffect(() => {
    setOptimiseText(localStorage.getItem('optimiseText'));
  }, [])

  return (
    <div className="h-screen w-screen flex bg-[#F5F5F5] items-center justify-center">
      <div className="h-4/5 w-[70%] border bg-white border-zinc-300 shadow-xl rounded-xl overflow-y-auto px-5">
        {optimiseText}
      </div>
    </div>

  )
}

export default Optimise