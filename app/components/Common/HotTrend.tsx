'use client';
import { useState } from "react";
import { VideoCard } from "./VideoCard";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 4;

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
    })
};


export const HotTrend = ({ hotTrend }: { hotTrend: Video[] }) => {

    const [page, setPage] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const limitedData = hotTrend.slice(0, 16);
    const totalPages = Math.ceil(limitedData.length / ITEMS_PER_PAGE);

    const currentData = limitedData.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

    const paginate = (newDirection: number) => {
        if (isAnimating) return;

        const nextPage = page + newDirection;

        if (nextPage < 0 || nextPage >= totalPages) return;

        setDirection(newDirection);
        setPage(nextPage);
    };

    return (
        <section className="overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    🔥 지금 뜨는 핫 트렌드
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => paginate(-1)}
                        disabled={page === 0 || isAnimating}
                        className={`p-2 rounded-full border transition-colors ${page === 0
                            ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                            : 'border-gray-200 hover:bg-gray-100 text-gray-600'
                            }`}
                        aria-label="Previous"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        disabled={page >= totalPages - 1 || isAnimating}
                        className={`p-2 rounded-full border transition-colors ${page >= totalPages - 1
                            ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                            : 'border-gray-200 hover:bg-gray-100 text-gray-600'
                            }`}
                        aria-label="Next"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="relative min-h-[300px]">
                <AnimatePresence
                    initial={false}
                    custom={direction}
                    mode="popLayout"
                    onExitComplete={() => setIsAnimating(false)}
                >
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        onAnimationStart={() => setIsAnimating(true)}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {currentData.map((item, index) => {
                            return (
                                <VideoCard key={item.video_id + item.category} video={item} isHorizontal={false} />
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}