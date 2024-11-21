//请求的API统一管理
import user from './api/user/api-user.js';
import userTag from "./api/user/api-userTag.js";

import video from './api/video/api-video.js';
import videoArea from './api/video/api-videoArea'
import videoHistoryAuditStatus from "./api/video/api-videoHistoryAuditStatus";

import manga from './api/manga/api-manga'

import systemMenu from './api/system/api-systemMenu'
import systemConfig from './api/system/api-systemConfig'
import systemFile from './api/system/api-systemFile'
import systemTag from './api/system/api-systemTag'



// 下面可以分环境打包
export const api = {
    userApi: new user(),
    userTagApi:new userTag(),

    videoApi:new video(),
    videoAreaApi:new videoArea(),
    videoHistoryAuditStatusApi:new videoHistoryAuditStatus(),

    mangaApi:new manga(),

    systemMenuApi:new systemMenu(),
    systemConfig:new systemConfig(),
    systemFile:new systemFile(),
    systemTagApi:new systemTag(),
}