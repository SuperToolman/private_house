import myAxios from '@request/axios.jsx';
import {BaseApi} from "@request/api/baseApi";
import {v4 as uuidv4} from "uuid";

export default class extends BaseApi{
    constructor() {
        super('Manga');
    }

    UploadToTemp = (files,config = {}) =>{
        // console.log('开始上传文件',file)
        const formData = new FormData();

        for (const file of files) {
            formData.append('files', file);
            // formData.append('paths', file.webkitRelativePath); // 将路径信息发送到后端
        }

        return myAxios({
            method: 'post',
            url: `/Manga/UploadToTemp`,
            data:formData,
            headers: {
                'Content-Type': 'multipart/form-data' // 设置请求头为 multipart/form-data，表示上传文件
            },
            maxContentLength: Infinity, // 设置最大内容长度为无限大
            ...config
        })
    }

    UploadToTempByZip = (file,config = {}) =>{
        const formData = new FormData();
        formData.append('file',file)

        return myAxios({
            method: 'post',
            url: `/Manga/UploadToTempByZip`,
            data:formData,
            headers: {
                'Content-Type': 'multipart/form-data' // 设置请求头为 multipart/form-data，表示上传文件
            },
            maxContentLength: Infinity, // 设置最大内容长度为无限大
            ...config
        })
    }

    GetByCombinationQuery = (auditStatus=-1,countOption = 0) =>{
        return myAxios({
            method: 'get',
            url: `/Manga/GetByCombinationQuery?auditStatus=${auditStatus}&mangaCountSortOption=${countOption}`,
        })
    }

    UpdateMangaReview = (manga) => {
        return myAxios({
            method: 'post',
            url: `/Manga/Review`,
            data: manga
        });
    }

    ReviewManga = (manga) => {
        return myAxios({
            method: 'post',
            url: `/Manga/Review`,
            data: manga
        });
    }

    RejectManga = (manga) => {
        return myAxios({
            method: 'post',
            url: `/Manga/Reject`,
            data: manga
        });
    }

}