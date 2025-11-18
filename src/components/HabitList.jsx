import { motion, AnimatePresence } from "framer-motion";
import HabitItem from "./HabitItem";

const HabitList = ({ habits, toggleHabitComplete, handleDeleteHabit }) => {
  return (
    <AnimatePresence>
      <ul className="mt-4 w-full max-w-lg">
        {habits.map((habit) => (
          <motion.li
            key={habit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <HabitItem
              habit={habit}
              toggleHabitComplete={toggleHabitComplete}
              handleDeleteHabit={handleDeleteHabit}
            />
          </motion.li>
        ))}
      </ul>
    </AnimatePresence>
  );
};

export default HabitList;
