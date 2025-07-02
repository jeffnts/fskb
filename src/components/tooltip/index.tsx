import React from 'react'

interface TooltipProps {
  message: string
  children: React.ReactNode
}

const Tooltip: React.FC<TooltipProps> = ({ message, children }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block ">
        <div className="bg-gray-800 text-white text-sm rounded px-2 py-1 shadow-lg text-center whitespace-nowrap">
          {message}
          <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-gray-800"></div>
        </div>
      </div>
    </div>
  )
}

export default Tooltip
