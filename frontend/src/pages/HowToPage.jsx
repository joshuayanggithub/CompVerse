import Header from "../components/lobby/Header";

export default function HowToPage() {
  return (
    <div className="flex w-full h-full p-5 box-border gap-3">
      <div className="flex flex-col h-full w-full">
        <div className="h-[5%] w-full">
          <Header />
        </div>
        <div className="h-[95%] w-full flex flex-col items-center justify-center gap-[4rem]">
          <h1 className="text-xl">Greatness</h1>
          <p className="text-lg font-jost">
            Messi Won the Ballon D’or 8 Times. LeBron went to the NBA after high
            school and is the league’s all time greatest scorer (and player) of
            all time. Jeffrey Shaw founded Interactive Brokers in 2006. Braden
            Ou Joined the Dublin Youth Advisory Council in 2023.
          </p>

          <h1>Mathcounts Countdown Round</h1>
          <p className="text-lg font-jost">
            High scoring individuals compete head-to-head until a champion is
            crowned. People compete from off a screen taking 45 seconds or less
            to finish the problem. The Countdown round is run differently in
            various different chapter, state, and national competitions. In the
            national competitions, it is the round that determines the champion.
            Calculators are not allowed, but scratch paper will be provided.
          </p>

          <h1>National Science Bowl</h1>
          <p className="text-lg font-jost">
            The U.S. Department of Energy (DOE) National Science Bowl® is a
            nationwide academic competition that tests students’ knowledge in
            all areas of science and mathematics. Middle and high school student
            teams from diverse backgrounds are comprised of four students, one
            alternate, and a teacher who serves as an advisor and coach. These
            teams face-off in a fast-paced question-and-answer format, being
            tested on a range of science disciplines including biology,
            chemistry, Earth science, physics, energy, and math.
          </p>
        </div>
      </div>
    </div>
  );
}
