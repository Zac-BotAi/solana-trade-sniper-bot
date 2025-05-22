
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
}

const BackButton = ({ onClick, className = "" }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClick}
        className={`rounded-full hover:bg-gray-800 dark:hover:bg-gray-700 bg-gray-900/50 backdrop-blur-sm ${className}`}
        aria-label="Go back"
      >
        <ArrowLeft className="h-5 w-5 text-gray-200" />
      </Button>
    </motion.div>
  );
};

export default BackButton;
