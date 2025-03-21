import { useState } from 'react';
import Link from 'next/link';

export default function LoginDialog({ onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordLogin, setIsPasswordLogin] = useState(true);
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleSwitchPasswordLogin = () => {
        setIsPasswordLogin(true);
    }

    const handleSwitchSmsLogin = () => {
        setIsPasswordLogin(false);
    }

    const handleLogin = async (event) => {
        event.preventDefault(); // 阻止表单的默认提交行为
        if (username === 'test' && password === 'password') {
            localStorage.setItem('token', 'test-token');
            onClose(true);
        } else {
            alert('用户名或密码错误');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-[600px] relative">
                <button 
                    onClick={() => onClose(false)} 
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    <i className="iconfont icon-close"></i>
                </button>
                <form onSubmit={handleLogin}>
                    <div className="flex items-center justify-center gap-8">
                        <div className="left text-center">
                            {/* 二维码登录 */}
                            <div className="text-lg font-semibold mb-4">二维码登录</div>
                            <div className="bg-gray-200 w-32 h-32 flex items-center justify-center rounded-lg">
                                <i className="iconfont icon-erweima" style={{ fontSize: '130px' }}></i>
                            </div>
                        </div>
                        <div className="right w-full">
                            {/* 账号密码登录 */}
                            {/* 密码登录和短信登录切换 */}
                            <div className="login-box-header mb-4">
                                <div className="login-box-header-switch flex justify-center items-center space-x-4">
                                    <div onClick={handleSwitchPasswordLogin} className={`login-box-header-switch-item cursor-pointer text-gray-500 text-[18px] ${isPasswordLogin ? 'text-blue-500' : ''}`}>密码登录</div>
                                    {/* 分割线 */}
                                    <div className="text-[14px] text-gray-500" >|</div>
                                    <div onClick={handleSwitchSmsLogin} className={`login-box-header-switch-item cursor-pointer text-gray-500 text-[18px] ${!isPasswordLogin ? 'text-blue-500' : ''}`}>短信登录</div>
                                </div>
                            </div>

                            {
                                isPasswordLogin ? (
                                    <>
                                        {/* input */}
                                        <div className="login-box-input mb-4">
                                            <div className="login-box-input-item mb-2 flex items-center justify-between border border-gray-300 rounded-lg px-4">
                                                <span className="w-[50px] text-gray-500 text-[14px]">账号</span>
                                                <input
                                                    type="text"
                                                    placeholder="请输入账号"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    className="border-none focus:outline-none w-full p-3 border border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="login-box-input-item mb-4 flex items-center justify-between border border-gray-300 rounded-lg px-4">
                                                <span className="w-[50px] text-gray-500 text-[14px]">密码</span>
                                                <input
                                                    type={isShowPassword ? 'text' : 'password'}
                                                    placeholder="请输入密码"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="border-none focus:outline-none w-full p-3 border border-gray-300 rounded"
                                                />
                                                {/* 显示密码 */}
                                                <div className="text-gray-500 text-[14px] w-[20px] text-right">
                                                    <i className={`iconfont ${isShowPassword ? 'icon-eye' : 'icon-eye-slash'}`} onClick={() => setIsShowPassword(!isShowPassword)}></i>
                                                </div>
                                                <span className="text-gray-500 text-[14px] w-[100px] text-right">
                                                    <Link href="/privacy" className="text-blue-500 hover:underline">忘记密码</Link>
                                                </span>
                                            </div>
                                        </div>
                                        {/* 按钮 */}
                                        <div className="login-box-button-group flex justify-between items-center space-x-4">
                                            <div className="login-box-button mb-4 flex-1 w-full rounded-lg overflow-hidden">
                                                <button
                                                    onClick={handleSwitchSmsLogin}
                                                    className="w-full py-3 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    注册
                                                </button>
                                            </div>
                                            <div className="login-box-button mb-4 flex-1 w-full rounded-lg overflow-hidden">
                                                <button
                                                    type="submit"
                                                    className="w-full py-3 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    登录
                                                </button>
                                            </div>
                                        </div>

                                    </>
                                ) : (
                                    <>
                                        {/* input */}
                                        <div className="login-box-input mb-4">
                                            <div className="login-box-input-item mb-2 flex items-center justify-between border border-gray-300 rounded-lg px-4">
                                                <span className="w-[70px] text-gray-500 text-[14px]">+86</span>
                                                <input
                                                    type="text"
                                                    placeholder="请输入手机号"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    className="border-none focus:outline-none w-full p-3 border border-gray-300 rounded"
                                                />
                                                <span className="text-gray-500 text-[14px] w-[120px] text-right">
                                                    <Link href="/privacy" className="text-blue-500 hover:underline">获取验证码</Link>
                                                </span>
                                            </div>
                                            <div className="login-box-input-item mb-4 flex items-center justify-between border border-gray-300 rounded-lg px-4">
                                                <span className="w-[50px] text-gray-500 text-[14px]">验证码</span>
                                                <input
                                                    type={isShowPassword ? 'text' : 'password'}
                                                    placeholder="请输入密码"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="border-none focus:outline-none w-full p-3 border border-gray-300 rounded"
                                                />
                                            </div>
                                        </div>
                                        {/* 按钮 */}
                                        <div className="login-box-button-group flex justify-between items-center space-x-4">
                                            <div className="login-box-button mb-4 flex-1 w-full rounded-lg overflow-hidden">
                                                <button
                                                    type="submit"
                                                    className="w-full py-3 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    登录/注册
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )
                            }


                            {/* 其他登录方式 */}
                            <div className="text-center text-gray-600 text-[14px] mb-4">其他登录方式</div>
                            <div className="login-box-other flex items-center mb-4  justify-center space-x-4">
                                <div className="login-box-other-item flex items-center cursor-pointer">
                                    <i className="iconfont icon-qq mr-1"></i>
                                    <div className="login-box-other-item-text text-gray-600">QQ登录</div>
                                </div>
                                <div className="login-box-other-item flex items-center cursor-pointer">
                                    <i className="iconfont icon-weixin mr-1"></i>
                                    <div className="login-box-other-item-text text-gray-600">微信登录</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-tips text-center text-sm text-gray-600 mt-4">
                        <span>未注册过的手机号，我们将自动帮你注册账号</span>
                        <br />
                        <span>登陆或完成注册即表示你同意</span>
                        <span>
                            <Link href="/privacy" className="text-blue-500 hover:underline">用户协议</Link>
                            和
                            <Link href="/privacy" className="text-blue-500 hover:underline">隐私政策</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}