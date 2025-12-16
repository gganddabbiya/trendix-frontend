
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