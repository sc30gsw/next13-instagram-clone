import 'minifaker/locales/en'

import minifaker from 'minifaker'
import React from 'react'

import type { Suggest } from '@/types/Suggest'

const Suggestions = () => {
  const suggestions: Suggest[] = minifaker.array(5, (i: number) => ({
    id: i,
    username: minifaker.username({ locale: 'en' }).toLowerCase(),
    jobTitle: minifaker.jobTitle(),
  }))

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between mb-5 text-sm">
        <h3 className="font-bold text-gray-400">Suggestion for you</h3>
        <button className="text-gray-600 font-semibold">See all</button>
      </div>
      {suggestions.map((suggest: Suggest) => (
        <div
          key={suggest.id}
          className="flex items-center justify-between mt-3"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-10 rounded-full border p-[20px]"
            src={`https://i.pravatar.cc/150?img=${Math.ceil(
              Math.random() * 70,
            )}`}
            alt="pravater"
          />
          <div className="flex-1 ml-4">
            <h2 className="font-semibold text-sm">{suggest.username}</h2>
            <h3 className="font-sm text-gray-400 truncate w-[230px]">
              {suggest.jobTitle}
            </h3>
          </div>
          <button className="font-semibold text-blue-400 text-sm">
            Follow
          </button>
        </div>
      ))}
    </div>
  )
}

export default Suggestions
