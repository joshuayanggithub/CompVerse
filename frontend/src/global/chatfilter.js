import { RegExpMatcher, TextCensor, englishDataset, englishRecommendedTransformers } from "obscenity";
const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

const censor = new TextCensor();

export default function removeObscenity(input) {
  const matches = matcher.getAllMatches(input);
  return censor.applyTo(input, matches);
}
