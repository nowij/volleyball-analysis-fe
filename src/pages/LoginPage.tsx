import { useState } from 'react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                {/* 로고 & 타이틀 */}
                <div className="text-center mb-10">
                    <div className="text-5xl mb-4">🏐</div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        VPAS
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Volleyball Performance Analysis System
                    </p>
                </div>

                {/* 로그인 카드 */}
                <div className="bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700">
                    <h2 className="text-lg font-semibold text-white mb-6">로그인</h2>

                    <div className="space-y-4">

                        {/* 이메일 */}
                        <div>
                            <label className="block text-sm text-slate-400 mb-1.5">
                                이메일
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="이메일을 입력하세요"
                                className="
                  w-full px-4 py-2.5 rounded-lg
                  bg-slate-700 border border-slate-600
                  text-white placeholder-slate-500
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                  transition
                "
                            />
                        </div>

                        {/* 비밀번호 */}
                        <div>
                            <label className="block text-sm text-slate-400 mb-1.5">
                                비밀번호
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호를 입력하세요"
                                className="
                  w-full px-4 py-2.5 rounded-lg
                  bg-slate-700 border border-slate-600
                  text-white placeholder-slate-500
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                  transition
                "
                            />
                        </div>

                        {/* 로그인 버튼 */}
                        <button
                            type="button"
                            className="
                w-full py-2.5 rounded-lg font-semibold text-sm
                bg-blue-600 hover:bg-blue-500 text-white
                transition mt-2
              "
                        >
                            로그인
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}