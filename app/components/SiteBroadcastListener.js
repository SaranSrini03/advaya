"use client";

import { useEffect } from "react";

/** Reloads the app when admin toggles maintenance so middleware can apply. */
export default function SiteBroadcastListener() {
  useEffect(() => {
    let bc;
    try {
      bc = new BroadcastChannel("advaya-site-settings");
      bc.onmessage = (e) => {
        if (e.data?.type === "maintenance") {
          window.location.reload();
        }
      };
    } catch {
      /* ignore */
    }
    return () => {
      try {
        bc?.close();
      } catch {
        /* ignore */
      }
    };
  }, []);

  return null;
}
