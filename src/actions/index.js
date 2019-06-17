let nextTodoId = 0
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const changeAwards = (arr) => ({
  type: 'CHANGE_AWARDS',
  arr
})