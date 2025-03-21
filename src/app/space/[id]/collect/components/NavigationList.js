'use client';

const NavigationList = ({ collections, activeId, onSelect }) => {
    return (
        <div className="navigation-list w-[240px] bg-white rounded-lg p-4 shadow-lg">
            <div className="mb-6">
                <div className="text-[16px] font-medium mb-3">我的收藏夹</div>
                <div className="space-y-2">
                    {collections.myCollections.map(collection => {
                        const isActive = activeId === collection.id;
                        return (
                            <div
                                key={collection.id}
                                className={`h-[50px] flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-[#f6f7f8] ${
                                    isActive ? 'bg-[#00aeec] hover:bg-[#00aeec]' : ''
                                }`}
                                onClick={() => onSelect(collection.id)}
                            >
                                <div className="flex items-center">
                                    <i className={`iconfont ${collection.isPrivate ? 'icon-lock' : 'icon-folder'} mr-2 ${isActive ? 'text-white' : 'text-[#9499a0]'}`}></i>
                                    <span className={`text-[14px] ${isActive ? 'text-white' : 'text-[#18191c]'}`}>{collection.title}</span>
                                </div>
                                <span className={`text-[12px] ${isActive ? 'text-white' : 'text-[#9499a0]'}`}>{collection.count}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div>
                <div className="text-[16px] font-medium mb-3">TA的收藏</div>
                <div className="space-y-2">
                    {collections.followingCollections.map(collection => {
                        const isActive = activeId === collection.id;
                        return (
                            <div
                                key={collection.id}
                                className={`h-[50px] flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-[#f6f7f8] ${
                                    isActive ? 'bg-[#00aeec] hover:bg-[#00aeec]' : ''
                                }`}
                                onClick={() => onSelect(collection.id)}
                            >
                                <div className="flex items-center">
                                    <i className={`iconfont icon-folder mr-2 ${isActive ? 'text-white' : 'text-[#9499a0]'}`}></i>
                                    <span className={`text-[14px] ${isActive ? 'text-white' : 'text-[#18191c]'}`}>{collection.title}</span>
                                </div>
                                <span className={`text-[12px] ${isActive ? 'text-white' : 'text-[#9499a0]'}`}>{collection.count}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default NavigationList; 