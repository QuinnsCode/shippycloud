// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import Todo from 'src/components/Todo/Todo'

const TodoPage = () => {
  return (
    <>
      <Metadata title="Todo" description="Todo page" />

      <Todo />
    </>
  )
}

export default TodoPage
