import React from "react";
import PropTypes from "prop-types";

const TaskItem = React.memo(({ task }) => {
  console.log("Render TaskItem:", task.title); // Pour vérifier les rerenders
  return (
    <li className="task-item">
      <span>{task.title}</span>
    </li>
  );
}, (prevProps, nextProps) => {
  // Empêche le rerender si la tâche n'a pas changé
  return prevProps.task._id === nextProps.task._id &&
         prevProps.task.title === nextProps.task.title;
});

TaskItem.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskItem;
