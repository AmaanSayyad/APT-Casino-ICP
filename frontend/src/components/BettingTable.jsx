
const BettingTable = ({ data }) => (
  <div className="w-96 flex items-center justify-center flex-col">
    <h2 className="text-2xl font-semibold text-white text-left">
      {data.title}
    </h2>
    <p className="text-gray-300 mt-2 text-center">{data.description}</p>
  </div>
);

export default BettingTable;
