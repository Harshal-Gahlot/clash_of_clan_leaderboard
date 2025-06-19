import useFetch from "../utility/useFetch";
import LeaderboardList from "../components/leaderboardList";
import LeaderboardTitle from "../components/leaderbordTitle";

export default function Leaderboard() {
    // const { data: clanData, loading, error } = useFetch('http://localhost:3000/api/clans/search_clan_with_tag/2PJLCURQQ/');
    const { data: clanData, loading, error } = useFetch('https://clash-of-clan-leaderboard.onrender.com/api/clans/search_clan_with_tag/2PJLCURQQ/');
    console.log("clanData:", clanData);
    console.log("loading:", loading);
    console.log("error:", error);
    if (loading) {
        return (
            <div className='flex flex-col items-center pt-32'>
                <div className='text-white text-2xl'>Loading...</div>
            </div>
        );
    } else if (error) {
        return (
            <div className='flex flex-col items-center pt-32'>
                <div className='text-red-500 text-2xl'>Error: {error.message}</div>
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center pt-32'>
            <LeaderboardTitle clanData={clanData} />
            <LeaderboardList clanData={clanData} />
        </div>
    );
}
