export default function LeaderboardList() {
    const rankings = [1, 2, 3];
    // TODO: Show leaderbord ranking with good UI
    return (
        <div className=' font-clash_regular text-2xl'>
            <div className='text-yellow-600 flex justify-between items-center'>
                <div className='flex gap-4'>
                    <div>Rank</div>
                    <div>Name</div>
                </div>
                <div className='ml-24'>Score</div>
            </div>
            {/* <hr className='border-yellow-600' /> */}
            {rankings.map((rank) => (
                <div key={rank} className='text-white flex justify-between items-center py-2'>
                    <div className='flex gap-4'>
                        <div className="px-[1.5ch]">{rank}</div>
                        <div>User {rank}</div>
                    </div>
                    <div>{Math.floor(Math.random() * 1000)}</div>
                </div>
            ))}
        </div>
    );
}