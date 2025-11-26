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

export const useHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const habitsCollection = collection(db, "habits");

  useEffect(() => {
    setLoading(true);
    const q = query(habitsCollection, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
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

  const addHabit = useCallback(async (title) => {
    if (!title.trim()) return;

    try {
      await addDoc(habitsCollection, {
        title: title.trim(),
        completed: false,
        history: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      setError(error);
    }
  }, []);

  const toggleHabit = useCallback(
    async (id) => {
      const habit = habits.find((h) => h.id === id);
      if (!habit) return;

      const newStatus = !habit.completed;
      const today = new Date().toISOString().split("T")[0];

      const history = Array.isArray(habit.history) ? habit.history : [];

      const newHistory = newStatus
        ? [...history, today]
        : history.filter((d) => d !== today);

      const prevHabits = [...habits];

      setHabits((prev) =>
        prev.map((h) =>
          h.id === id ? { ...h, completed: newStatus, history: newHistory } : h
        )
      );

      try {
        const habitRef = doc(db, "habits", id);
        await updateDoc(habitRef, {
          completed: newStatus,
          history: newHistory,
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("Error updating document:", error);
        setHabits(prevHabits);
        setError(error);
      }
    },
    [habits]
  );

  const deleteHabit = useCallback(
    async (id) => {
      const prevHabits = [...habits];
      setHabits((prev) => prev.filter((h) => h.id !== id));

      try {
        const habitRef = doc(db, "habits", id);
        await deleteDoc(habitRef);
      } catch (err) {
        console.error("Error deleting habit:", err);
        setHabits(prevHabits);
        setError(error);
      }
    },
    [habits]
  );

  return {
    habits,
    loading,
    error,
    addHabit,
    toggleHabit,
    deleteHabit,
  };
};
