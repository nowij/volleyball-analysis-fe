import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
    LayoutDashboard,
    Video,
    Users,
    BarChart2,
    Search,
    Film,
    FileText,
    MessageSquare,
    ChevronLeft,
    LogOut,
    Menu,
} from 'lucide-react'

// 역할별 메뉴 구성
const MENU_ITEMS = [
    {
        label: '대시보드',
        icon: LayoutDashboard,
        path: '/dashboard',
        roles: ['DIRECTOR', 'COACH', 'ANALYST', 'PLAYER'],
    },
    {
        label: '경기 관리',
        icon: Video,
        path: '/matches',
        roles: ['ANALYST', 'COACH'],
    },
    {
        label: '선수 분석',
        icon: BarChart2,
        path: '/players/1/stats',
        roles: ['DIRECTOR', 'COACH', 'ANALYST'],
    },
    {
        label: '팀 전술',
        icon: BarChart2,
        path: '/team/tactics',
        roles: ['DIRECTOR', 'COACH', 'ANALYST'],
    },
    {
        label: '경기 분석',
        icon: Search,
        path: '/matches/1/analysis',
        roles: ['DIRECTOR', 'COACH', 'ANALYST'],
    },
    {
        label: '스카우팅',
        icon: Search,
        path: '/scouting',
        roles: ['DIRECTOR', 'COACH', 'ANALYST'],
    },
    {
        label: '영상 라이브러리',
        icon: Film,
        path: '/videos',
        roles: ['DIRECTOR', 'COACH', 'ANALYST'],
    },
    {
        label: '보고서',
        icon: FileText,
        path: '/reports',
        roles: ['DIRECTOR', 'COACH', 'ANALYST'],
    },
    {
        label: '선수 관리',
        icon: Users,
        path: '/players',
        roles: ['DIRECTOR', 'COACH'],
    },
    {
        label: '내 피드백',
        icon: MessageSquare,
        path: '/my/feedback',
        roles: ['PLAYER'],
    },
]

interface Props {
    children: React.ReactNode
    // 나중에 실제 유저 연결 전까지 임시로 role 직접 받음
    role?: 'DIRECTOR' | 'COACH' | 'ANALYST' | 'PLAYER'
    userName?: string
}

export default function Layout({
                                   children,
                                   role = 'ANALYST',
                                   userName = '박분석',
                               }: Props) {
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()

    const visibleMenus = MENU_ITEMS.filter((m) => m.roles.includes(role))

    const roleLabel = {
        DIRECTOR: '감독',
        COACH: '코치',
        ANALYST: '분석가',
        PLAYER: '선수',
    }[role]

    const roleBadgeColor = {
        DIRECTOR: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        COACH: 'bg-green-500/20 text-green-400 border-green-500/30',
        ANALYST: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        PLAYER: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    }[role]

    return (
        <div className="min-h-screen bg-slate-900 flex">

            {/* 사이드바 */}
            <aside
                className={`
          flex flex-col bg-slate-800 border-r border-slate-700
          transition-all duration-300 flex-shrink-0
          ${collapsed ? 'w-16' : 'w-56'}
        `}
            >
                {/* 로고 */}
                <div className="flex items-center justify-between px-4 h-14 border-b border-slate-700">
                    {!collapsed && (
                        <div className="flex items-center gap-2">
                            <span className="text-xl">🏐</span>
                            <span className="font-bold text-white text-sm tracking-tight">
                V-PAS
              </span>
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed((p) => !p)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition ml-auto"
                    >
                        {collapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
                    </button>
                </div>

                {/* 유저 정보 */}
                {!collapsed && (
                    <div className="px-4 py-3 border-b border-slate-700">
                        <p className="text-sm font-medium text-white">{userName}</p>
                        <span
                            className={`
                inline-block mt-1 text-xs px-2 py-0.5 rounded-full border
                ${roleBadgeColor}
              `}
                        >
              {roleLabel}
            </span>
                    </div>
                )}

                {/* 메뉴 */}
                <nav className="flex-1 py-3 space-y-0.5 px-2 overflow-y-auto">
                    {visibleMenus.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                transition cursor-pointer
                ${isActive
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-400 hover:text-white hover:bg-slate-700'
                            }
                ${collapsed ? 'justify-center' : ''}
              `}
                            title={collapsed ? item.label : undefined}
                        >
                            <item.icon size={17} className="flex-shrink-0" />
                            {!collapsed && <span>{item.label}</span>}
                        </NavLink>
                    ))}
                </nav>

                {/* 로그아웃 */}
                <div className="px-2 py-3 border-t border-slate-700">
                    <button
                        onClick={() => navigate('/login')}
                        className={`
              flex items-center gap-3 px-3 py-2 rounded-lg text-sm w-full
              text-slate-400 hover:text-white hover:bg-slate-700 transition
              ${collapsed ? 'justify-center' : ''}
            `}
                        title={collapsed ? '로그아웃' : undefined}
                    >
                        <LogOut size={17} className="flex-shrink-0" />
                        {!collapsed && <span>로그아웃</span>}
                    </button>
                </div>
            </aside>

            {/* 메인 콘텐츠 */}
            <main className="flex-1 flex flex-col min-w-0">
                {children}
            </main>

        </div>
    )
}