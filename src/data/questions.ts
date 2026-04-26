export type Question = {
  id: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
};

export const questions: Question[] = [
  {
    id: "double-slit",
    prompt:
      "In the double-slit experiment, what disappears when you observe which slit each particle passes through?",
    choices: [
      "The particle itself",
      "The interference pattern",
      "Wave-particle duality",
      "Conservation of energy",
    ],
    correctIndex: 1,
    explanation:
      "Observation collapses the wavefunction. Without 'which-path' information, particles interfere with themselves to form alternating bright and dark bands. Once you measure which slit they pass through, the interference pattern vanishes and you're left with two simple bands.",
  },
];
