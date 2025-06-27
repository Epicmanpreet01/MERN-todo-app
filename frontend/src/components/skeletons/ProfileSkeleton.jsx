import React from 'react'

const ProfileSkeleton = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="mt-32 px-6 max-w-4xl mx-auto flex flex-col items-center shadow-sm shadow-accent border-sm border-accent rounded-2xl space-y-10 py-10 backdrop-blur-md relative animate-pulse">

        {/* Avatar Skeleton */}
        <div className="avatar">
          <div className="w-40 rounded-full bg-base-200 skeleton ring ring-primary ring-offset-base-100 ring-offset-4 shadow-xl" />
        </div>

        {/* User Info Skeleton */}
        <div className="text-center space-y-6 w-full">
          <div className="space-y-1">
            <div className="h-3 w-16 bg-base-200 skeleton mx-auto" />
            <div className="h-10 w-40 bg-primary/30 skeleton mx-auto rounded-xl" />
          </div>

          <div className="space-y-1">
            <div className="h-3 w-16 bg-base-200 skeleton mx-auto" />
            <div className="h-6 w-52 bg-secondary/30 skeleton mx-auto rounded" />
          </div>
        </div>

        {/* Divider */}
        <div className="divider text-3xl opacity-40">STATS</div>

        {/* Stats Skeleton */}
        <div className="stats stats-vertical md:stats-horizontal shadow w-full justify-center">
          {[...Array(3)].map((_, i) => (
            <div className="stat space-y-2" key={i}>
              <div className="h-3 w-24 bg-base-200 skeleton rounded" />
              <div className="h-8 w-20 bg-primary/30 skeleton rounded" />
              <div className="h-3 w-28 bg-base-200 skeleton rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfileSkeleton;