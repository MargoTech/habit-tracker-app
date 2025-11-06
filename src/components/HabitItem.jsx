import { motion } from "framer-motion";

const HabitItem = ({ habit, toggleHabitComplete, handleDeleteHabit }) => {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="flex justify-between items-center p-2 mb-2 bg-white shadow-md rounded-md"
      style={{
        textDecoration: habit.completed ? "line-through" : "none",
      }}
    >
      <span>{habit.title}</span>
      <div>
        <button
          onClick={() => handleDeleteHabit(habit.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
        <button
          onClick={() => toggleHabitComplete(habit.id, habit.completed)}
          className="ml-2 text-green-500 hover:text-green-700"
        >
          {habit.completed ? "❌ Cancel" : "✅ Ready"}
        </button>
      </div>
    </motion.li>
  );
};

export default HabitItem;
