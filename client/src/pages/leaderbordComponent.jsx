import LeaderboardList from "../components/leaderboardList";
import LeaderboardTitle from "../components/leaderbordTitle";

export default function Leaderboard() {
    return (
        <div className='flex flex-col items-center pt-32 h-screen'>
            <LeaderboardTitle />
            <LeaderboardList />
        </div>
    );
}
