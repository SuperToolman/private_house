import RecommandGameList from "./components/RecommandGameList";
import GameRankList from "./components/GameRankList";
import GameCard from "./components/GameCard";

export default function GamePage() {
    return (
        <div className="w-[1584px] mx-auto">
            <div>
                <RecommandGameList />
            </div>
            {/* 游戏排名 */}
            <div className="grid grid-cols-3 gap-4">
                <GameRankList />
                <GameRankList />
                <GameRankList />
            </div>
            {/* 游戏卡片列表 */}
            <div className="space-y-10 mt-10">
                <GameCard />
                <GameCard />
                <GameCard />
                <GameCard />
                <GameCard />
                <GameCard />
                
            </div>
        </div>
    )
}
