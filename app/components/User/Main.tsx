'use client';

import React, { useState, useRef, useEffect } from 'react';
import { HotTrend } from '../Common/HotTrend';
import { Recommendation } from '../Common/Recommendation';
import { useAuth } from '@/contexts/AuthContext';
import { Interest } from '@/types/userInfo';


export default function UserMain({ hotTrend }: { hotTrend: Video[] }) {

    const { interests } = useAuth();

    const [categoryList, setCategoryList] = useState<Interest[]>([]);

    useEffect(() => {
        if (interests) {
            setCategoryList(interests);
        }
    }, [interests]);


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">

            <HotTrend hotTrend={hotTrend} />

            <Recommendation userInterests={categoryList} />

            {categoryList && categoryList.map((category) => (
                <Recommendation key={category.id} userCategory={category} />
            ))}


        </div>
    );
}