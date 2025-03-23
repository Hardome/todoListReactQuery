import cn from 'classnames'

export const Todo = ({todo}) => {
  const {id, title, isDone} = todo

  return (
    <div
      className={cn('flex gap-4 w-fit px-4 py-2 rounded-md', {
        ['bg-green-300']: isDone,
      })}
    >
      <span>{id}</span>
      <span>{title}</span>
    </div>
  )
}
