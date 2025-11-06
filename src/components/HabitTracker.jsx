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
      });
      setHabitTitle("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const toggleHabitComplete = async (id, currentStatus) => {
    const habitRef = doc(db, "habits", id);
    await updateDoc(habitRef, {
      completed: !currentStatus,
    });
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

      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-md overflow-hidden mt-2">
        <div
          className="bg-blue-500 dark:bg-blue-700 h-4 transition-all"
          style={{ width: `${(completedCount / (habits.length || 1)) * 100}%` }}
        ></div>
      </div>

      <p className="mt-2 text-gray-800 dark:text-gray-300">
        Completed {completedCount} from {habits.length}
      </p>

      <HabitList
        habits={habits}
        toggleHabitComplete={toggleHabitComplete}
        handleDeleteHabit={handleDeleteHabit}
      />
    </div>
  );
};

export default HabitTracker;
