import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { playerStatsAtom } from "../atoms/playerStatsAtom";

const Profile = () => {
  const user = useRecoilValue(userAtom);
  const playerStats = useRecoilValue(playerStatsAtom);

  if (!user) {
    return <p className="text-center mt-8 text-gray-500">No user data available. Please log in.</p>;
  }

  const { username, email } = user;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Profile
          </h2>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <dd className="mt-1 text-sm text-gray-900">{username}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">{email}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Games Played</dt>
              <dd className="mt-1 text-sm text-gray-900">{playerStats?.gamesPlayed || 0}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Wins</dt>
              <dd className="mt-1 text-sm text-gray-900">{playerStats?.wins || 0}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Losses</dt>
              <dd className="mt-1 text-sm text-gray-900">{playerStats?.losses || 0}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Draws</dt>
              <dd className="mt-1 text-sm text-gray-900">{playerStats?.draws || 0}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Rating</dt>
              <dd className="mt-1 text-sm text-gray-900">{playerStats?.rating || 0}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Profile;
