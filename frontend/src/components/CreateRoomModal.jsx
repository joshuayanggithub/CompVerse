export function CreateRoomModal({ modalOpen, setModalOpen }) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-100 w-1/2 h-4/5 rounded-xl flex flex-col ">
      {/* <input type="checkbox"></input> */}
      <select name="game" id="game">
        <option value="sciencebowl">ScienceBowl</option>
        <option value="knowledgebowl">KnowledgeBowl</option>
        <option value="math">Math</option>
      </select>
      <select name="problems" id="problems">
        <option value="unlimited">Unlimited</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <button className="bg-blue-500" onClick={() => setModalOpen(false)}>
        Create Game
      </button>
    </div>
  );
}
