import React from 'react'

const TaskSkeleton = () => {
  return (
    <div className={`flex flex-col justify-between p-5 space-y-5`}>
      <div className="flex items-start gap-2">
        <div className="w-7 h-7 skeleton rounded-lg"></div>
        <div className="flex-1 h-7 skeleton rounded-lg"></div>
        <div className="h-7 w-7 skeleton rounded-lg">
        </div>
      </div>
      <div className="h-20 skeleton rounded-lg"></div>
    </div>
  )
}

export default TaskSkeleton