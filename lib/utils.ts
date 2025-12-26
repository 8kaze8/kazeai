export function getRandomRotation(): number {
  const rotations = [-2, -1, 0, 1, 2];
  return rotations[Math.floor(Math.random() * rotations.length)];
}

export function getRandomOffset(): number {
  const offsets = [2, 3, 4, -2, -3, -4];
  return offsets[Math.floor(Math.random() * offsets.length)];
}

export function getRandomAlbaMessage(): string {
  const messages = [
    "Kadir is currently coding workflows...",
    "n8n automation in progress!",
    "Rolling for initiative...",
    "Checking hydroponic sensors...",
    "Meow! 🐱",
    "Building something cool...",
    "D20 roll: Natural 20!",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

