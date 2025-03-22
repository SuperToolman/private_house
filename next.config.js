/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@wangeditor/editor', '@wangeditor/editor-for-react'],
}

// 仅在部署到GitHub Pages时使用这些设置
if (process.env.DEPLOY_TARGET === 'github-pages') {
  Object.assign(nextConfig, {
    output: 'export',  // 启用静态导出
    basePath: '/private_house',  // 添加GitHub仓库名称作为基础路径
    images: {
        unoptimized: true,  // 对静态导出禁用图像优化
    },
    trailingSlash: true,  // 确保路径末尾有斜杠以兼容GitHub Pages
  });
}

module.exports = nextConfig 