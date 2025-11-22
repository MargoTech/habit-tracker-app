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
};
