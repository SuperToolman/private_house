
export default class FileHelper {
     static Base64StringToBlob = (base64String, fileType) => {
        // 移除Base64字符串的头部信息（data:image/png;base64,）
        const base64Data = base64String.split(',')[1];

        // 将Base64字符串转换为Uint8Array
        const byteCharacters = atob(base64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
            const slice = byteCharacters.slice(offset, offset + 1024);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        // 假设是PNG图像，根据实际情况修改MIME类型
        // 返回blob对象
         const blob = new Blob(byteArrays, {type: fileType})
         console.log('已将文件转换为blob：',blob)
        return blob
    }

    // 将 Blob 转换为 Base64 格式的字符串
     static BlobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    static GetBlobAndBase64StringForObject(file){
        return new Promise((resolve, reject) => {
            if (!file) {
                reject(new Error("No file provided"));
                return;
            }

            const reader = new FileReader();
            const resultObj = {
                dataURL: null,
                blob: file // 直接保存 Blob 对象
            };

            // 当FileReader加载完成时，获取Base64格式的数据
            reader.onload = function(e) {
                resultObj.dataURL = e.target.result; // 将Base64数据URL存储到resultObj中
                resolve(resultObj); // 文件读取完成后，返回包含dataURL和blob的对象
            };

            // 如果读取文件时出现错误，调用reject
            reader.onerror = function(error) {
                reject(error);
            };

            // 读取文件为DataURL(Base64)
            reader.readAsDataURL(file);
        });
    }
};