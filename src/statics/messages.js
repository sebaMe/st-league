import { getRandomInt } from "../utils/commons";

const messages = [
  "tightn'up your cheecks!",
  "Roooar!",
  "so shiny...",
  "...it's blazing!"
];

export const getRandomMessage = () => {
  return messages[getRandomInt(0, messages.length)];
};
