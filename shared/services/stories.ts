import type { Story, StoryItem } from "@/lib/generated/prisma/client";
import { $api } from "./instance";

export type IStory = Story & {
    items: StoryItem[];
};

export const getAll = async () => {
    const { data } = await $api.get<IStory[]>('/stories');

    return data;
};