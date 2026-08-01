import React from 'react'
import { SquarePen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function CreatePostBtn() {
  const navigate = useNavigate();
  return (
    <button
            title="Create Post"
            className="rounded-full cursor-pointer p-2.5 text-green-700 transition hover:bg-green-100 hover:scale-105"
            onClick={()=>(navigate("/write"))}
          >
            <SquarePen size={22} />
    </button>
  )
}

export default CreatePostBtn