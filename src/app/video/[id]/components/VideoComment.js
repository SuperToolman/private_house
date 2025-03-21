export default function VideoComment({commentItems}){
    return (
        <div className="space-y-2.5">
            {commentItems.map((item) => (
                <div className="flex mb-2.5" key={item.id}>
                    {/* 发言者头像 */}
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-[15px]">
                        <img 
                            src={item.userItem.avatarUrl} 
                            alt="" 
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* 发言内容 */}
                    <div className="flex-1 space-y-2.5 pb-2.5 mb-2.5 border-b border-[#e5e5e5]">
                        <div className="text-[13px] text-[#61666d] h-[30px] flex items-center">
                            {item.userItem.name}
                        </div>
                        <div className="text-[15px] text-[#18191C]">
                            {item.content}
                        </div>
                        {/* 评论数据 */}
                        <div className="flex text-[13px] text-[#9499a0]">
                            <div className="mr-5">{item.releaseTime}</div>
                            <div>{item.likeCount}</div>
                        </div>
                        {/* 子评论 */}
                        <div className="mt-2.5">
                            {item.children && item.children.length > 0 && (
                                <VideoComment commentItems={item.children}/>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
