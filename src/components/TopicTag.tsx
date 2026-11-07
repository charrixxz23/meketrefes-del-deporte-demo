import { TOPICS } from "../data/topics";
import type { TopicId } from "../data/types";

const TONE = {
  lime: "bg-lime text-navy",
  blue: "bg-blue text-white",
  navy: "bg-navy text-white",
  white: "bg-white text-navy",
} as const;

export function TopicTag({ topic, tone = "lime", full = false }: { topic: TopicId; tone?: keyof typeof TONE; full?: boolean }) {
  return (
    <span className={`tag ${TONE[tone]}`}>
      <span>{full ? TOPICS[topic].label : TOPICS[topic].short}</span>
    </span>
  );
}
