import HabitForm from "./HabitForm";
import HabitList from "./HabitList";
import { useHabits } from "../hooks/useHabits";
import { useCallback } from "react";

const HabitTracker = () => {
  const { habits, loading, error, addHabit, toggleHabit, deleteHabit } =
    useHabits();

  const handleAdd = useCallback(
    (title) => {
      addHabit(title);
    },
    [addHabit]
  );

  const handleToggle = useCallback(
    (id, completed) => {
      toggleHabit(id, completed);
    },
    [toggleHabit]
  );

  const handleDelete = useCallback(
    (id) => {
      deleteHabit(id);
    },
    [deleteHabit]
  );

  return (
    <div className="flex flex-col items-center justify-center py-10 min-h-screen">
      <h1 className="text-4xl font-semibold mb-6">Habit Tracker</h1>

      <HabitForm onAdd={handleAdd} />

      <div className="w-full max-w-lg mt-4">
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-md overflow-hidden">
          <div
            className="bg-blue-500 dark:bg-blue-700 h-4 transition-all"
            style={{
              width: `${
                (habits.filter((h) => h.completed).length /
                  (habits.length || 1)) *
                100
              }%`,
            }}
          />
        </div>

        <p className="mt-2 text-gray-800 dark:text-gray-300">
          Completed {habits.filter((h) => h.completed).length} of{" "}
          {habits.length}
        </p>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">An error occurred.</p>}

        <HabitList
          habits={habits}
          onToggle={handleToggle}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default HabitTracker;
