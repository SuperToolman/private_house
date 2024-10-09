export const getRandomColorCode = () => {
    const makingColorCode = '0123456789ABCDEF';
    let finalCode = '#';
    for (let counter = 0; counter < 6; counter++) {
        finalCode =finalCode+ makingColorCode[Math.floor(Math.random() * 16)];
    }
    return finalCode;
}

export const conversionTime = (timeBySecond) => {
    const hours = Math.floor(timeBySecond / 3600); // 获取小时
    const minutes = Math.floor((timeBySecond % 3600) / 60); // 获取分钟
    const seconds = timeBySecond % 60; // 获取秒

    let result = "";

    if (hours > 0) {
        result += hours + "小时";
    }
    if (minutes > 0 || hours > 0) { // 如果有小时，就总是显示分钟
        result += minutes + "分钟";
    }
    result += seconds + "秒";

    return result;
}