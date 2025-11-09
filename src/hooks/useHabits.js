import { useState, useEffect, useCallback } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
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