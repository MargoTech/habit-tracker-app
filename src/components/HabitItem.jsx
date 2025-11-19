import { motion } from "framer-motion";

const HabitItem = ({ habit, toggleHabitComplete, handleDeleteHabit }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className={`flex justify-between items-center p-3 mb-2 rounded-md shadow-md 
        bg-white dark:bg-gray-800 
        ${habit.completed ? "opacity-60 line-through" : ""}`}
    >
      <span className="text-lg">{habit.title}</span>
      <div className="flex gap-3">
        <button
          onClick={() => toggleHabitComplete(habit.id)}
          className={`px-2 py-1 rounded text-white 
            ${habit.completed ? "bg-yellow-500" : "bg-green-500"}
            hover:opacity-80 transition`}
        >
          {habit.completed ? "Undo" : "Done"}
        </button>
        <button
          onClick={() => handleDeleteHabit(habit.id)}
          className="px-2 py-1 rounded bg-red-500 text-white hover:opacity-80 transition"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default HabitItem;
