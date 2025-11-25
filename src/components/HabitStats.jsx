import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { format, subDays, startOfDay, isSameDay, parseISO } from "date-fns";
import { useHabits } from "../hooks/useHabits";
import { motion } from "framer-motion";

const HabitStats = () => {
  const { habits } = useHabits();

  const days = useMemo(() => {
    const arr = [];
    for (let i = 6; i >= 0; i--) {
      arr.push(startOfDay(subDays(new Date(), i)));
    }
    return arr;
  }, []);

  const weeklyData = useMemo(() => {
    const counts = days.map((d) => ({
      date: d,
      label: format(d, "EEE"),
      count: 0,
    }));

    habits.forEach((habit) => {
      if (Array.isArray(habit.completions) && habit.completions.length > 0) {
        habit.completions.forEach((iso) => {
          let dt;
          try {
            dt =
              typeof iso === "string"
                ? parseISO(iso)
                : iso.toDate
                ? iso.toDate()
                : new Date(iso);
          } catch {
            dt = new Date(iso);
          }
          counts.forEach((c) => {
            if (isSameDay(c.date, dt)) {
              c.count += 1;
            }
          });
        });
      }
    });

    return counts;
  }, [habits, days]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-4 rounded-md shadow mt-6"
    >
      <h2 className="text-xl font-semibold mb-4">Weekly Activity</h2>
      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer>
          <BarChart data={weeklyData}>
            <XAxis dataKey="label" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default HabitStats;
