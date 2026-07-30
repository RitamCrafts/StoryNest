import React from 'react'
import { SquarePen } from 'lucide-react'

function CreateBlogBtn() {
  return (
    <button
            title="Create Blog"
            className="rounded-full p-2.5 text-green-700 transition hover:bg-green-100 hover:scale-105"
          >
            <SquarePen size={22} />
    </button>
  )
}

export default CreateBlogBtn