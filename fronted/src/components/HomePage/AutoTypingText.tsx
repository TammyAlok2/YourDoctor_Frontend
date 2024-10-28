'use client';

import { useState, useEffect } from 'react';

interface AutoTypingTextProps {
  texts: string[]; // Array of strings to type out
  typingSpeed?: number; // Typing speed in milliseconds
  deletingSpeed?: number; // Deleting speed in milliseconds
  pauseDuration?: number; // Pause duration after completing a text
}

const AutoTypingText: React.FC<AutoTypingTextProps> = ({
  texts,
  typingSpeed = 1000,
  deletingSpeed = 500,
  pauseDuration = 500, // Default pause duration is 1.5 seconds
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // State to handle the pause

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Get the current phrase based on the current index
    const currentPhrase = texts[currentTextIndex];

    const typeText = () => {
      if (currentCharacterIndex < currentPhrase.length) {
        // Type the next character
        setDisplayedText((prevText) => prevText + currentPhrase[currentCharacterIndex]);
        setCurrentCharacterIndex((prevIndex) => prevIndex + 1);
      } else {
        // If the entire phrase has been typed, switch to deleting mode
        setIsPaused(true);
        setIsTyping(false);
      }
    };

    const deleteText = () => {
      if (currentCharacterIndex > 0) {
        // Delete the last character
        setDisplayedText((prevText) => prevText.slice(0, -1));
        setCurrentCharacterIndex((prevIndex) => prevIndex - 1);
      } else {
        // If the entire phrase has been deleted, switch to typing mode
        setIsTyping(true);
        setIsPaused(false); // Resume typing
        // Move to the next phrase
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        // Reset the character index for the new phrase
        setCurrentCharacterIndex(0);
      }
    };

    // Set up typing or deleting based on the current state
    if (isTyping) {
        timeoutId = setTimeout(typeText, typingSpeed);
      } else if (isPaused) {
        // Add pause logic before deleting text
        timeoutId = setTimeout(() => {
          setIsPaused(false); // Reset the pause state
        }, pauseDuration);
      } else {
        timeoutId = setTimeout(deleteText, deletingSpeed);
      }

    // Cleanup timeout on state change
    return () => clearTimeout(timeoutId);
  }, [isTyping, currentCharacterIndex, currentTextIndex, texts, typingSpeed, deletingSpeed]);

  return (
    <div className="text-5xl text-black [text-shadow:0_0_.2rem_black] font-medium">
      {displayedText}
    </div>
  );
};

export default function AutoTypingAndDeletingText() {
  const textArray = [
    "Welcome to YourLab!", 
    "Your health, your way.", 
    "Empowering better healthcare.",
    "Discover personalized care.",
    "Your journey to wellness begins here."
  ];

  return (
    <div>
      <AutoTypingText 
        texts={textArray} 
        typingSpeed={100} 
        deletingSpeed={50} 
      />
    </div>
  );
}
