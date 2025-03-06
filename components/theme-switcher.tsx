"use client";

import { Button } from "@/components/ui/button";
import { Flashlight, FlashlightOff, Meh } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => { 
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;
  return (
     <Button variant="outline" size={"sm"} className="block self-end w-max hover:bg-transparent" onClick={() => setTheme(theme === "light" ? "dark" :theme === "dark"? "system": "light")}>
          {theme === "light" ? (
           <Flashlight 
              key="light"
              size={ICON_SIZE}
              className={"text-muted-foreground"}             
            />
          ) : theme === "dark" ? (
            <FlashlightOff 
              key="dark"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          ) : (
            <Meh
              key="system"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          )}
        </Button>  
);
};

export { ThemeSwitcher };


