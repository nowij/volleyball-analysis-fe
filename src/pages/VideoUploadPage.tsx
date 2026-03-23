import { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Upload, Film, X, CheckCircle, AlertCircle } from 'lucide-react'
import Layout from '../components/common/Layout'

type UploadStatus = 'IDLE' | 'UPLOADING' | 'DONE' | 'ERROR'

interface UploadedFile {
    file: File
    preview: string
}

export default function VideoUploadPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
    const [status, setStatus] = useState<UploadStatus>('IDLE')
    const [progress, setProgress] = useState(0)
    const [isDragging, setIsDragging] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)

    // 파일 선택 처리
    const handleFile = (file: File) => {
        if (!file.type.startsWith('video/')) {
            alert('영상 파일만 업로드 가능합니다.')
            return
        }
        setUploadedFile({
            file,
            preview: URL.createObjectURL(file),
        })
        setStatus('IDLE')
        setProgress(0)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleFile(file)
    }

    // 드래그 앤 드롭
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }
    const handleDragLeave = () => setIsDragging(false)
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file) handleFile(file)
    }

    // 업로드 시뮬레이션 (나중에 S3 API로 교체)
    const handleUpload = async () => {
        if (!uploadedFile) return
        setStatus('UPLOADING')
        setProgress(0)

        // TODO: 실제 S3 업로드로 교체
        for (let i = 0; i <= 100; i += 5) {
            await new Promise((r) => setTimeout(r, 100))
            setProgress(i)
        }
        setStatus('DONE')
    }

    const handleReset = () => {
        setUploadedFile(null)
        setStatus('IDLE')
        setProgress(0)
        if (inputRef.current) inputRef.current.value = ''
    }

    const formatSize = (bytes: number) => {
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    }

    return (
        <Layout>
            <div className="p-6 max-w-2xl mx-auto space-y-6">

                {/* 헤더 */}
                <div>
                    <button
                        onClick={() => navigate('/matches')}
                        className="text-sm text-slate-400 hover:text-white transition mb-3 flex items-center gap-1"
                    >
                        ← 경기 목록으로
                    </button>
                    <h1 className="text-xl font-bold text-white">영상 업로드</h1>
                    <p className="text-sm text-slate-400 mt-0.5">
                        경기 #{id} — 영상을 업로드하면 코딩을 시작할 수 있습니다
                    </p>
                </div>

                {/* 업로드 영역 */}
                {!uploadedFile ? (
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => inputRef.current?.click()}
                        className={`
              border-2 border-dashed rounded-2xl p-16
              flex flex-col items-center justify-center gap-4
              cursor-pointer transition
              ${isDragging
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-slate-600 hover:border-slate-500 bg-slate-800/50'
                        }
            `}
                    >
                        <div className="w-16 h-16 rounded-2xl bg-slate-700 flex items-center justify-center">
                            <Upload size={28} className="text-slate-400" />
                        </div>
                        <div className="text-center">
                            <p className="text-white font-medium">
                                영상 파일을 드래그하거나 클릭하여 선택
                            </p>
                            <p className="text-slate-500 text-sm mt-1">
                                MP4, MOV, AVI 지원 · 최대 10GB
                            </p>
                        </div>
                        <input
                            ref={inputRef}
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={handleInputChange}
                        />
                    </div>
                ) : (
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">

                        {/* 영상 미리보기 */}
                        <div className="relative bg-black aspect-video">
                            <video
                                src={uploadedFile.preview}
                                className="w-full h-full object-contain"
                                controls
                            />
                        </div>

                        {/* 파일 정보 */}
                        <div className="p-4 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0">
                                <Film size={18} className="text-slate-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                    {uploadedFile.file.name}
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    {formatSize(uploadedFile.file.size)}
                                </p>
                            </div>
                            {status === 'IDLE' && (
                                <button
                                    onClick={handleReset}
                                    className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700 transition"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* 업로드 진행 */}
                        {status === 'UPLOADING' && (
                            <div className="px-4 pb-4 space-y-2">
                                <div className="flex justify-between text-xs text-slate-400">
                                    <span>업로드 중...</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full transition-all duration-200"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* 완료 */}
                        {status === 'DONE' && (
                            <div className="px-4 pb-4 flex items-center gap-2 text-green-400 text-sm">
                                <CheckCircle size={16} />
                                <span>업로드 완료! 코딩을 시작할 수 있습니다.</span>
                            </div>
                        )}

                        {/* 에러 */}
                        {status === 'ERROR' && (
                            <div className="px-4 pb-4 flex items-center gap-2 text-red-400 text-sm">
                                <AlertCircle size={16} />
                                <span>업로드 실패. 다시 시도해주세요.</span>
                            </div>
                        )}
                    </div>
                )}

                {/* 하단 버튼 */}
                <div className="flex gap-3">
                    {status !== 'DONE' ? (
                        <button
                            onClick={handleUpload}
                            disabled={!uploadedFile || status === 'UPLOADING'}
                            className="
                flex-1 py-2.5 rounded-lg text-sm font-semibold
                bg-blue-600 hover:bg-blue-500 text-white
                disabled:opacity-40 disabled:cursor-not-allowed
                transition
              "
                        >
                            {status === 'UPLOADING' ? `업로드 중... ${progress}%` : '업로드 시작'}
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate(`/matches/${id}/coding`)}
                            className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-green-600 hover:bg-green-500 text-white transition"
                        >
                            코딩 시작하기 →
                        </button>
                    )}
                </div>

            </div>
        </Layout>
    )
}