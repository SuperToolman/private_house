/**
 * 随机获取颜色代码
 * @returns {string,"例如#ffffff"}
 */
export const getRandomColorCode = () => {
    const makingColorCode = '0123456789ABCDEF';
    let finalCode = '#';
    for (let counter = 0; counter < 6; counter++) {
        finalCode =finalCode+ makingColorCode[Math.floor(Math.random() * 16)];
    }
    return finalCode;
}

/**
 * 转换时间
 * @param timeBySecond
 * @returns {string,"中文的日期格式，例如：3小时4分钟5秒"}
 */
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

/**
 * 将数组（支持递归），转换为字符串信息
 * @param input
 * @param delimiter
 * @returns {*}
 */
export const flattenAndJoin = (input, delimiter = '\n')=>{
    // 递归处理每个值
    const flatten = (data) => {
        if (Array.isArray(data)) {
            // 如果是数组，递归处理每个元素
            return data.reduce((acc, val) => acc.concat(flatten(val)), []);
        } else if (typeof data === 'object' && data !== null) {
            // 如果是对象，处理其所有值
            return Object.values(data).reduce((acc, val) => acc.concat(flatten(val)), []);
        } else {
            // 如果是基本值，直接返回
            return [data];
        }
    };

    // 展开数据并连接为字符串
    return flatten(input).join(delimiter);
}

/**
 * 将数组转换为字符串，例如['小兰','小绿'] > "小兰,小绿"
 * @param {Array} array - 要转换的数组
 * @param {string} separator - 分隔符，默认为 ','（英文逗号）
 * @returns {string} - 转换后的字符串
 */
export const arrayToString = (array, separator = ',') =>{
    if (!Array.isArray(array)) {
        throw new Error('参数必须是一个数组');
    }
    return array.join(separator);
}