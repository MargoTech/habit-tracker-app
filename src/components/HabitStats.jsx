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
import { useHabits } from ".../hooks/useHabits";
import { motion } from "framer-motion";

const habitStats = () => {
  const { habits } = useHabits();

  const days = useMemo(() => {
    const arr = [];
    for (let i = 6; i >= 0; i--) {
      const d = subDays(new Date(), i);
      arr.push(startOfDay(d));
      return arr;
    }
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
          for (let i = 0; i < counts.length; i++) {
            if (isSameDay(counts[i].date, dt)) {
              counts[i].count += 1;
              break;
            }
          }
        });
        return;
      }
    });
  }, [habits, days]);
};
