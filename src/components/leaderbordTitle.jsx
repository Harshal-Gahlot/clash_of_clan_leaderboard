export default function LeaderboardTitle() {
    return (
        <div className='display flex gap-8 items-center'>
            <img src='clan_icon.png' alt='leaderboard icon' className='h-48' />
            <div className='flex flex-col gap-8'>
                <div className='text-yellow-500 font-clash_regular text-5xl'>Leader Board</div>
                <div className='text-4xl text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 font-funnel_display max-w-fit'>Tirnity Elite</div>
            </div>
        </div>
    );
}
