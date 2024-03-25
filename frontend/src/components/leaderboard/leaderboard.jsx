export default function Leaderboard() {
  return (
    <div className="flex flex-col w-4/5">
      <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
        <thead className="border-b border-neutral-200 bg-white font-medium dark:border-white/10 dark:bg-body-dark">
          <tr>
            <th scope="col" className="px-6 py-4">
              #
            </th>
            <th scope="col" className="px-6 py-4">
              First
            </th>
            <th scope="col" className="px-6 py-4">
              Last
            </th>
            <th scope="col" className="px-6 py-4">
              Handle
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-neutral-200 bg-black/[0.02] dark:border-white/10">
            <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
            <td className="whitespace-nowrap px-6 py-4">Mark</td>
            <td className="whitespace-nowrap px-6 py-4">Otto</td>
            <td className="whitespace-nowrap px-6 py-4">@mdo</td>
          </tr>
          <tr className="border-b border-neutral-200 bg-white dark:border-white/10 dark:bg-body-dark">
            <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
            <td className="whitespace-nowrap px-6 py-4">Jacob</td>
            <td className="whitespace-nowrap px-6 py-4">Thornton</td>
            <td className="whitespace-nowrap px-6 py-4">@fat</td>
          </tr>
          <tr className="border-b border-neutral-200 bg-black/[0.02] dark:border-white/10">
            <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
            <td colSpan="2" className="whitespace-nowrap px-6 py-4 text-center">
              Larry the Bird
            </td>
            <td className="whitespace-nowrap px-6 py-4">@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
