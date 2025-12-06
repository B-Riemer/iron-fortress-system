"use client";

import { motion } from "framer-motion";
import { WorkoutCard } from "@/components/dashboard/workout-card";
import type { Workout } from "@/lib/types/workout";

interface WorkoutWithLastRun extends Workout {
  lastRun?: string | null;
  isLocked?: boolean;
}

interface WorkoutGridProps {
  workouts: WorkoutWithLastRun[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export function WorkoutGrid({ workouts }: WorkoutGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {workouts.map((workout) => {
        return (
          <motion.div key={workout.id} variants={itemVariants}>
            <WorkoutCard 
              workout={workout} 
              lastRun={workout.lastRun}
              isLocked={workout.isLocked}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

