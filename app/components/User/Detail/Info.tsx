'use client';

import { useEffect, useState } from "react";
import UserAvatar from "../../Common/UserAvatar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "@/contexts/AuthContext";
import { updateUserInfo } from "@/app/actions/updateUserInfo";

export default function Info() {

    const { userId, name, email, avatarUrl, bio, setAvatarUrl } = useAuth();

    const [basicInfo, setBasicInfo] = useState<UserBasicInfo>({ name, email, avatarUrl, bio });

    const [editForm, setEditForm] = useState<UserBasicInfo>(basicInfo);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [isEditingInfo, setIsEditingInfo] = useState(false);

    const startEditing = () => {
        setEditForm({ ...basicInfo });
        setAvatarFile(null);
        setIsEditingInfo(true);
    };

    const cancelEditing = () => {
        setIsEditingInfo(false);
        setAvatarFile(null);
        setEditForm({ ...basicInfo });
    };

    const saveEditing = async () => {
        setBasicInfo(editForm);
        setIsEditingInfo(false);
        const updateData: any = await updateUserInfo(avatarFile, editForm.bio, userId);

        setAvatarUrl?.(updateData.profile_image_url);

    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatarFile(e.target.files[0]);
        }
    };

    useEffect(() => {
        if (avatarFile) {
            const objectUrl = URL.createObjectURL(avatarFile);
            setEditForm((prev) => ({ ...prev, avatarUrl: objectUrl }));
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [avatarFile]);


    return (
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">기본 정보</h2>
                <div className="flex gap-2">
                    {!isEditingInfo ? (
                        <button
                            onClick={startEditing}
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                            수정
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={saveEditing}
                                className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                            >
                                저장
                            </button>
                            <button
                                onClick={cancelEditing}
                                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                            >
                                취소
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar Area */}
                <div className="flex flex-col items-center gap-3">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-md relative group">
                        <UserAvatar
                            src={editForm.avatarUrl}
                            alt="Profile"
                            className="w-full h-full"
                        />
                        {isEditingInfo && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                onClick={() => document.getElementById('avatar-input')?.click()}
                            >
                                <Icon icon="material-symbols:camera-alt-rounded" className="text-white w-8 h-8" />
                            </div>
                        )}
                    </div>
                    {isEditingInfo && (
                        <>
                            <button
                                className="text-sm text-blue-600 font-medium hover:underline"
                                onClick={() => document.getElementById('avatar-input')?.click()}
                            >
                                사진 변경
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="avatar-input"
                                onChange={handleFileChange}
                            />
                        </>
                    )}
                </div>

                {/* Form Fields */}
                <div className="flex-1 w-full space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">이름</label>
                            <p
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-500"
                            >
                                {basicInfo.name}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">이메일</label>
                            <p className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-500">
                                {basicInfo.email}
                            </p>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">소개</label>
                        {isEditingInfo ? (
                            <textarea
                                name="bio"
                                value={editForm.bio}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                        ) : (
                            <p className="w-full px-4 py-2 rounded-xl border border-transparent text-gray-700 whitespace-pre-wrap">
                                {editForm.bio ? editForm.bio : '소개를 입력해주세요.'}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section >
    );
}