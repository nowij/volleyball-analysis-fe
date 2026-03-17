import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Video, ChevronRight, Upload } from 'lucide-react'
import Layout from '../components/common/Layout'

interface Match {
    id: number
    date: string
    home: string
    away: string
    homeScore: number
    awayScore: number
    season: string
    venue: string
    codingStatus: 'DONE' | 'IN_PROGRESS' | 'NONE'
}

// 임시 Mock 데이터
const MOCK_MATCHES: Match[] = [
    {
        id: 1,
        date: '2025.03.08',
        home: '흥국생명',
        away: 'GS칼텍스',
        homeScore: 3,
        awayScore: 1,
        season: '2024-25 V리그',
        venue: '인천 삼산월드체육관',
        codingStatus: 'DONE',
    },
    {
        id: 2,
        date: '2025.03.05',
        home: '현대건설',
        away: '흥국생명',
        homeScore: 2,
        awayScore: 3,
        season: '2024-25 V리그',
        venue: '수원 실내체육관',
        codingStatus: 'IN_PROGRESS',
    },
    {
        id: 3,
        date: '2025.03.01',
        home: '흥국생명',
        away: 'IBK기업은행',
        homeScore: 3,
        awayScore: 0,
        season: '2024-25 V리그',
        venue: '인천 삼산월드체육관',
        codingStatus: 'NONE',
    },
    {
        id: 4,
        date: '2025.02.26',
        home: 'KGC인삼공사',
        away: '흥국생명',
        homeScore: 1,
        awayScore: 3,
        season: '2024-25 V리그',
        venue: '대전 충무체육관',
        codingStatus: 'DONE',
    },
    {
        id: 5,
        date: '2025.02.22',
        home: '흥국생명',
        away: '페퍼저축은행',
        homeScore: 3,
        awayScore: 2,
        season: '2024-25 V리그',
        venue: '인천 삼산월드체육관',
        codingStatus: 'NONE',
    },
]

const STATUS_CONFIG = {
    DONE: {
        label: '코딩 완료',
        className: 'bg-green-500/20 text-green-400 border-green-500/30',
    },
    IN_PROGRESS: {
        label: '코딩 중',
        className: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    },
    NONE: {
        label: '미코딩',
        className: 'bg-slate-600/50 text-slate-400 border-slate-600',
    },
}

export default function MatchListPage() {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [showRegisterModal, setShowRegisterModal] = useState(false)

    const filtered = MOCK_MATCHES.filter(
        (m) =>
            m.home.includes(search) ||
            m.away.includes(search) ||
            m.date.includes(search)
    )

    return (
        <Layout>
            <div className="p-6 space-y-6">

                {/* 헤더 */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-white">경기 관리</h1>
                        <p className="text-sm text-slate-400 mt-0.5">
                            경기를 등록하고 영상 코딩 상태를 관리합니다
                        </p>
                    </div>
                    <button
                        onClick={() => setShowRegisterModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition"
                    >
                        <Plus size={16} />
                        경기 등록
                    </button>
                </div>

                {/* 검색 */}
                <div className="relative">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="팀명 또는 날짜로 검색"
                        className="
              w-full pl-9 pr-4 py-2.5 rounded-lg
              bg-slate-800 border border-slate-700
              text-white placeholder-slate-500 text-sm
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
              transition
            "
                    />
                </div>

                {/* 경기 목록 */}
                <div className="space-y-3">
                    {filtered.length === 0 ? (
                        <div className="text-center py-16 text-slate-500">
                            검색 결과가 없습니다
                        </div>
                    ) : (
                        filtered.map((match) => {
                            const status = STATUS_CONFIG[match.codingStatus]
                            return (
                                <div
                                    key={match.id}
                                    className="
                    bg-slate-800 border border-slate-700 rounded-xl p-4
                    hover:border-slate-600 transition cursor-pointer
                  "
                                >
                                    <div className="flex items-center justify-between gap-4">

                                        {/* 날짜 + 시즌 */}
                                        <div className="text-xs text-slate-500 w-24 flex-shrink-0">
                                            <p>{match.date}</p>
                                            <p className="mt-0.5">{match.season}</p>
                                        </div>

                                        {/* 스코어 */}
                                        <div className="flex items-center gap-3 flex-1">
                      <span className="text-sm font-medium text-white text-right flex-1">
                        {match.home}
                      </span>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-lg font-bold text-white w-5 text-center">
                          {match.homeScore}
                        </span>
                                                <span className="text-slate-600 text-sm">:</span>
                                                <span className="text-lg font-bold text-white w-5 text-center">
                          {match.awayScore}
                        </span>
                                            </div>
                                            <span className="text-sm font-medium text-white flex-1">
                        {match.away}
                      </span>
                                        </div>

                                        {/* 코딩 상태 + 액션 */}
                                        <div className="flex items-center gap-3 flex-shrink-0">
                      <span
                          className={`
                          text-xs px-2.5 py-1 rounded-full border
                          ${status.className}
                        `}
                      >
                        {status.label}
                      </span>

                                            {/* 버튼 */}
                                            {match.codingStatus === 'NONE' ? (
                                                <button
                                                    onClick={() =>
                                                        navigate(`/matches/${match.id}/upload`)
                                                    }
                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs rounded-lg transition"
                                                >
                                                    <Upload size={13} />
                                                    영상 업로드
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        navigate(`/matches/${match.id}/coding`)
                                                    }
                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs rounded-lg transition"
                                                >
                                                    <Video size={13} />
                                                    {match.codingStatus === 'DONE' ? '코딩 보기' : '코딩 이어하기'}
                                                </button>
                                            )}

                                            <ChevronRight size={16} className="text-slate-600" />
                                        </div>
                                    </div>

                                    {/* 경기장 */}
                                    <p className="text-xs text-slate-600 mt-2 ml-28">
                                        📍 {match.venue}
                                    </p>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>

            {/* 경기 등록 모달 */}
            {showRegisterModal && (
                <RegisterModal onClose={() => setShowRegisterModal(false)} />
            )}
        </Layout>
    )
}

// 경기 등록 모달
function RegisterModal({ onClose }: { onClose: () => void }) {
    const [form, setForm] = useState({
        date: '',
        home: '',
        away: '',
        venue: '',
        season: '2024-25 V리그',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
    }

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
            onClick={onClose}
        >
            <div
                className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-bold text-white mb-5">경기 등록</h2>

                <div className="space-y-4">
                    {[
                        { label: '경기 날짜', name: 'date', type: 'date' },
                        { label: '홈팀', name: 'home', type: 'text', placeholder: '예) 흥국생명' },
                        { label: '원정팀', name: 'away', type: 'text', placeholder: '예) GS칼텍스' },
                        { label: '경기장', name: 'venue', type: 'text', placeholder: '예) 인천 삼산월드체육관' },
                        { label: '시즌', name: 'season', type: 'text', placeholder: '예) 2024-25 V리그' },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm text-slate-400 mb-1.5">
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                name={field.name}
                                value={form[field.name as keyof typeof form]}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                className="
                  w-full px-4 py-2.5 rounded-lg text-sm
                  bg-slate-700 border border-slate-600
                  text-white placeholder-slate-500
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                  transition
                "
                            />
                        </div>
                    ))}
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 rounded-lg text-sm text-slate-400 border border-slate-600 hover:bg-slate-700 transition"
                    >
                        취소
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white transition"
                    >
                        등록
                    </button>
                </div>
            </div>
        </div>
    )
}