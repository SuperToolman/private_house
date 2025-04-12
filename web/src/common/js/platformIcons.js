/**
 * 平台图标映射配置
 * key: 平台名称
 * value: 对应的 iconfont 类名
 */
const platformIcons = {
  // 社交媒体平台
  'YouTube': 'icon-platform-youtube',
  'BiliBili': 'icon-platform-bilibili',
  'X': 'icon-platform-x',
  'Twitter': 'icon-platform-x',
  'Patreon': 'icon-platform-patreon',



  'Facebook': 'icon-platform-facebook',
  'Instagram': 'icon-platform-instagram',
  'LinkedIn': 'icon-platform-linkedin',
  'Reddit': 'icon-platform-reddit',
  
  // 创作平台
  'Twitch': 'icon-platform-twitch',
  
  'Ko-fi': 'icon-platform-kofi',
  
  // 开发平台
  'GitHub': 'icon-platform-github',
  'GitLab': 'icon-platform-gitlab',
  'CodePen': 'icon-platform-codepen',
  
  // 设计平台
  'Dribbble': 'icon-platform-dribbble',
  'Behance': 'icon-platform-behance',
  'ArtStation': 'icon-platform-artstation',
  
  // 写作平台
  'Medium': 'icon-platform-medium',
  'Substack': 'icon-platform-substack',
  
  // 其他平台
  'Discord': 'icon-platform-discord',
  'Steam': 'icon-platform-steam',
  'Telegram': 'icon-platform-telegram',
};

/**
 * 获取平台对应的图标类名
 * @param {string} platformName - 平台名称
 * @returns {string} 对应的图标类名，如果未找到则返回默认图标
 */
export const getPlatformIconClass = (platformName) => {
  return platformIcons[platformName] || 'icon-platform-link';
};

/**
 * 检查平台是否支持
 * @param {string} platformName - 平台名称
 * @returns {boolean} 是否支持该平台
 */
export const isPlatformSupported = (platformName) => {
  return platformName in platformIcons;
};

/**
 * 获取所有支持的平台列表
 * @returns {string[]} 支持的平台名称数组
 */
export const getSupportedPlatforms = () => {
  return Object.keys(platformIcons);
};

/**
 * 获取平台图标配置
 * @returns {Object} 完整的平台图标配置对象
 */
export const getPlatformIcons = () => {
  return { ...platformIcons };
};

export default {
  getPlatformIconClass,
  isPlatformSupported,
  getSupportedPlatforms,
  getPlatformIcons,
};
