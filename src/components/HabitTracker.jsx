import HabitForm from "./HabitForm";
import HabitList from "./HabitList";

import { useHabits } from "../hooks/useHabits";



  return (
    <div
      className="flex flex-col items-center justify-center py-10 
      bg-gradient-to-r from-blue-400 via-blue-200 to-blue-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700
      transition-colors duration-500 min-h-screen w-full"
    >
      <h1 className="text-4xl font-semibold text-center text-gray-900 dark:text-gray-200 mb-6">
        Habit Tracker
      </h1>

      <HabitForm
        habitTitle={habitTitle}
        setHabitTitle={setHabitTitle}
        handleAddHabit={handleAddHabit}
      />

      <div className="w-full max-w-lg mt-4">
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-md overflow-hidden">
          <div
            className="bg-blue-500 dark:bg-blue-700 h-4 transition-all"
            style={{
              width: `${(completedCount / (habits.length || 1)) * 100}%`,
            }}
          />
        </div>

        <p className="mt-2 text-gray-800 dark:text-gray-300">
          Completed {completedCount} from {habits.length}
        </p>

        {loading && (
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
            Loading...
          </p>
        )}
        {error && (
          <p className="text-sm text-red-600 mt-2">
            An error occurred. Check console for details.
          </p>
        )}

        <HabitList
          habits={habits}
          toggleHabitComplete={toggleHabitComplete}
          handleDeleteHabit={handleDeleteHabit}
        />
      </div>
    </div>
  );
};

export default HabitTracker;
