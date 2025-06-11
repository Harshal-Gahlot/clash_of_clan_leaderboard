import useFetch from "../utility/useFetch";
export default function LeaderboardList({ clanData }) {
    const { data: members, loading, error } = useFetch('http://localhost:3000/api/clans/2PJLCURQQ/clan_members/');

    if (loading) {
        return <div className='text-white text-2xl'>Loading...</div>;
    } else if (error) {
        return <div className='text-red-500 text-2xl'>Error: {error.message}</div>;
    }

    members.sort((a, b) => b.expLevel - a.expLevel); // Sort members by expLevel in descending order

    // TODO: Show leaderbord ranking with good UI
    return (
        <div className='font-clash_regular text-2xl'>
            <div className='text-yellow-600 flex justify-between items-center'>
                <div className='flex gap-4'>
                    <div>Rank</div>
                    <div>Name</div>
                </div>
                <div className='ml-24'>Exp Level</div>
            </div>
            {/* <hr className='border-yellow-600' /> */}
            {members.map((member, index) => (
                <div key={member.tag} className='text-white flex justify-between items-center py-2'>
                    <div className='flex gap-4'>
                        <div className="px-[1.5ch]">{index + 1}</div>
                        <div>{member.name}</div>
                    </div>
                    <div>{member.expLevel}</div>
                </div>
            ))}
        </div>
    );
}