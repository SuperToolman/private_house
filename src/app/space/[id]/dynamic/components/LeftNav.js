'use client';

const LeftNav = ({ activeType, onTypeChange }) => {
    const navItems = [
        { id: 'all', text: '全部' },
        { id: 'video', text: '视频' }
    ];

    return (
        <div className="left-nav w-[200px]">
            {navItems.map((item) => (
                <div
                    key={item.id}
                    className={`py-3 px-4 rounded-lg cursor-pointer mb-2 ${
                        activeType === item.id ? 'bg-[#00aeec] text-white' : 'text-[#61666d] hover:bg-[#EBEBEB] transition-all duration-300 ease-in-out'
                    }`}
                    onClick={() => onTypeChange(item.id)}
                >
                    {item.text}
                </div>
            ))}
        </div>
    );
};

export default LeftNav; 