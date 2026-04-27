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
  {
    id: "einstein-nobel",
    prompt:
      "For what work did Albert Einstein win the 1921 Nobel Prize in Physics?",
    choices: [
      "The theory of special relativity",
      "The theory of general relativity",
      "His explanation of the photoelectric effect",
      "The mass-energy equivalence E = mc²",
    ],
    correctIndex: 2,
    explanation:
      "The Nobel committee, hesitant about relativity (still considered controversial at the time), specifically cited Einstein's 1905 photoelectric effect paper. Per the divorce settlement with Mileva Marić, Einstein gave her the prize money.",
  },
  {
    id: "heisenberg-helgoland",
    prompt:
      "Werner Heisenberg conceived the foundations of matrix mechanics in 1925 while:",
    choices: [
      "Lecturing at Cambridge",
      "Recovering from severe hay fever on the North Sea island of Helgoland",
      "Imprisoned during the war",
      "Crossing the Atlantic by ship",
    ],
    correctIndex: 1,
    explanation:
      "In June 1925, suffering from hay fever, Heisenberg retreated to the (mostly grass-free) island of Helgoland. Working alone there, he developed the operator-algebra approach that became matrix mechanics — the first complete formulation of quantum theory.",
  },
  {
    id: "marie-curie-two-nobels",
    prompt:
      "Marie Curie holds a unique distinction in Nobel Prize history. What is it?",
    choices: [
      "The youngest physics laureate ever",
      "The only person to win Nobel Prizes in two different scientific fields",
      "The first to win three Nobel Prizes",
      "The first scientist to refuse a Nobel Prize",
    ],
    correctIndex: 1,
    explanation:
      "She won the 1903 Physics Prize (with Pierre Curie and Becquerel) for radioactivity, and the 1911 Chemistry Prize for discovering radium and polonium. She remains the only person with Nobels in two distinct sciences. (Linus Pauling won Chemistry and Peace — not two sciences.)",
  },
  {
    id: "meitner-fission-snub",
    prompt:
      "Nuclear fission was discovered in late 1938 through collaboration between Otto Hahn and Lise Meitner, but the 1944 Nobel Prize in Chemistry went only to:",
    choices: [
      "Both Hahn and Meitner",
      "Otto Hahn alone — Meitner was excluded",
      "Lise Meitner alone",
      "Albert Einstein",
    ],
    correctIndex: 1,
    explanation:
      "Meitner provided the theoretical interpretation that made fission intelligible, but as a Jewish refugee in exile from Nazi Germany, she was sidelined by the committee. Element 109 (meitnerium) was named for her in posthumous recognition; many historians consider this one of the Nobel committee's worst snubs.",
  },
  {
    id: "schrodinger-arosa",
    prompt:
      "Erwin Schrödinger derived his famous wave equation over a 1925-26 holiday in:",
    choices: [
      "The French Riviera with Einstein",
      "The Swiss Alps (Arosa) with a still-unidentified female companion",
      "India studying philosophy",
      "New York during a sabbatical",
    ],
    correctIndex: 1,
    explanation:
      "Schrödinger's biographer Walter Moore documented that wave mechanics was born during a Christmas 1925 / January 1926 ski holiday in Arosa, Switzerland — accompanied by a mistress whose identity remains unknown. Schrödinger was famously polyamorous, with a complicated open marriage.",
  },
  {
    id: "dirac-taciturn",
    prompt:
      "Paul Dirac, despite his immense contributions to quantum mechanics, was famously:",
    choices: [
      "A flamboyant public speaker",
      "Extremely taciturn — colleagues jokingly defined a 'Dirac' as one word per hour",
      "A career politician late in life",
      "Self-taught, never having attended university",
    ],
    correctIndex: 1,
    explanation:
      "Dirac's silences were legendary among physicists. He held the Lucasian Chair of Mathematics at Cambridge (Newton's old chair, later Hawking's), predicted antimatter from his 1928 equation, and shared the 1933 Nobel with Schrödinger. Asked to explain his work in plain English, he often simply repeated the equations.",
  },
  {
    id: "feynman-hobbies",
    prompt:
      "Beyond physics, Richard Feynman was known for which eclectic pursuits?",
    choices: [
      "Playing bongo drums, picking locks at Los Alamos, and decoding Mayan glyphs",
      "Competitive chess and ballroom dancing",
      "Painting religious frescoes",
      "Composing operas",
    ],
    correctIndex: 0,
    explanation:
      "At Los Alamos during the Manhattan Project, Feynman cracked safes containing nuclear secrets to make a point about security. He played bongos seriously, decoded Mayan codices as a hobby, and later helped diagnose the Challenger disaster live on TV. A celebrated raconteur as well as a Nobel-winning physicist (1965).",
  },
  {
    id: "bohr-institute",
    prompt:
      "Niels Bohr's Institute for Theoretical Physics, founded in 1921 and the central hub of quantum theory's development in the 1920s-30s, is located in:",
    choices: ["Berlin", "Copenhagen", "Princeton", "Vienna"],
    correctIndex: 1,
    explanation:
      "The institute (now the Niels Bohr Institute) hosted nearly every major early quantum physicist — Heisenberg, Pauli, Schrödinger, Dirac, and many more. The 'Copenhagen interpretation' takes its name from this gathering place. Bohr won the 1922 Nobel for his model of the atom.",
  },
  {
    id: "pauli-effect",
    prompt:
      "The 'Pauli effect' was a running joke among physicists, claiming that:",
    choices: [
      "Wolfgang Pauli could solve any equation in his head",
      "Sensitive equipment would mysteriously fail when Pauli was nearby",
      "Pauli could predict experimental results before they were run",
      "Pauli had memorized all of physics literature",
    ],
    correctIndex: 1,
    explanation:
      "Pauli — a brilliant theorist with a reputation for harsh criticism (he coined 'not even wrong') — was so notorious for accidents around equipment that colleagues kept tallies. Once an apparatus in Göttingen failed for no reason; Pauli was later found to have been on a train passing through the city at that exact moment. Apocryphal, of course, but beloved.",
  },
  {
    id: "everett-reception",
    prompt:
      "When Hugh Everett proposed the many-worlds interpretation in his 1957 PhD thesis at Princeton, the response was:",
    choices: [
      "Immediate widespread acceptance",
      "A Nobel Prize within the year",
      "Largely dismissed by Bohr's circle, prompting Everett to leave academia entirely",
      "Vigorous experimental verification",
    ],
    correctIndex: 2,
    explanation:
      "Everett's adviser John Wheeler was supportive but had to soften the thesis to avoid offending Bohr. After a frosty reception in Copenhagen, Everett left physics for defense work, never returning. He died in 1982 at 51. Many-worlds gained mainstream interest only decades later, partly through Bryce DeWitt and David Deutsch.",
  },
  {
    id: "schrodinger-psi",
    prompt:
      "In the Schrödinger equation iℏ ∂ψ/∂t = Ĥψ, what does the symbol ψ (psi) represent?",
    choices: [
      "The position of the particle",
      "The wavefunction — a complex-valued amplitude whose squared magnitude gives probability density",
      "The total energy of the particle",
      "The particle's momentum",
    ],
    correctIndex: 1,
    explanation:
      "ψ is the wavefunction — it encodes the entire quantum state of the system. It's complex-valued, and by Born's rule |ψ|² gives the probability density of finding the particle at a given position. ψ itself isn't directly observable; only probabilities derived from it are.",
  },
  {
    id: "schrodinger-hbar",
    prompt:
      "The constant ℏ (h-bar) appears throughout the Schrödinger equation. What is it, and why does it matter?",
    choices: [
      "The speed of light — sets the relativistic limit",
      "Planck's constant divided by 2π — sets the natural scale of quantum effects",
      "Boltzmann's constant — connects energy to temperature",
      "The mass of the particle, which scales the wavefunction",
    ],
    correctIndex: 1,
    explanation:
      "ℏ = h/(2π) ≈ 1.055 × 10⁻³⁴ J·s is the reduced Planck constant — the natural unit of action in quantum mechanics. Its tiny size is why quantum effects vanish at everyday scales. If ℏ were zero, classical physics would be exact.",
  },
  {
    id: "schrodinger-hamiltonian",
    prompt:
      "In Ĥψ = Eψ, the operator Ĥ (H-hat) is called the Hamiltonian. What does it represent?",
    choices: [
      "The mass of the system",
      "The momentum of the particle",
      "The total energy operator: kinetic energy plus potential energy",
      "The angular momentum operator",
    ],
    correctIndex: 2,
    explanation:
      "Ĥ = T̂ + V̂ — kinetic energy plus potential energy, expressed as operators. The Schrödinger equation iℏ ∂ψ/∂t = Ĥψ says: the rate of change of ψ in time is governed by the system's total energy. Solving Ĥψ = Eψ gives the allowed energy levels of bound systems, like electron orbitals.",
  },
  {
    id: "schrodinger-i",
    prompt:
      "Why does the imaginary unit i (√-1) appear in the time-dependent Schrödinger equation?",
    choices: [
      "It's a mathematical convenience that could be eliminated",
      "Without it, the equation describes diffusion (decay) rather than wave-like quantum evolution",
      "It accounts for friction or energy dissipation in the system",
      "It only appears once relativity is included",
    ],
    correctIndex: 1,
    explanation:
      "The i is fundamental, not cosmetic. Without it, ∂ψ/∂t would equal a real expression and the equation would behave like a heat/diffusion equation — solutions decay rather than oscillate. The i turns time evolution into unitary rotations in complex Hilbert space, preserving probability and enabling quantum interference.",
  },
  {
    id: "schrodinger-eigenvalue",
    prompt:
      "What does it mean physically when ψ satisfies the time-independent equation Ĥψ = Eψ?",
    choices: [
      "The particle is momentarily at rest",
      "The system has no potential energy",
      "ψ is a 'stationary state' — measuring its energy yields E with certainty, and |ψ|² is constant in time",
      "Time has been factored out and no longer applies",
    ],
    correctIndex: 2,
    explanation:
      "Eigenstates of the Hamiltonian are 'stationary states': their probability density |ψ|² doesn't change in time — only an overall phase rotates as e^(-iEt/ℏ). Solving Ĥψ = Eψ for an atom yields its allowed energy levels, which is the foundation of atomic physics and chemistry.",
  },
  {
    id: "slac-quark-discovery",
    prompt:
      "The first experimental evidence for quarks — point-like constituents inside the proton — came from deep inelastic scattering experiments conducted in 1968-69 at:",
    choices: [
      "CERN, Switzerland",
      "SLAC at Stanford, California",
      "Fermilab, Illinois",
      "Brookhaven National Laboratory, New York",
    ],
    correctIndex: 1,
    explanation:
      "The SLAC-MIT collaboration fired high-energy electrons at protons and found they scattered off three small hard cores inside — exactly as Bjorken and Feynman's parton model predicted. Murray Gell-Mann had proposed quarks theoretically in 1964; SLAC made them physically real. Friedman, Kendall, and Taylor won the 1990 Nobel Prize for the work.",
  },
];
