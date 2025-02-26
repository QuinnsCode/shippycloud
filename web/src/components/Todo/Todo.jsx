const Todo = () => {
  return (
    <div className="flex grid-cols-4 justify-between">
      <div className="w-[14rem] h-screen bg-gray-300 text-white rounded-full">
        <h1 className="text-xl font-bold">1</h1>
      </div>
      <div className="inline-flex w-full px-4">
        <div className="w-full bg-gradient-to-br from-red-200 via-red-200 to-red-300 text-slate-900 rounded-[14px] items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">High</h1>
          </div>
        </div>
      </div>
      <div className="inline-flex w-full px-4">
        <div className="w-full bg-gradient-to-br from-orange-200 via-orange-200 to-orange-300 text-slate-900 rounded-[14px] items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Medium</h1>
          </div>
        </div>
      </div>
      <div className="inline-flex w-full  px-4">
        <div className="w-full bg-gradient-to-br from-amber-100 via-amber-50 to-amber-50 text-slate-900 rounded-[14px] items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Low</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todo
