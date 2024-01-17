//请求的API统一管理
import user from './api/api-user.js';
import userCollect from "./api/api-userCollect.js";
import userTag from "./api/api-userTag.js";
import video from './api/api-video.js';
import videoComment from './api/api-videoComment.js'
import account from './api/api-account.js'
import area from './api/api-area.js'
import anime from './api/api-anime.js'


// 下面可以分环境打包
export const api = {
    userApi: user,
    userCollectApi:userCollect,
    userTagApi:userTag,
    videoApi:video,
    accountApi:account,
    videoCommentApi:videoComment,
    areaApi:area,
    animeApi:anime,
}