/**
 * Configuration for Arooba's Confession Website
 * 
 * You can easily customize any of the text, names, passwords,
 * or even add your own audio file link here!
 */

export interface ConfessionConfig {
  herName: string;
  senderName: string;
  secretPassword: string;
  wrongPasswordMessages: string[];
  audioUrl?: string; // Optional custom mp3 URL. If empty, the built-in soft music box plays!
  
  letterLines: string[];
  sweetMessage: {
    title: string;
    paragraphs: string[];
  };
}

export const confessionConfig: ConfessionConfig = {
  herName: "Arooba",
  senderName: "Me",
  secretPassword: "arooba",
  
  wrongPasswordMessages: [
    "Nopeee 😭💕 try again.",
    "Arooba... you know your own password 😭",
    "Hmmmm... suspicious 👀💗",
    "Almostttt 🥺",
    "Wait... are you really Arooba? 🤨💗",
    "Hint: it's literally your name hehe 🤭",
  ],

  letterLines: [
    "You know what's funny?",
    "We've talked.",
    "We've laughed.",
    "We've annoyed each other. 😂",
    "We've had our little moments.",
    "And somewhere along the way...",
    "you became really special to me.",
    "And apparently...",
    "I forgot to do one very important thing. 😭"
  ],

  sweetMessage: {
    title: "Okay... one serious thing.",
    paragraphs: [
      "Thank you for being you.",
      "Thank you for the laughs, the conversations, the little moments, and all the times you've made an ordinary day feel a little better.",
      "I don't know what every future moment will look like...",
      "but I'm really happy that I get to make some of those moments with you. 💗"
    ]
  }
};
