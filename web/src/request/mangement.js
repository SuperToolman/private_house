//请求的API统一管理
import user from './api/user/api-user.js';
import userTag from "./api/user/api-userTag.js";

import video from './api/video/api-video.js';
import videoArea from './api/video/api-videoArea'
import videoTag from './api/video/api-videoTag'
import videoHistoryAuditStatus from "@request/api/video/api-videoHistoryAuditStatus";

import systemMenu from './api/system/api-systemMenu'
import systemConfig from './api/system/api-systemConfig'
import systemFile from './api/system/api-systemFile'


// 下面可以分环境打包
export const api = {
    userApi: new user(),
    userTagApi:new userTag(),

    videoApi:new video(),
    videoAreaApi:new videoArea(),
    videoTagApi:new videoTag(),
    videoHistoryAuditStatusApi:new videoHistoryAuditStatus(),

    systemMenuApi:new systemMenu(),
    systemConfig:new systemConfig(),
    systemFile:new systemFile()
}