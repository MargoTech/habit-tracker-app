import { motion, AnimatePresence } from "framer-motion";
import HabitItem from "./HabitItem";

const HabitList = ({ habits, onToggle, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="mt-6 space-y-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-full h-10 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <ul className="mt-4 w-full max-w-lg">
      <AnimatePresence>
        {habits.length === 0 && (
          <motion.li
            className="text-center text-gray-500 dark:text-gray-400 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No habits yet. Add your first one!
          </motion.li>
        )}

        {habits.map((habit) => (
          <motion.li
            key={habit.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="list-none"
          >
            <HabitItem
              habit={habit}
              toggleHabitComplete={onToggle}
              handleDeleteHabit={onDelete}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default HabitList;
