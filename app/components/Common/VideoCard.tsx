
import Link from 'next/link';
import { useVideo } from '@/context/VideoContext';

const formatViewCount = (count: number | string) => {
    const num = typeof count === 'string' ? parseInt(count, 10) : count;
    if (isNaN(num)) return '0';
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
};

const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return dateString.split('T')[0];
};

export const VideoCard = ({ video, isHorizontal = false }: { video: Video; isHorizontal?: boolean }) => {
    const { setSelectedVideo } = useVideo();

    return (
        <Link
            href={`/user/main/${video.video_id}`}
            onClick={() => setSelectedVideo(video)}
            className={`group cursor-pointer flex flex-col gap-3 ${isHorizontal ? 'w-80 flex-shrink-0' : 'w-full'}`}
        >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-200">
                <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                
                {/* Shorts 배지 */}
                {video.is_shorts && (
                    <div className="absolute bottom-2 left-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 font-bold shadow-lg border border-red-400">
                        <svg className="w-3 h-3 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.54,9,8.88,3.46a3.42,3.42,0,0,0-5.13,3V17.58A3.42,3.42,0,0,0,7.17,21a3.43,3.43,0,0,0,1.71-.46L18.54,15a3.42,3.42,0,0,0,0-5.92Zm-1,4.19L8.88,18.81a1.44,1.44,0,0,1-2.23-1.19V6.42a1.44,1.44,0,0,1,2.23-1.19L17.5,10.81A1.42,1.42,0,0,1,17.5,13.19Z"/>
                        </svg>
                        <span className="tracking-wide">Shorts</span>
                    </div>
                )}
            </div>
            <div>
                <h3 className="font-semibold text-gray-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {video.title}
                </h3>
                <div className="text-sm text-gray-500">
                    <p>{video.channel_username?.replace("@", "")}</p>
                    <p>
                        조회수 {formatViewCount(video.view_count)} • {formatDate(video.published_at)}
                    </p>
                </div>
            </div>
        </Link>
    );
};