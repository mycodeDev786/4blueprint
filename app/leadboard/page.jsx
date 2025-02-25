<div className="flex justify-center space-x-4 mb-6">
  <button
    className="bg-[#673AB7] text-white px-4 py-2 rounded-lg hover:bg-blue-600"
    onClick={() => handleLeaderboardClick("Top 10 Sales (Monthly)")}
  >
    Top 10 Sales (Monthly)
  </button>
  <button
    className="bg-[#673AB7] text-white px-4 py-2 rounded-lg hover:bg-green-600"
    onClick={() => handleLeaderboardClick("Top 10 New Followers (Monthly)")}
  >
    Top 10 New Followers (Monthly)
  </button>
</div>;
