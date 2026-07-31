import React from 'react'
import { SquarePen } from 'lucide-react'

function CreatePostBtn() {
  return (
    <button
            title="Create Post"
            className="rounded-full cursor-pointer p-2.5 text-green-700 transition hover:bg-green-100 hover:scale-105"
          >
            <SquarePen size={22} />
    </button>
  )
}

export default CreatePostBtn