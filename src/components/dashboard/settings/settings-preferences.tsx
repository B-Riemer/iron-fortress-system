"use client";

import { useState } from "react";
import { Toggle } from "@/components/ui/input/toggle";

export function SettingsPreferences() {
  const [notifications, setNotifications] = useState(true);
  const [dataSync, setDataSync] = useState(true);
  const [stealthMode, setStealthMode] = useState(false);

  return (
    <div className="space-y-4">
      <Toggle
        label="Notifications"
        checked={notifications}
        onChange={setNotifications}
      />
      <Toggle
        label="Data Sync"
        checked={dataSync}
        onChange={setDataSync}
      />
      <Toggle
        label="Stealth Mode"
        checked={stealthMode}
        onChange={setStealthMode}
      />
    </div>
  );
}

