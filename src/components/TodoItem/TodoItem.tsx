/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useState } from 'react';

type Props = {
  todo: Todo;
  deleteSelectTodo: (id: number) => void;
  isLoadingById: boolean;
  handleUpdateComplete: (todo: Todo) => void;
  handleEditTitle: (title: string, todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  deleteSelectTodo,
  isLoadingById,
  handleUpdateComplete,
  handleEditTitle,
}) => {
  const { id, completed, title } = todo;
  const [showEditInput, setShowEditInput] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleEditTitleTodo = () => {
    if (newTitle.length === 0) {
      deleteSelectTodo(id);
    } else if (showEditInput && newTitle.trim()) {
      handleEditTitle(newTitle.trim(), todo);
      setShowEditInput(false);
    }
  };

  const handleEscape = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setNewTitle(title);
      setShowEditInput(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => handleUpdateComplete(todo)}
        />
      </label>
      {showEditInput ? (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleEditTitleTodo();
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onBlur={handleEditTitleTodo}
            onKeyUp={handleEscape}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setShowEditInput(true)}
          >
            {newTitle.trim()}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteSelectTodo(id)}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal', 'overlay', {
          'is-active': isLoadingById,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
