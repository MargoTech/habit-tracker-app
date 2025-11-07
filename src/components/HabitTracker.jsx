import { useState, useEffect } from "react";
import HabitForm from "./HabitForm";
import HabitList from "./HabitList";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const HabitTracker = () => {
  const habitsCollection = collection(db, "habits");

  const [habits, setHabits] = useState([]);
  const [habitTitle, setHabitTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      habitsCollection,
      (snapshot) => {
        const firebaseHabits = snapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }));
        setHabits(firebaseHabits);
        setLoading(false);
      },
      (err) => {
        console.error("Snapshot error:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleAddHabit = async () => {
    if (!habitTitle.trim()) return;

    try {
      await addDoc(habitsCollection, {
        title: habitTitle,
        completed: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setHabitTitle("");
    } catch (error) {
      console.error("Error adding document: ", error);
      setError(error);
    }
  };

  const toggleHabitComplete = async (id) => {
    const habit = habits.find((h) => h.id === id);
    if (!habit) return;

    const newStatus = !habit.completed;
    const prevHabits = habits;

    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completed: newStatus } : h))
    );

    try {
      const habitRef = doc(db, "habits", id);
      await updateDoc(habitRef, {
        completed: newStatus,
        updateAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating document:", error);
      setError(error);

      setHabits(prevHabits);
    }
  };

  const handleDeleteHabit = async (id) => {
    const habitRef = doc(db, "habits", id);
    await deleteDoc(habitRef);
  };

  const completedCount = habits.filter((habit) => habit.completed).length;

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
