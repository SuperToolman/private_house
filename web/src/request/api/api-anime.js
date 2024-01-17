import myAxios from "../axios.js";

export default {
    LoadAnimesByAnimeGroupId:(animeGroupId)=>{
        return myAxios({
            method:'get',
            url:`/Anime/LoadAnimesByAnimeGroupId?animeGroupId=${animeGroupId}`
        })
    },
    LoadHotAnimeGroupsByCount:(getCount)=>{
        return myAxios({
            method:'get',
            url:`/Anime/LoadHotAnimeGroupsByCount?getCount=${getCount}`
        })
    },
    LoadTheRelevantGroupAnimesAccordingToAnimeId:(animeId)=>{
        return myAxios({
            method:'get',
            url:`/Anime/LoadTheRelevantGroupAnimesAccordingToAnimeId?animeId=${animeId}`
        })
    },
}