import { motion, AnimatePresence } from "framer-motion";
import HabitItem from "./HabitItem";

const HabitList = ({ habits, onToggle, onDelete }) => {
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
