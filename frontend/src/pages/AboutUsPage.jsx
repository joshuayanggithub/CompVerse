import Header from "../components/nav/Header";

export default function AboutUsPage() {
  return (
    <div className="flex flex-col w-full h-full p-5 box-border gap-3">
      <div className="flex flex-col h-full w-full">
        <div className="h-[5%] w-full">
          <Header />
        </div>
      </div>
      <div className="h-[95%] w-full px-20 pt-12">
        {/* <div className="flex justify-between">
          <div className="flex flex-col w-1/3">
            <h1 className="text-5xl font-jockey py-3">Who Are "We"</h1>
            <h2 className="font-jost text-xl italic">
              Science Bowl, Quiz Bowl, Mathcounts Countdown, Mathleague Countdown are all competitions for secondary school students who love to learn and compete. This app is for people who want to
              <span className="text-trophygold  font-bold"> do better</span>
            </h2>
          </div>
          <img className="w-1/2" src="/peoplecompeting.jpg" alt="competition" />
        </div> */}
        <div className=" w-full grid grid-cols-2 px-12  gap-20">
          <div className="flex flex-col items-start h-1/2">
            <h1 className="text-lg font-bold font-jockey">Mathcounts Countdown</h1>
            <p className="">
              In each in-person round, two competitors compete head-to-head at the same table. They are given a question simultaneously displayed on a projector and each has less than 45 seconds to
              “buzz in” and answer the question. They both have one attempt to answer the question correctly and earn a point. There are normally four questions in total. Here's a sample of the{" "}
              <a href="https://www.youtube.com/watch?v=dSnOLW_W6og" className="text-turquoise underline">
                National Countdown round
              </a>{" "}
              you can watch on YouTube.
            </p>
            <img src="/aboutus/mathcounts.jpg" alt="mathcounts" className="w-full" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Science Bowl</h1>
            <p>
              Two teams of typically four students each compete to answer questions on a wide range of science and math topics posed by a moderator. Points are awarded for correct answers, and
              deductions may occur for incorrect responses. The competition follows a structured format with rounds of toss-up and bonus questions, culminating in a final round to determine the
              winner.
            </p>
            <img src="/aboutus/sciencebowl.jpg" alt="waiting room" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Quiz Bowl</h1>
            <p>
              Quiz bowl competitions are contests where teams of students compete to answer questions spanning various academic disciplines, including literature, history, science, fine arts, and
              current events. Matches typically involve two teams of four players each, with a moderator presenting questions that can be answered individually or collaboratively. Teams earn points
              for correct responses, with no penalties for incorrect guesses. teamwork.
            </p>
            <img src="/aboutus/quizbowl.jpg" alt="quiz bowl" />
          </div>
          <div className="h-1/2">
            <h1 className="text-lg font-bold">Mathleague Countdown</h1>
            <p>
              Mathleague's spinoff of Mathcounts Countdown! The different is that Mathleague is more widespread and competitions are hosted at local high schools much more often every week rather than
              annually
            </p>
            <img src="/aboutus/mathleague.png" alt="rating" className="w-11/12" />
          </div>
        </div>
      </div>
    </div>
  );
}
