import { useState } from "react";
import { motion } from "framer-motion";

const HabitForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd(title);
    setTitle("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center w-full max-w-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.input
        type="text"
        value={habitTitle}
        onChange={(e) => setHabitTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add habit"
        className="border border-blue-500 p-2 rounded-md bg-gray-100 text-lg w-full mb-2"
        whileFocus={{ scale: 1.05 }}
      />
      <motion.button
        onClick={handleAddHabit}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Add Habit
      </motion.button>
    </motion.div>
  );
};

export default HabitForm;
