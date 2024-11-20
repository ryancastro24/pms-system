import { Switch } from "@nextui-org/react";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider"; // Assuming you have a custom theme provider

const ThemeButton = () => {
  const { theme, setTheme } = useTheme(); // Use theme from context
  const [isChecked, setIsChecked] = useState(theme === "dark"); // Set initial state based on the current theme

  useEffect(() => {
    setIsChecked(theme === "dark"); // Update state when theme changes
  }, [theme]);

  // Toggle theme when the switch changes
  const handleSwitchChange = () => {
    const newTheme = isChecked ? "light" : "dark"; // Toggle theme between light and dark
    setIsChecked(!isChecked); // Update the switch state
    setTheme(newTheme); // Update theme in context and localStorage
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex items-center gap-2">
        {/* Display Sun/Moon icons based on the theme */}
        {isChecked ? <Moon color="white" /> : <Sun />}

        {/* Switch component */}
        <Switch
          size="sm"
          isSelected={isChecked}
          onChange={handleSwitchChange}
          aria-label="Toggle theme"
        />
      </div>
    </div>
  );
};

export default ThemeButton;
