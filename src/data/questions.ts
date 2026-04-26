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
  {
    id: "uncertainty-principle",
    prompt:
      "Heisenberg's uncertainty principle says you cannot simultaneously know both of which two properties of a particle to arbitrary precision?",
    choices: [
      "Mass and energy",
      "Position and momentum",
      "Charge and spin",
      "Velocity and acceleration",
    ],
    correctIndex: 1,
    explanation:
      "The canonical form is Δx · Δp ≥ ℏ/2 — the more precisely you pin down a particle's position, the less precisely you can know its momentum. Energy and time form another conjugate pair, but mass-energy and charge-spin are not constrained this way.",
  },
  {
    id: "schrodinger-cat",
    prompt:
      "Schrödinger devised his famous cat thought experiment primarily to illustrate what?",
    choices: [
      "The cruelty of laboratory physics",
      "The absurdity of applying quantum superposition to macroscopic objects",
      "Conservation of momentum at small scales",
      "That cats have nine lives as a quantum phenomenon",
    ],
    correctIndex: 1,
    explanation:
      "Schrödinger meant it as a critique, not a real proposal. His point: if quantum superposition is taken literally and scaled up, you'd get a cat both alive and dead until observed — which is nonsense, suggesting something is missing in our understanding of measurement.",
  },
  {
    id: "bell-theorem",
    prompt:
      "Bell's theorem proved that no theory based on which classical assumption can reproduce all the predictions of quantum mechanics?",
    choices: [
      "Conservation of energy",
      "Local hidden variables",
      "General relativity",
      "Newton's laws of motion",
    ],
    correctIndex: 1,
    explanation:
      "Bell showed that any 'local realist' theory — where particles carry pre-determined properties and no influence travels faster than light — must obey his inequality. Real experiments, including loophole-free tests since 2015, violate that inequality and rule out local hidden variables.",
  },
  {
    id: "photoelectric-effect",
    prompt:
      "Einstein's 1905 explanation of the photoelectric effect, which earned him the Nobel Prize, established what idea?",
    choices: [
      "Light always behaves as a continuous wave",
      "Light energy comes in discrete quanta (photons)",
      "Electrons orbit the nucleus in fixed shells",
      "Mass and energy are equivalent",
    ],
    correctIndex: 1,
    explanation:
      "Einstein showed that the photoelectric effect's threshold-frequency behavior could only be explained if light came in discrete energy packets of E = hf. This was a pivotal step in establishing wave-particle duality and earned him the 1921 Nobel Prize.",
  },
  {
    id: "ultraviolet-catastrophe",
    prompt:
      "Planck's 1900 quantization of energy was introduced to solve which paradox of classical physics?",
    choices: [
      "The twin paradox",
      "The ultraviolet catastrophe",
      "Zeno's arrow paradox",
      "The grandfather paradox",
    ],
    correctIndex: 1,
    explanation:
      "Classical physics predicted a blackbody should radiate infinite energy at high frequencies — the 'ultraviolet catastrophe.' Planck rescued the math by assuming energy could only be exchanged in discrete amounts E = hf, accidentally founding quantum theory.",
  },
  {
    id: "spin-half-rotation",
    prompt:
      "An electron is a spin-1/2 particle. Through what angle must you rotate it before its quantum state returns to itself?",
    choices: [
      "90 degrees",
      "180 degrees",
      "360 degrees",
      "720 degrees",
    ],
    correctIndex: 3,
    explanation:
      "Spin-1/2 particles pick up a minus sign after a 360° rotation — they're not back to their original state. A full 720° is required to recover the original phase. This bizarre fact has been confirmed experimentally in neutron interferometry.",
  },
  {
    id: "pauli-exclusion",
    prompt:
      "The Pauli exclusion principle — no two identical fermions can occupy the same quantum state — is the fundamental reason for which everyday phenomenon?",
    choices: [
      "Why magnets attract certain metals",
      "Why solid matter is rigid and atoms have shell structure",
      "Why time moves only forward",
      "Why light has a maximum speed",
    ],
    correctIndex: 1,
    explanation:
      "Without Pauli exclusion, all electrons would crowd into the lowest-energy orbital. Atoms wouldn't have shells, chemistry wouldn't exist, and ordinary matter would collapse. It also supports white dwarf stars against gravitational collapse.",
  },
  {
    id: "quantum-tunneling-fusion",
    prompt:
      "Quantum tunneling — where a particle passes through an energy barrier it classically couldn't cross — is essential to which real-world phenomenon?",
    choices: [
      "Ocean tides on Earth",
      "Nuclear fusion in the Sun",
      "Gravitational lensing of light",
      "The expansion of the universe",
    ],
    correctIndex: 1,
    explanation:
      "Protons in the Sun's core don't have enough thermal energy to classically overcome their mutual electrostatic repulsion. Tunneling lets a tiny fraction fuse anyway — and that fraction is enough to power every star in the universe.",
  },
  {
    id: "epr-spooky-action",
    prompt:
      "Einstein famously called quantum entanglement 'spooky action at a distance.' What property of entangled particles troubled him?",
    choices: [
      "They violate conservation of momentum",
      "Measuring one instantly correlates with the other, no matter how far apart",
      "They cannot exist in a laboratory",
      "They constantly radiate energy",
    ],
    correctIndex: 1,
    explanation:
      "Einstein, Podolsky, and Rosen argued in 1935 that QM must be incomplete because it predicted distant particles to be correlated regardless of separation, seemingly violating locality. Bell's theorem and later experiments confirmed the correlations are real — but they cannot be used to transmit information faster than light.",
  },
];
